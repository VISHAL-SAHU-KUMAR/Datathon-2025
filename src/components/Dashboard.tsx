import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle } from 'lucide-react';
import { demoTransactions, demoSavingsGoals } from '../lib/demoData';

export default function Dashboard() {
  const totalIncome = demoTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = demoTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpenses;

  const expensesByCategory = demoTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const topExpenseCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h2>
        <p className="text-gray-600">Track your income, expenses, and savings progress</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          trend="+12.5%"
          trendPositive={true}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<TrendingDown className="w-6 h-6 text-red-600" />}
          trend="+5.2%"
          trendPositive={false}
        />
        <StatCard
          title="Net Savings"
          value={`$${netSavings.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          trend="+25.8%"
          trendPositive={true}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {demoTransactions.slice(-8).reverse().map((transaction, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Expense Categories</h3>
          <div className="space-y-4">
            {topExpenseCategories.map(([category, amount]) => {
              const percentage = (amount / totalExpenses) * 100;
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-gray-600">${amount.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="w-6 h-6 text-blue-600" />
          <span>Savings Goals</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {demoSavingsGoals.map((goal, idx) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            return (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{goal.goal_name}</h4>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">${goal.current_amount.toLocaleString()}</span>
                    <span className="text-gray-600">${goal.target_amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {progress.toFixed(0)}% complete
                  {goal.deadline && ` • ${new Date(goal.deadline).toLocaleDateString()}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900">Financial Tip</p>
          <p className="text-sm text-blue-700">
            You're spending 28% of your income on rent, which is within the recommended 30% range. Keep up the good work!
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendPositive: boolean;
}

function StatCard({ title, value, icon, trend, trendPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <span className={`text-sm font-medium ${trendPositive ? 'text-green-600' : 'text-gray-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
