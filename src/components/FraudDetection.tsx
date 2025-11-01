import { AlertTriangle, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { demoFraudAlerts } from '../lib/demoData';

export default function FraudDetection() {
  const getRiskColor = (level: string) => {
    if (level === 'high') return 'text-red-600';
    if (level === 'medium') return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBgColor = (level: string) => {
    if (level === 'high') return 'bg-red-100 border-red-300';
    if (level === 'medium') return 'bg-yellow-100 border-yellow-300';
    return 'bg-green-100 border-green-300';
  };

  const getRiskIcon = (level: string) => {
    if (level === 'high') return <AlertTriangle className="w-6 h-6 text-red-600" />;
    if (level === 'medium') return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
    return <Shield className="w-6 h-6 text-green-600" />;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'resolved') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'false_positive') return <XCircle className="w-5 h-5 text-gray-600" />;
    if (status === 'reviewed') return <CheckCircle className="w-5 h-5 text-blue-600" />;
    return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  const stats = {
    totalAlerts: 15,
    highRisk: 2,
    mediumRisk: 5,
    lowRisk: 8,
    resolved: 10,
    pending: 5
  };

  const aiAnalytics = [
    { metric: 'Suspicious Patterns Detected', value: '3', color: 'text-yellow-600' },
    { metric: 'False Positive Rate', value: '12%', color: 'text-green-600' },
    { metric: 'Detection Accuracy', value: '94.5%', color: 'text-blue-600' },
    { metric: 'Avg Response Time', value: '2.3 min', color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Fraud Detection & Risk Intelligence</h2>
        <p className="text-gray-600">Real-time monitoring and AI-powered fraud prevention</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-600">
          <p className="text-sm text-gray-600 mb-1">High Risk Alerts</p>
          <p className="text-3xl font-bold text-gray-900">{stats.highRisk}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-600">
          <p className="text-sm text-gray-600 mb-1">Medium Risk Alerts</p>
          <p className="text-3xl font-bold text-gray-900">{stats.mediumRisk}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
          <p className="text-sm text-gray-600 mb-1">Low Risk Alerts</p>
          <p className="text-3xl font-bold text-gray-900">{stats.lowRisk}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-10 h-10" />
          <div>
            <h3 className="text-2xl font-bold">AI-Powered Protection Active</h3>
            <p className="text-purple-100">Real-time fraud detection monitoring your accounts 24/7</p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {aiAnalytics.map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-purple-100 mb-1">{item.metric}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Fraud Alerts</h3>
        <div className="space-y-4">
          {demoFraudAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-lg p-5 ${getRiskBgColor(alert.risk_level)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getRiskIcon(alert.risk_level)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{alert.alert_type}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(alert.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(alert.status)}
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {alert.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{alert.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-semibold ${getRiskColor(alert.risk_level)} uppercase`}>
                    {alert.risk_level} Risk
                  </span>
                  <span className="text-sm text-gray-600">
                    AI Confidence: {(alert.ai_confidence * 100).toFixed(0)}%
                  </span>
                </div>
                {alert.status === 'pending' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Review Alert
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Detection Models</h3>
          <div className="space-y-3">
            <ModelCard
              name="Transaction Pattern Analysis"
              accuracy={96.2}
              description="Detects unusual spending patterns and anomalies"
            />
            <ModelCard
              name="Location-Based Risk"
              accuracy={92.8}
              description="Identifies suspicious geographical activity"
            />
            <ModelCard
              name="Behavioral Biometrics"
              accuracy={94.5}
              description="Analyzes user interaction patterns"
            />
            <ModelCard
              name="Network Analysis"
              accuracy={89.3}
              description="Detects coordinated fraud attempts"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Intelligence Features</h3>
          <div className="space-y-4">
            <FeatureItem
              title="Real-Time Monitoring"
              description="Continuous analysis of all transactions and account activities"
            />
            <FeatureItem
              title="Predictive Analytics"
              description="Machine learning models predict potential fraud before it happens"
            />
            <FeatureItem
              title="Multi-Layer Security"
              description="Combined detection using traditional rules and AI models"
            />
            <FeatureItem
              title="Instant Notifications"
              description="Immediate alerts for suspicious activities requiring attention"
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Fraud Prevention Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Review your transactions regularly and report any suspicious activity immediately
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Enable multi-factor authentication on all financial accounts
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Use strong, unique passwords and change them regularly
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Be cautious of phishing attempts and never share sensitive information via email
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface ModelCardProps {
  name: string;
  accuracy: number;
  description: string;
}

function ModelCard({ name, accuracy, description }: ModelCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <span className="text-sm font-bold text-green-600">{accuracy}%</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div
          className="bg-green-600 h-1.5 rounded-full"
          style={{ width: `${accuracy}%` }}
        />
      </div>
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
