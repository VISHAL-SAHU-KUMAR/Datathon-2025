/*
  # Financial Inclusion Platform Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `preferred_language` (text, default 'en')
      - `created_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text: 'income' or 'expense')
      - `category` (text)
      - `amount` (numeric)
      - `description` (text)
      - `date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `savings_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `goal_name` (text)
      - `target_amount` (numeric)
      - `current_amount` (numeric, default 0)
      - `deadline` (timestamptz)
      - `created_at` (timestamptz)
    
    - `credit_scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `score` (integer)
      - `factors` (jsonb)
      - `calculated_at` (timestamptz)
    
    - `financial_health`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `health_index` (numeric)
      - `income_stability` (numeric)
      - `expense_ratio` (numeric)
      - `savings_rate` (numeric)
      - `debt_ratio` (numeric)
      - `calculated_at` (timestamptz)
    
    - `fraud_alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `transaction_id` (uuid, nullable)
      - `risk_level` (text: 'low', 'medium', 'high')
      - `alert_type` (text)
      - `description` (text)
      - `ai_confidence` (numeric)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)
    
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `question` (text)
      - `options` (jsonb)
      - `correct_answer` (integer)
      - `category` (text)
      - `difficulty` (text)
      - `points` (integer, default 10)
    
    - `user_quiz_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `question_id` (uuid, foreign key)
      - `answered_correctly` (boolean)
      - `answered_at` (timestamptz)
    
    - `badges`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `requirement` (text)
    
    - `user_badges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `badge_id` (uuid, foreign key)
      - `earned_at` (timestamptz)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `message` (text)
      - `response` (text)
      - `language` (text, default 'en')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for quiz questions and badges
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  preferred_language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  description text DEFAULT '',
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions"
  ON transactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  goal_name text NOT NULL,
  target_amount numeric NOT NULL CHECK (target_amount > 0),
  current_amount numeric DEFAULT 0 CHECK (current_amount >= 0),
  deadline timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own savings goals"
  ON savings_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own savings goals"
  ON savings_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own savings goals"
  ON savings_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own savings goals"
  ON savings_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS credit_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL CHECK (score >= 300 AND score <= 850),
  factors jsonb NOT NULL,
  calculated_at timestamptz DEFAULT now()
);

ALTER TABLE credit_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credit scores"
  ON credit_scores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS financial_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  health_index numeric NOT NULL CHECK (health_index >= 0 AND health_index <= 100),
  income_stability numeric NOT NULL CHECK (income_stability >= 0 AND income_stability <= 100),
  expense_ratio numeric NOT NULL CHECK (expense_ratio >= 0 AND expense_ratio <= 100),
  savings_rate numeric NOT NULL CHECK (savings_rate >= 0 AND savings_rate <= 100),
  debt_ratio numeric NOT NULL CHECK (debt_ratio >= 0 AND debt_ratio <= 100),
  calculated_at timestamptz DEFAULT now()
);

ALTER TABLE financial_health ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own financial health"
  ON financial_health FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS fraud_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  transaction_id uuid REFERENCES transactions(id) ON DELETE SET NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  alert_type text NOT NULL,
  description text NOT NULL,
  ai_confidence numeric NOT NULL CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'false_positive')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fraud_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fraud alerts"
  ON fraud_alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own fraud alerts"
  ON fraud_alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points integer DEFAULT 10 CHECK (points > 0)
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz questions"
  ON quiz_questions FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS user_quiz_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES quiz_questions(id) ON DELETE CASCADE NOT NULL,
  answered_correctly boolean NOT NULL,
  answered_at timestamptz DEFAULT now()
);

ALTER TABLE user_quiz_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz progress"
  ON user_quiz_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz progress"
  ON user_quiz_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  requirement text NOT NULL
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_credit_scores_user_id ON credit_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_health_user_id ON financial_health(user_id);
CREATE INDEX IF NOT EXISTS idx_fraud_alerts_user_id ON fraud_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_progress_user_id ON user_quiz_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);