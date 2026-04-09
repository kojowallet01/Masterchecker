const Report = require('../models/Report');
const Link = require('../models/Link');

class ReportController {
  /**
   * Get all pending reports (admin only)
   */
  static async getPendingReports(req, res) {
    try {
      const reports = await Report.find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .limit(50);

      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Approve a report
   */
  static async approveReport(req, res) {
    try {
      const { reportId } = req.params;
      const { category, adminNotes } = req.body;

      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      report.status = 'approved';
      report.approvedAt = new Date();
      report.adminNotes = adminNotes;
      await report.save();

      // Update or create link entry
      let link = await Link.findOne({ url: report.url });
      if (!link) {
        link = new Link({
          url: report.url,
          domain: report.url.split('/')[2],
          category: category || report.category,
          isReported: true,
          verified: true,
          status: 'suspicious',
          riskScore: 75,
        });
      } else {
        link.reportCount += 1;
        link.verified = true;
        if (category) link.category = category;
      }

      await link.save();

      res
        .status(200)
        .json({ message: 'Report approved successfully', report });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Reject a report
   */
  static async rejectReport(req, res) {
    try {
      const { reportId } = req.params;
      const { adminNotes } = req.body;

      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      report.status = 'rejected';
      report.rejectedAt = new Date();
      report.adminNotes = adminNotes;
      await report.save();

      res
        .status(200)
        .json({ message: 'Report rejected successfully', report });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get report statistics
   */
  static async getReportStats(req, res) {
    try {
      const totalReports = await Report.countDocuments();
      const pendingReports = await Report.countDocuments({
        status: 'pending',
      });
      const approvedReports = await Report.countDocuments({
        status: 'approved',
      });

      const reportsByCategory = await Report.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      res.status(200).json({
        totalReports,
        pendingReports,
        approvedReports,
        reportsByCategory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReportController;
