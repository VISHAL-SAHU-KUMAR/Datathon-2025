import { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  Shield,
  MessageSquare,
  AlertTriangle,
  Code,
  Trophy,
  Menu,
  X,
  Home
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import FinancialHealth from './components/FinancialHealth';
import CreditScore from './components/CreditScore';
import AIMentor from './components/AIMentor';
import FraudDetection from './components/FraudDetection';
import APIShowcase from './components/APIShowcase';
import Gamification from './components/Gamification';

type Page = 'landing' | 'dashboard' | 'health' | 'credit' | 'mentor' | 'fraud' | 'api' | 'gamification';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
  }

  const navigation = [
    { name: 'Dashboard', page: 'dashboard' as Page, icon: LayoutDashboard },
    { name: 'Financial Health', page: 'health' as Page, icon: Activity },
    { name: 'Credit Score', page: 'credit' as Page, icon: Shield },
    { name: 'AI Mentor', page: 'mentor' as Page, icon: MessageSquare },
    { name: 'Fraud Detection', page: 'fraud' as Page, icon: AlertTriangle },
    { name: 'API Showcase', page: 'api' as Page, icon: Code },
    { name: 'Gamification', page: 'gamification' as Page, icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">FinInclusion AI</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="lg:flex">
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-lg z-30 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-gray-200 hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-900">FinInclusion AI</h1>
            <p className="text-sm text-gray-600 mt-1">Financial Platform</p>
          </div>

          <nav className="p-4 space-y-1 mt-16 lg:mt-0">
            <button
              onClick={() => {
                setCurrentPage('landing');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>

            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 mb-1">Demo Mode</p>
              <p className="text-xs text-blue-700">Using sample data for showcase</p>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 lg:p-8 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'health' && <FinancialHealth />}
            {currentPage === 'credit' && <CreditScore />}
            {currentPage === 'mentor' && <AIMentor />}
            {currentPage === 'fraud' && <FraudDetection />}
            {currentPage === 'api' && <APIShowcase />}
            {currentPage === 'gamification' && <Gamification />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
