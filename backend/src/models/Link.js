const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    domain: {
      type: String,
      required: true,
      index: true,
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ['safe', 'suspicious', 'dangerous'],
      default: 'safe',
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
      default: 'other',
    },
    reason: {
      type: String,
      default: 'No specific reason provided',
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
    googleSafeBrowsingResult: {
      type: Object,
      default: {},
    },
    virusTotalResult: {
      type: Object,
      default: {},
    },
    verified: {
      type: Boolean,
      default: false,
    },
    region: {
      type: String,
      default: 'Ghana',
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    reports: [
      {
        userId: String,
        reportedAt: { type: Date, default: Date.now },
        category: String,
        description: String,
        region: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
