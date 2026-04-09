import React from 'react';
import { Link } from 'react-router-dom';
import LinkChecker from '../components/LinkChecker';

export default function Home() {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">🛡️ LinkShield</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Protect yourself and your community. Check if a link is safe, suspicious, or dangerous.
            Powered by Ghana's first crowdsourced link verification platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              View Community Dashboard
            </Link>
            <Link to="/report" className="btn-primary border-2 border-white hover:bg-blue-700">
              Report a Scam
            </Link>
          </div>
        </div>
      </section>

      {/* Link Checker */}
      <section className="container">
        <LinkChecker />
      </section>

      {/* Features Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why LinkShield?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Instant Verification</h3>
            <p className="text-gray-600">
              Check any link in seconds using Google Safe Browsing and VirusTotal APIs.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Community Reports</h3>
            <p className="text-gray-600">
              Join thousands of Ghanaians reporting scams and protecting others from fraud.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">🇬🇭</div>
            <h3 className="text-xl font-bold mb-2">Ghana-Focused</h3>
            <p className="text-gray-600">
              Built specifically for Ghanaian scam prevention, tracking MoMo fraud, fake jobs, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Scale */}
      <section className="container">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Understanding Risk Scores</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg">Safe (0-39)</h3>
                <p className="text-gray-600">Link has passed security checks with no threats detected.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl font-bold text-yellow-600">
                !
              </div>
              <div>
                <h3 className="font-bold text-lg">Suspicious (40-69)</h3>
                <p className="text-gray-600">Link has some warning signs. Proceed with caution.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl font-bold text-red-600">
                ✕
              </div>
              <div>
                <h3 className="font-bold text-lg">Dangerous (70-100)</h3>
                <p className="text-gray-600">Link is highly likely malicious. DO NOT click this link.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Scams */}
      <section className="container">
        <div className="card max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Beware of These Common Scams in Ghana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">💰 MoMo Scams</h3>
              <p className="text-sm text-red-800">
                Fake MTN Mobile Money, Vodafone Cash, or AirtelTigo Money requests.
              </p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">💼 Fake Job Offers</h3>
              <p className="text-sm text-red-800">
                Too-good-to-be-true remote jobs requesting upfront payments or personal data.
              </p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">🎣 Phishing Links</h3>
              <p className="text-sm text-red-800">
                Links impersonating banks or services to steal credentials and banking info.
              </p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">💔 Dating Scams</h3>
              <p className="text-sm text-red-800">
                Romance scams extracting money through emotional manipulation.
              </p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">🎰 Lottery/Prize Scams</h3>
              <p className="text-sm text-red-800">
                Fake lottery wins or prize notifications requesting taxes or personal details.
              </p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-bold text-red-900 mb-2">📈 Investment Scams</h3>
              <p className="text-sm text-red-800">
                Fraudulent crypto or investment schemes promising unrealistic returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Help Protect Ghana from Scams</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            If you encounter a suspicious link, report it immediately. Your contribution helps keep
            the entire community safe.
          </p>
          <Link to="/report" className="btn-primary">
            Report a Scam Link Now
          </Link>
        </div>
      </section>
    </div>
  );
}
