const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      lowercase: true,
    },
    userId: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: [
        'momo-scam',
        'fake-job',
        'phishing',
        'malware',
        'dating-scam',
        'lottery-scam',
        'investment-scam',
        'other',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    region: {
      type: String,
      default: 'Ghana',
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNotes: String,
    approvedAt: Date,
    rejectedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
