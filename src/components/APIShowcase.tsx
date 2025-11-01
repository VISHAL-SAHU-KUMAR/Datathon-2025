import { useState } from 'react';
import { Code, Copy, CheckCircle, Play } from 'lucide-react';

export default function APIShowcase() {
  const [copiedCredit, setCopiedCredit] = useState(false);
  const [copiedRisk, setCopiedRisk] = useState(false);
  const [activeTab, setActiveTab] = useState<'credit' | 'risk'>('credit');

  const creditScoreExample = `POST /api/credit-score
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "user_id": "user_123",
  "include_alternative_data": true
}`;

  const creditScoreResponse = `{
  "user_id": "user_123",
  "score": 720,
  "rating": "Good",
  "factors": [
    {
      "name": "Payment History",
      "impact": "positive",
      "weight": 35,
      "description": "Consistent on-time payments"
    },
    {
      "name": "Alternative Data: Utility Bills",
      "impact": "positive",
      "weight": 10,
      "description": "Regular utility payments recorded"
    }
  ],
  "calculated_at": "2025-10-31T10:30:00Z"
}`;

  const riskInsightExample = `POST /api/risk-insight
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "transaction_id": "txn_456",
  "user_id": "user_123",
  "amount": 1500,
  "location": "New York, NY"
}`;

  const riskInsightResponse = `{
  "transaction_id": "txn_456",
  "risk_level": "medium",
  "risk_score": 0.68,
  "ai_confidence": 0.89,
  "detected_patterns": [
    {
      "type": "unusual_amount",
      "severity": "medium",
      "description": "Amount 3x higher than average"
    },
    {
      "type": "unusual_location",
      "severity": "low",
      "description": "Transaction from new location"
    }
  ],
  "recommendation": "verify_transaction",
  "analyzed_at": "2025-10-31T10:35:00Z"
}`;

  const copyToClipboard = (text: string, type: 'credit' | 'risk') => {
    navigator.clipboard.writeText(text);
    if (type === 'credit') {
      setCopiedCredit(true);
      setTimeout(() => setCopiedCredit(false), 2000);
    } else {
      setCopiedRisk(true);
      setTimeout(() => setCopiedRisk(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Open API Ecosystem</h2>
        <p className="text-gray-600">Integrate our AI-powered financial APIs into your applications</p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Developer-Friendly APIs</h3>
        <p className="text-blue-100 mb-6">
          Access our powerful AI engines through simple REST APIs. Get credit scores with explainable
          factors and real-time fraud detection with millisecond response times.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">99.9%</p>
            <p className="text-sm text-blue-100">API Uptime</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">&lt;50ms</p>
            <p className="text-sm text-blue-100">Avg Response Time</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">1M+</p>
            <p className="text-sm text-blue-100">API Calls/Day</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('credit')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'credit'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Credit Score API
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'risk'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Risk Insight API
        </button>
      </div>

      {activeTab === 'credit' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Alternative Credit Scoring API</h3>
            <p className="text-gray-600 mb-4">
              Get comprehensive credit scores that include traditional credit data plus alternative sources
              like utility bills, rental payments, and mobile payment patterns. Every score includes
              explainable AI factors showing exactly how the score was calculated.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Alternative data sources</li>
                  <li>• Explainable AI factors</li>
                  <li>• Real-time calculation</li>
                  <li>• Historical tracking</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Use Cases</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Loan underwriting</li>
                  <li>• Credit card approvals</li>
                  <li>• Rental applications</li>
                  <li>• Financial planning</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free: 100 calls/month</li>
                  <li>• Starter: $0.10/call</li>
                  <li>• Scale: $0.05/call</li>
                  <li>• Enterprise: Custom</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Request Example</span>
              </div>
              <button
                onClick={() => copyToClipboard(creditScoreExample, 'credit')}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm transition-colors"
              >
                {copiedCredit ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-800">{creditScoreExample}</code>
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Response Example</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm bg-gray-50">
              <code className="text-gray-800">{creditScoreResponse}</code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Insight & Fraud Detection API</h3>
            <p className="text-gray-600 mb-4">
              Real-time fraud detection powered by machine learning. Analyze transactions instantly
              and receive risk scores with detailed pattern analysis. Our AI models detect anomalies
              with 94.5% accuracy and provide actionable recommendations.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time analysis</li>
                  <li>• Pattern detection</li>
                  <li>• Risk scoring</li>
                  <li>• AI confidence levels</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Use Cases</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Transaction monitoring</li>
                  <li>• Account takeover prevention</li>
                  <li>• Identity verification</li>
                  <li>• Payment fraud detection</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free: 500 calls/month</li>
                  <li>• Starter: $0.05/call</li>
                  <li>• Scale: $0.02/call</li>
                  <li>• Enterprise: Custom</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Request Example</span>
              </div>
              <button
                onClick={() => copyToClipboard(riskInsightExample, 'risk')}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm transition-colors"
              >
                {copiedRisk ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-gray-800">{riskInsightExample}</code>
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Response Example</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm bg-gray-50">
              <code className="text-gray-800">{riskInsightResponse}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Getting Started</h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            <span>Sign up for a developer account at api.fininclusion.com</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            <span>Generate your API key from the dashboard</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            <span>Make your first API call using the examples above</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            <span>Review our comprehensive documentation for advanced features</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
