import { Transaction, CreditScore, FinancialHealth, FraudAlert, QuizQuestion, Badge } from '../types';

export const demoUser = {
  id: 'demo-user-123',
  email: 'demo@financialinclusion.com',
  full_name: 'Demo User',
  preferred_language: 'en',
  created_at: new Date().toISOString()
};

export const demoTransactions: Omit<Transaction, 'id' | 'user_id' | 'created_at'>[] = [
  { type: 'income', category: 'Salary', amount: 3500, description: 'Monthly salary', date: new Date('2025-10-01').toISOString() },
  { type: 'income', category: 'Freelance', amount: 800, description: 'Side project payment', date: new Date('2025-10-05').toISOString() },
  { type: 'expense', category: 'Rent', amount: 1200, description: 'Monthly rent', date: new Date('2025-10-02').toISOString() },
  { type: 'expense', category: 'Groceries', amount: 350, description: 'Supermarket shopping', date: new Date('2025-10-08').toISOString() },
  { type: 'expense', category: 'Transportation', amount: 120, description: 'Public transit pass', date: new Date('2025-10-03').toISOString() },
  { type: 'expense', category: 'Utilities', amount: 150, description: 'Electricity and water', date: new Date('2025-10-05').toISOString() },
  { type: 'expense', category: 'Healthcare', amount: 80, description: 'Doctor visit', date: new Date('2025-10-12').toISOString() },
  { type: 'income', category: 'Investment', amount: 200, description: 'Dividend payment', date: new Date('2025-10-15').toISOString() },
  { type: 'expense', category: 'Entertainment', amount: 60, description: 'Movie tickets', date: new Date('2025-10-18').toISOString() },
  { type: 'expense', category: 'Education', amount: 150, description: 'Online course', date: new Date('2025-10-20').toISOString() },
];

export const demoSavingsGoals = [
  { goal_name: 'Emergency Fund', target_amount: 5000, current_amount: 2800, deadline: new Date('2026-03-31').toISOString() },
  { goal_name: 'Home Down Payment', target_amount: 20000, current_amount: 8500, deadline: new Date('2027-12-31').toISOString() },
  { goal_name: 'Vacation', target_amount: 2000, current_amount: 1200, deadline: new Date('2026-06-01').toISOString() },
];

export const demoCreditScore: Omit<CreditScore, 'id' | 'user_id'> = {
  score: 720,
  factors: [
    { name: 'Payment History', impact: 'positive', weight: 35, description: 'Consistent on-time payments with no defaults' },
    { name: 'Credit Utilization', impact: 'positive', weight: 30, description: 'Low credit utilization at 25%' },
    { name: 'Length of Credit History', impact: 'neutral', weight: 15, description: 'Moderate credit history of 4 years' },
    { name: 'Alternative Data: Utility Bills', impact: 'positive', weight: 10, description: 'Regular utility payments recorded' },
    { name: 'Alternative Data: Mobile Payments', impact: 'positive', weight: 5, description: 'Active digital wallet usage shows financial engagement' },
    { name: 'Alternative Data: Rental Payments', impact: 'positive', weight: 5, description: 'Consistent rental payment history' },
  ],
  calculated_at: new Date().toISOString()
};

export const demoFinancialHealth: Omit<FinancialHealth, 'id' | 'user_id'> = {
  health_index: 72,
  income_stability: 85,
  expense_ratio: 68,
  savings_rate: 75,
  debt_ratio: 62,
  calculated_at: new Date().toISOString()
};

export const demoFraudAlerts: Omit<FraudAlert, 'id' | 'user_id' | 'transaction_id'>[] = [
  {
    risk_level: 'low',
    alert_type: 'Unusual Location',
    description: 'Transaction detected from a new location 200km away',
    ai_confidence: 0.45,
    status: 'reviewed',
    created_at: new Date('2025-10-25').toISOString()
  },
  {
    risk_level: 'medium',
    alert_type: 'Unusual Amount',
    description: 'Transaction amount 3x higher than your average spending',
    ai_confidence: 0.68,
    status: 'pending',
    created_at: new Date('2025-10-28').toISOString()
  }
];

export const quizQuestions: Omit<QuizQuestion, 'id'>[] = [
  {
    question: 'What is the recommended emergency fund size?',
    options: ['1 month of expenses', '3-6 months of expenses', '1 year of expenses', 'No emergency fund needed'],
    correct_answer: 1,
    category: 'Savings',
    difficulty: 'easy',
    points: 10
  },
  {
    question: 'What does APR stand for?',
    options: ['Annual Payment Rate', 'Annual Percentage Rate', 'Average Payment Ratio', 'Annual Principal Rate'],
    correct_answer: 1,
    category: 'Credit',
    difficulty: 'easy',
    points: 10
  },
  {
    question: 'Which factor has the biggest impact on your credit score?',
    options: ['Credit utilization', 'Payment history', 'Length of credit history', 'New credit inquiries'],
    correct_answer: 1,
    category: 'Credit',
    difficulty: 'medium',
    points: 15
  },
  {
    question: 'What is compound interest?',
    options: [
      'Interest calculated only on the principal',
      'Interest calculated on principal and accumulated interest',
      'A type of bank fee',
      'Interest paid monthly'
    ],
    correct_answer: 1,
    category: 'Investment',
    difficulty: 'medium',
    points: 15
  },
  {
    question: 'What is the 50/30/20 budgeting rule?',
    options: [
      '50% savings, 30% needs, 20% wants',
      '50% needs, 30% wants, 20% savings',
      '50% wants, 30% savings, 20% needs',
      '50% needs, 30% savings, 20% wants'
    ],
    correct_answer: 1,
    category: 'Budgeting',
    difficulty: 'medium',
    points: 15
  },
  {
    question: 'What is diversification in investing?',
    options: [
      'Investing all money in one stock',
      'Spreading investments across different assets',
      'Only investing in bonds',
      'Keeping all money in savings'
    ],
    correct_answer: 1,
    category: 'Investment',
    difficulty: 'hard',
    points: 20
  }
];

export const badges: Omit<Badge, 'id'>[] = [
  { name: 'First Steps', description: 'Completed your first financial literacy quiz', icon: 'award', requirement: '1 quiz completed' },
  { name: 'Quiz Master', description: 'Answered 10 quiz questions correctly', icon: 'trophy', requirement: '10 correct answers' },
  { name: 'Savings Star', description: 'Created your first savings goal', icon: 'star', requirement: '1 savings goal' },
  { name: 'Budget Pro', description: 'Tracked expenses for 30 days', icon: 'target', requirement: '30 days of tracking' },
  { name: 'Credit Guardian', description: 'Checked your credit score', icon: 'shield', requirement: 'View credit score' },
  { name: 'Fraud Detective', description: 'Reviewed a fraud alert', icon: 'search', requirement: '1 alert reviewed' },
];
