export interface User {
  id: string;
  email: string;
  full_name: string;
  preferred_language: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  created_at: string;
}

export interface CreditScore {
  id: string;
  user_id: string;
  score: number;
  factors: CreditFactor[];
  calculated_at: string;
}

export interface CreditFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

export interface FinancialHealth {
  id: string;
  user_id: string;
  health_index: number;
  income_stability: number;
  expense_ratio: number;
  savings_rate: number;
  debt_ratio: number;
  calculated_at: string;
}

export interface FraudAlert {
  id: string;
  user_id: string;
  transaction_id: string | null;
  risk_level: 'low' | 'medium' | 'high';
  alert_type: string;
  description: string;
  ai_confidence: number;
  status: 'pending' | 'reviewed' | 'resolved' | 'false_positive';
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface UserQuizProgress {
  id: string;
  user_id: string;
  question_id: string;
  answered_correctly: boolean;
  answered_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  language: string;
  created_at: string;
}
