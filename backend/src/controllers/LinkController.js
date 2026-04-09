const LinkService = require('../services/LinkService');
const Link = require('../models/Link');

class LinkController {
  /**
   * Check a URL for safety
   */
  static async checkLink(req, res) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const result = await LinkService.checkLink(url);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get trending scams
   */
  static async getTrendingScams(req, res) {
    try {
      const limit = req.query.limit || 10;
      const scams = await LinkService.getTrendingScams(parseInt(limit));
      res.status(200).json(scams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get scams by category
   */
  static async getScamsByCategory(req, res) {
    try {
      const { category } = req.params;
      const limit = req.query.limit || 10;

      const validCategories = [
        'momo-scam',
        'fake-job',
        'phishing',
        'malware',
        'dating-scam',
        'lottery-scam',
        'investment-scam',
        'other',
      ];

      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const scams = await LinkService.getScamsByCategory(
        category,
        parseInt(limit)
      );
      res.status(200).json(scams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get statistics
   */
  static async getStatistics(req, res) {
    try {
      const stats = await LinkService.getStatistics();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Report a link
   */
  static async reportLink(req, res) {
    try {
      const { url, category, description, email } = req.body;

      if (!url || !category) {
        return res
          .status(400)
          .json({ error: 'URL and category are required' });
      }

      let link = await Link.findOne({ url: url.toLowerCase() });

      if (!link) {
        link = new Link({
          url: url.toLowerCase(),
          domain: LinkCheckerService.extractDomain(url),
          isReported: true,
          status: 'suspicious',
          category,
        });
      } else {
        link.reportCount += 1;
        link.isReported = true;
        if (!link.category || link.category === 'other') {
          link.category = category;
        }
      }

      link.reports.push({
        reportedAt: new Date(),
        category,
        description,
        region: 'Ghana',
      });

      await link.save();

      res
        .status(201)
        .json({ message: 'Link reported successfully', linkId: link._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get link details
   */
  static async getLinkDetails(req, res) {
    try {
      const { url } = req.params;
      const link = await Link.findOne({ url: decodeURIComponent(url) });

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.status(200).json(link);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get search results
   */
  static async searchLinks(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' });
      }

      const results = await Link.find({
        $or: [
          { url: { $regex: query, $options: 'i' } },
          { domain: { $regex: query, $options: 'i' } },
        ],
      })
        .limit(20)
        .select('-googleSafeBrowsingResult -virusTotalResult');

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const LinkCheckerService = require('../services/LinkCheckerService');

module.exports = LinkController;
