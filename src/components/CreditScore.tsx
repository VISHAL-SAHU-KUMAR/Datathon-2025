import { Shield, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { demoCreditScore } from '../lib/demoData';

export default function CreditScore() {
  const creditData = demoCreditScore;

  const getScoreColor = (score: number) => {
    if (score >= 740) return 'text-green-600';
    if (score >= 670) return 'text-blue-600';
    if (score >= 580) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 740) return 'from-green-500 to-green-700';
    if (score >= 670) return 'from-blue-500 to-blue-700';
    if (score >= 580) return 'from-yellow-500 to-yellow-700';
    return 'from-red-500 to-red-700';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 740) return 'Excellent';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  const getImpactIcon = (impact: string) => {
    if (impact === 'positive') return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (impact === 'negative') return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-600" />;
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'positive') return 'border-green-200 bg-green-50';
    if (impact === 'negative') return 'border-red-200 bg-red-50';
    return 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Alternative Credit Scoring</h2>
        <p className="text-gray-600">AI-powered credit analysis using alternative data sources</p>
      </div>

      <div className={`bg-gradient-to-br ${getScoreBgColor(creditData.score)} rounded-xl shadow-lg p-8 text-white`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 mb-1">Your Credit Score</p>
            <h3 className="text-6xl font-bold">{creditData.score}</h3>
            <p className="text-2xl mt-2">{getScoreLabel(creditData.score)}</p>
          </div>
          <Shield className="w-24 h-24 text-white/30" />
        </div>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>300 (Poor)</span>
            <span>850 (Excellent)</span>
          </div>
          <div className="relative w-full bg-white/30 rounded-full h-3">
            <div className="absolute left-0 w-full h-3 flex">
              <div className="w-1/4 bg-red-500/60 h-3 rounded-l-full" />
              <div className="w-1/4 bg-yellow-500/60 h-3" />
              <div className="w-1/4 bg-blue-500/60 h-3" />
              <div className="w-1/4 bg-green-500/60 h-3 rounded-r-full" />
            </div>
            <div
              className="absolute top-0 w-1 h-3 bg-white shadow-lg"
              style={{ left: `${((creditData.score - 300) / 550) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Explainable AI Credit Scoring</p>
            <p className="text-sm text-blue-700">
              Our alternative credit scoring engine uses machine learning to analyze traditional credit data
              plus alternative sources like utility payments, rental history, and mobile payment patterns.
              Each factor's contribution is transparent and explainable.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Score Factors & Impact</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your score is calculated based on the following factors. Each factor's weight represents its
          contribution to your overall score.
        </p>
        <div className="space-y-4">
          {creditData.factors.map((factor, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-4 ${getImpactColor(factor.impact)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getImpactIcon(factor.impact)}
                  <h4 className="font-semibold text-gray-900">{factor.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">Weight: {factor.weight}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{factor.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    factor.impact === 'positive' ? 'bg-green-600' :
                    factor.impact === 'negative' ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                  style={{ width: `${factor.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traditional Data Sources</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Payment history (35% weight)</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Credit utilization (30% weight)</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Credit history length (15% weight)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Data Sources</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              <span>Utility payment patterns (10% weight)</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              <span>Mobile payment activity (5% weight)</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              <span>Rental payment history (5% weight)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">How to Improve Your Score</h3>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">1.</span>
            <span className="text-green-800">
              Continue making on-time payments for all bills, including utilities and rent
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">2.</span>
            <span className="text-green-800">
              Keep credit utilization below 30% by paying down balances or increasing limits
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">3.</span>
            <span className="text-green-800">
              Maintain active mobile payment accounts to demonstrate financial engagement
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">4.</span>
            <span className="text-green-800">
              Avoid opening multiple new credit accounts in a short period
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
