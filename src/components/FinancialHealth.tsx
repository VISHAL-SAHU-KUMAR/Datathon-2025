import { Activity, TrendingUp, PieChart, Target, AlertTriangle } from 'lucide-react';
import { demoFinancialHealth } from '../lib/demoData';

export default function FinancialHealth() {
  const health = demoFinancialHealth;

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Health Index</h2>
        <p className="text-gray-600">Comprehensive analysis of your financial wellness</p>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 mb-1">Overall Health Score</p>
            <h3 className="text-5xl font-bold">{health.health_index}</h3>
            <p className="text-xl mt-2">{getHealthLabel(health.health_index)}</p>
          </div>
          <Activity className="w-20 h-20 text-blue-200" />
        </div>
        <div className="w-full bg-blue-800 rounded-full h-4">
          <div
            className="bg-white h-4 rounded-full transition-all"
            style={{ width: `${health.health_index}%` }}
          />
        </div>
        <p className="text-sm text-blue-100 mt-4">
          Last calculated: {new Date(health.calculated_at).toLocaleString()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <HealthMetric
          title="Income Stability"
          score={health.income_stability}
          icon={<TrendingUp className="w-6 h-6" />}
          description="Consistency and predictability of your income sources"
          recommendations={[
            'Your income is highly stable with regular payments',
            'Consider diversifying income sources for additional security'
          ]}
        />
        <HealthMetric
          title="Expense Ratio"
          score={health.expense_ratio}
          icon={<PieChart className="w-6 h-6" />}
          description="How well you manage expenses relative to income"
          recommendations={[
            'Your expenses are well-managed at 68% of income',
            'Try to reduce discretionary spending by 5% for optimal health'
          ]}
        />
        <HealthMetric
          title="Savings Rate"
          score={health.savings_rate}
          icon={<Target className="w-6 h-6" />}
          description="Percentage of income consistently saved"
          recommendations={[
            'Excellent savings rate! You\'re saving 20% of income',
            'Consider automating savings to maintain this rate'
          ]}
        />
        <HealthMetric
          title="Debt Ratio"
          score={health.debt_ratio}
          icon={<AlertTriangle className="w-6 h-6" />}
          description="Debt obligations relative to income"
          recommendations={[
            'Debt levels are moderate and manageable',
            'Focus on high-interest debt first to improve this score'
          ]}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Health Breakdown</h3>
        <div className="space-y-4">
          <BreakdownItem
            label="Income Stability"
            score={health.income_stability}
            weight={25}
          />
          <BreakdownItem
            label="Expense Management"
            score={health.expense_ratio}
            weight={25}
          />
          <BreakdownItem
            label="Savings Discipline"
            score={health.savings_rate}
            weight={30}
          />
          <BreakdownItem
            label="Debt Management"
            score={health.debt_ratio}
            weight={20}
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Personalized Recommendations</h3>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Your financial health is above average. Continue building your emergency fund to reach 6 months of expenses.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Consider increasing your investment allocation to grow wealth faster while maintaining your excellent savings rate.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-green-800">
              Review your insurance coverage to ensure comprehensive protection for your growing financial health.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface HealthMetricProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  recommendations: string[];
}

function HealthMetric({ title, score, icon, description, recommendations }: HealthMetricProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBarColor = (s: number) => {
    if (s >= 80) return 'bg-green-600';
    if (s >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-gray-700">{icon}</div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
        </div>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="space-y-1">
        {recommendations.map((rec, idx) => (
          <p key={idx} className="text-xs text-gray-500 flex items-start">
            <span className="mr-1">→</span>
            <span>{rec}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

interface BreakdownItemProps {
  label: string;
  score: number;
  weight: number;
}

function BreakdownItem({ label, score, weight }: BreakdownItemProps) {
  const contribution = (score * weight) / 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-600">{score}/100 (Weight: {weight}%)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700 w-12 text-right">
          +{contribution.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
