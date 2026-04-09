const axios = require('axios');
const config = require('../config/apiKeys');

class LinkCheckerService {
  /**
   * Check URL using Google Safe Browsing API
   */
  static async checkGoogleSafeBrowsing(url) {
    try {
      if (!config.googleSafeBrowsingApiKey) {
        console.warn('Google Safe Browsing API key not configured');
        return { error: 'API key not configured' };
      }

      const requestBody = {
        client: { clientId: 'LinkShield', clientVersion: '1.0.0' },
        threatInfo: {
          threatTypes: [
            'MALWARE',
            'SOCIAL_ENGINEERING',
            'UNWANTED_SOFTWARE',
            'POTENTIALLY_HARMFUL_APPLICATION',
          ],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }],
        },
      };

      const response = await axios.post(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${config.googleSafeBrowsingApiKey}`,
        requestBody,
        { timeout: 5000 }
      );

      return {
        matches: response.data.matches || [],
        safe: !(response.data.matches && response.data.matches.length > 0),
      };
    } catch (error) {
      console.error('Google Safe Browsing error:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Check URL using VirusTotal API
   */
  static async checkVirusTotal(url) {
    try {
      if (!config.virusTotalApiKey) {
        console.warn('VirusTotal API key not configured');
        return { error: 'API key not configured' };
      }

      const headers = {
        'x-apikey': config.virusTotalApiKey,
      };

      // Encode URL for submission
      const params = new URLSearchParams();
      params.append('url', url);

      const response = await axios.post(
        'https://www.virustotal.com/api/v3/urls',
        params,
        { headers, timeout: 5000 }
      );

      const analysisId = response.data.data.id;

      // Get analysis results
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for analysis

      const analysisResponse = await axios.get(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        { headers, timeout: 5000 }
      );

      const stats = analysisResponse.data.data.attributes.stats;
      const malicious = stats.malicious || 0;
      const suspicious = stats.suspicious || 0;
      const undetected = stats.undetected || 0;

      return {
        stats,
        malicious,
        suspicious,
        undetected,
        safe: malicious === 0 && suspicious === 0,
      };
    } catch (error) {
      console.error('VirusTotal error:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Calculate risk score and status
   */
  static calculateRiskScore(googleResult, virusTotalResult) {
    let score = 0;
    let reasons = [];

    // Google Safe Browsing analysis
    if (googleResult.matches && googleResult.matches.length > 0) {
      score += 60;
      reasons.push(
        `Flagged by Google Safe Browsing: ${googleResult.matches[0].threatType}`
      );
    }

    // VirusTotal analysis
    if (virusTotalResult.stats) {
      const { malicious = 0, suspicious = 0, undetected = 0 } =
        virusTotalResult.stats;
      if (malicious > 0) {
        score += 40;
        reasons.push(`${malicious} VirusTotal vendors detected malware`);
      } else if (suspicious > 0) {
        score += 20;
        reasons.push(`${suspicious} VirusTotal vendors flagged as suspicious`);
      }
    }

    // Check for suspicious keywords
    const suspiciousKeywords = [
      'bit.ly',
      'tinyurl',
      'short.link',
      'phish',
      'scam',
      'verify',
      'confirm',
      'urgent',
      'claim',
      'prize',
      'winner',
      'click',
      'login',
      'password',
    ];

    // Determine status
    let status = 'safe';
    if (score >= 70) {
      status = 'dangerous';
    } else if (score >= 40) {
      status = 'suspicious';
    }

    return {
      score: Math.min(score, 100),
      status,
      reason: reasons.length > 0 ? reasons.join('; ') : 'No threats detected',
    };
  }

  /**
   * Extract domain from URL
   */
  static extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (error) {
      return url.split('/')[2] || url;
    }
  }

  /**
   * Validate URL format
   */
  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Add protocol if missing
   */
  static formatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }
}

module.exports = LinkCheckerService;
