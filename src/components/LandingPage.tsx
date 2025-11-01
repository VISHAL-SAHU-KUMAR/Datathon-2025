import { ArrowRight, Shield, TrendingUp, Brain, Award, Globe, Lock } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FinInclusion AI</h1>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Financial Inclusion for the Next Billion Users
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          AI-powered financial ecosystem that makes credit, savings, and financial wellness accessible to everyone, everywhere.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
        >
          <span>Launch Dashboard</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<TrendingUp className="w-10 h-10 text-blue-600" />}
            title="Smart Dashboard"
            description="Track income, expenses, and savings with intelligent insights and real-time visualizations"
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-green-600" />}
            title="Financial Health Index"
            description="Comprehensive health score based on income stability, expense ratios, savings rate, and debt analysis"
          />
          <FeatureCard
            icon={<Brain className="w-10 h-10 text-purple-600" />}
            title="Alternative Credit Scoring"
            description="Explainable AI credit scores using alternative data like utility bills, mobile payments, and rental history"
          />
          <FeatureCard
            icon={<Globe className="w-10 h-10 text-orange-600" />}
            title="AI Financial Mentor"
            description="Local-language chatbot providing personalized financial advice and education"
          />
          <FeatureCard
            icon={<Lock className="w-10 h-10 text-red-600" />}
            title="Fraud Detection"
            description="Real-time AI-powered risk intelligence and fraud detection to protect your finances"
          />
          <FeatureCard
            icon={<Award className="w-10 h-10 text-yellow-600" />}
            title="Gamified Learning"
            description="Earn badges and points while learning financial literacy through interactive quizzes"
          />
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Open API Ecosystem</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-blue-700 rounded-lg p-8">
              <h4 className="text-2xl font-bold mb-4">Credit Score API</h4>
              <p className="text-blue-100 mb-4">
                Access alternative credit scoring engine with explainable AI factors
              </p>
              <code className="text-sm text-blue-200 bg-blue-800 px-3 py-1 rounded">
                POST /api/credit-score
              </code>
            </div>
            <div className="bg-blue-700 rounded-lg p-8">
              <h4 className="text-2xl font-bold mb-4">Risk Insight API</h4>
              <p className="text-blue-100 mb-4">
                Real-time fraud detection and risk analysis powered by AI
              </p>
              <code className="text-sm text-blue-200 bg-blue-800 px-3 py-1 rounded">
                POST /api/risk-insight
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Built for Hackathon MVP Demo
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          This platform demonstrates the power of AI-driven financial inclusion technology, ready to scale for millions of underserved users worldwide.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
        >
          <span>Try the Demo</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 FinInclusion AI. Empowering financial access for all.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
