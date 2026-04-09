const Link = require('../models/Link');
const LinkCheckerService = require('./LinkCheckerService');

class LinkService {
  /**
   * Check a link and return safety information
   */
  static async checkLink(url) {
    try {
      // Format and validate URL
      const formattedUrl = LinkCheckerService.formatUrl(url);
      if (!LinkCheckerService.isValidUrl(formattedUrl)) {
        throw new Error('Invalid URL format');
      }

      const domain = LinkCheckerService.extractDomain(formattedUrl);

      // Try to check database but don't fail if it times out
      let existingLink = null;
      try {
        existingLink = await Promise.race([
          Link.findOne({ url: formattedUrl }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('DB timeout')), 5000)
          )
        ]);
        if (existingLink) {
          // Update last checked (don't wait for save)
          existingLink.lastChecked = new Date();
          existingLink.save().catch(() => {}); // Ignore save errors
          return this.formatLinkResponse(existingLink);
        }
      } catch (dbError) {
        console.warn('⚠️  Database query timeout, proceeding without cache');
      }

      // Check against external APIs
      const googleResult = await LinkCheckerService.checkGoogleSafeBrowsing(
        formattedUrl
      );
      const virusTotalResult = await LinkCheckerService.checkVirusTotal(
        formattedUrl
      );

      // Calculate risk score
      const { score, status, reason } =
        LinkCheckerService.calculateRiskScore(googleResult, virusTotalResult);

      // Try to save to database but don't fail if it fails
      try {
        const newLink = new Link({
          url: formattedUrl,
          domain,
          riskScore: score,
          status,
          reason,
          googleSafeBrowsingResult: googleResult,
          virusTotalResult,
        });
        // Don't await save, let it happen in background
        newLink.save().catch(() => console.warn('⚠️  Could not save link to database'));
      } catch (dbError) {
        console.warn('⚠️  Database save failed, returning result anyway');
      }

      // Return result immediately (don't wait for DB)
      return {
        url: formattedUrl,
        domain,
        riskScore: score,
        status,
        reason,
        reportCount: 0,
        category: null,
        lastChecked: new Date(),
        verified: false,
      };
    } catch (error) {
      throw new Error(`Error checking link: ${error.message}`);
    }
  }

  /**
   * Format link response
   */
  static formatLinkResponse(link) {
    return {
      url: link.url,
      domain: link.domain,
      riskScore: link.riskScore,
      status: link.status,
      reason: link.reason,
      reportCount: link.reportCount,
      category: link.category,
      lastChecked: link.lastChecked,
      verified: link.verified,
    };
  }

  /**
   * Get trending scams in Ghana
   */
  static async getTrendingScams(limit = 10) {
    try {
      let scams = [];
      try {
        scams = await Promise.race([
          Link.find({
            isReported: true,
            region: 'Ghana',
            status: { $in: ['suspicious', 'dangerous'] },
          })
            .sort({ reportCount: -1, createdAt: -1 })
            .limit(limit)
            .select('-googleSafeBrowsingResult -virusTotalResult'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('DB timeout')), 5000)
          )
        ]);
      } catch (dbError) {
        console.warn('⚠️  Could not fetch trending scams from database');
        return []; // Return empty array instead of failing
      }

      return scams.map((scam) => ({
        url: scam.url,
        domain: scam.domain,
        riskScore: scam.riskScore,
        status: scam.status,
        category: scam.category,
        reportCount: scam.reportCount,
        lastReported: scam.updatedAt,
      }));
    } catch (error) {
      console.warn(`Error fetching trending scams: ${error.message}`);
      return []; // Return empty array instead of throwing
    }
  }

  /**
   * Get scams by category
   */
  static async getScamsByCategory(category, limit = 10) {
    try {
      const scams = await Link.find({
        category,
        region: 'Ghana',
        isReported: true,
      })
        .sort({ reportCount: -1 })
        .limit(limit)
        .select('-googleSafeBrowsingResult -virusTotalResult');

      return scams;
    } catch (error) {
      throw new Error(`Error fetching scams by category: ${error.message}`);
    }
  }

  /**
   * Get statistics
   */
  static async getStatistics() {
    try {
      // Return default stats if database is unavailable
      try {
        await Promise.race([
          Link.countDocuments(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('DB timeout')), 3000)
          )
        ]);
      } catch (dbError) {
        console.warn('⚠️  Database unavailable for stats, returning defaults');
        return {
          totalLinks: 0,
          dangerousLinks: 0,
          suspiciousLinks: 0,
          safeLinks: 0,
          categories: [],
          topReported: [],
        };
      }

      const totalLinks = await Link.countDocuments();
      const dangerousLinks = await Link.countDocuments({ status: 'dangerous' });
      const suspiciousLinks = await Link.countDocuments({ status: 'suspicious' });
      const safeLinks = await Link.countDocuments({ status: 'safe' });

      const categories = await Link.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      const topReported = await Link.find()
        .sort({ reportCount: -1 })
        .limit(5)
        .select('url domain reportCount category');

      return {
        totalLinks,
        dangerousLinks,
        suspiciousLinks,
        safeLinks,
        categories,
        topReported,
      };
    } catch (error) {
      console.warn(`Error fetching statistics: ${error.message}`);
      return {
        totalLinks: 0,
        dangerousLinks: 0,
        suspiciousLinks: 0,
        safeLinks: 0,
        categories: [],
        topReported: [],
      };
    }
  }
}

module.exports = LinkService;
