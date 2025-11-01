import { useState } from 'react';
import { Trophy, Award, Star, Target, CheckCircle, XCircle, Gamepad2 } from 'lucide-react';
import { quizQuestions, badges } from '../lib/demoData';

export default function Gamification() {
  const [activeSection, setActiveSection] = useState<'quiz' | 'badges' | 'games'>('quiz');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Literacy Gamification</h2>
        <p className="text-gray-600">Learn and earn rewards while building financial knowledge</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Learning Progress</h3>
            <p className="text-yellow-100">Keep learning to unlock more badges and rewards</p>
          </div>
          <Trophy className="w-20 h-20 text-yellow-200" />
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">350</p>
            <p className="text-sm text-yellow-100">Total Points</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">12</p>
            <p className="text-sm text-yellow-100">Quizzes Completed</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">6</p>
            <p className="text-sm text-yellow-100">Badges Earned</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">85%</p>
            <p className="text-sm text-yellow-100">Success Rate</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('quiz')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeSection === 'quiz'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Quiz Zone
        </button>
        <button
          onClick={() => setActiveSection('badges')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeSection === 'badges'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Badges & Achievements
        </button>
        <button
          onClick={() => setActiveSection('games')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeSection === 'games'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Game Zone
        </button>
      </div>

      {activeSection === 'quiz' && <QuizZone />}
      {activeSection === 'badges' && <BadgesSection />}
      {activeSection === 'games' && <GameZone />}
    </div>
  );
}

function QuizZone() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct_answer) {
      setScore(score + question.points);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'easy') return 'bg-green-100 text-green-800';
    if (difficulty === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
              <span className="text-sm text-gray-600">Category: {question.category}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Score</p>
            <p className="text-2xl font-bold text-blue-600">{score} pts</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && handleAnswer(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showResult
                  ? idx === question.correct_answer
                    ? 'border-green-600 bg-green-50'
                    : idx === selectedAnswer
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                  : selectedAnswer === idx
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{option}</span>
                {showResult && idx === question.correct_answer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && idx === selectedAnswer && idx !== question.correct_answer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === question.correct_answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-semibold ${
                selectedAnswer === question.correct_answer ? 'text-green-900' : 'text-red-900'
              }`}>
                {selectedAnswer === question.correct_answer
                  ? `Correct! You earned ${question.points} points.`
                  : 'Incorrect. Keep learning!'}
              </p>
            </div>
            <button
              onClick={nextQuestion}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Restart Quiz'}
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Categories</h3>
          <div className="space-y-2">
            <CategoryTag name="Savings" count={8} />
            <CategoryTag name="Credit" count={12} />
            <CategoryTag name="Investment" count={10} />
            <CategoryTag name="Budgeting" count={15} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            <Achievement text="Completed 5 quizzes in a row" points={50} />
            <Achievement text="Perfect score on Credit category" points={100} />
            <Achievement text="Reached 300 total points" points={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgesSection() {
  const earnedBadges = badges.slice(0, 3);
  const lockedBadges = badges.slice(3);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Badges</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {earnedBadges.map((badge, idx) => (
            <BadgeCard key={idx} badge={badge} earned={true} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Locked Badges</h3>
        <p className="text-gray-600 mb-4">Complete these challenges to unlock more badges!</p>
        <div className="grid md:grid-cols-3 gap-6">
          {lockedBadges.map((badge, idx) => (
            <BadgeCard key={idx} badge={badge} earned={false} />
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">How to Earn Badges</h3>
        <ul className="space-y-2 text-yellow-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Complete quizzes and answer questions correctly</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Track your expenses and reach savings goals</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check your credit score and review fraud alerts</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Play financial literacy games and achieve high scores</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function GameZone() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <GameCard
          title="Budget Master Challenge"
          description="Balance your virtual budget for 12 months without going into debt"
          difficulty="Medium"
          players={1250}
          topScore={9850}
        />
        <GameCard
          title="Investment Simulator"
          description="Build a diversified portfolio and maximize returns over 5 years"
          difficulty="Hard"
          players={890}
          topScore={12400}
        />
        <GameCard
          title="Savings Sprint"
          description="Reach savings goals by making smart financial decisions"
          difficulty="Easy"
          players={2100}
          topScore={5600}
        />
        <GameCard
          title="Credit Score Builder"
          description="Improve your virtual credit score from 500 to 800+"
          difficulty="Medium"
          players={1680}
          topScore={8200}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard - This Week</h3>
        <div className="space-y-3">
          <LeaderboardItem rank={1} name="Sarah K." score={15240} />
          <LeaderboardItem rank={2} name="Michael T." score={14850} />
          <LeaderboardItem rank={3} name="Jessica L." score={13920} />
          <LeaderboardItem rank={4} name="You" score={12600} highlight={true} />
          <LeaderboardItem rank={5} name="David M." score={11780} />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Weekly Challenge</h3>
        <p className="text-green-800 mb-4">
          Complete all 4 games this week and earn a special "Financial Champion" badge plus 500 bonus points!
        </p>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-green-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: '50%' }} />
          </div>
          <span className="text-sm font-medium text-green-900">2/4 Games</span>
        </div>
      </div>
    </div>
  );
}

function CategoryTag({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="font-medium text-gray-900">{name}</span>
      <span className="text-sm text-gray-600">{count} questions</span>
    </div>
  );
}

function Achievement({ text, points }: { text: string; points: number }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
      <Star className="w-5 h-5 text-yellow-600" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{text}</p>
        <p className="text-xs text-gray-600">+{points} points</p>
      </div>
    </div>
  );
}

interface BadgeCardProps {
  badge: { name: string; description: string; icon: string; requirement: string };
  earned: boolean;
}

function BadgeCard({ badge, earned }: BadgeCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'award': return Award;
      case 'star': return Star;
      case 'target': return Target;
      case 'shield': return CheckCircle;
      default: return Award;
    }
  };

  const Icon = getIcon(badge.icon);

  return (
    <div className={`border-2 rounded-lg p-6 text-center ${
      earned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-60'
    }`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
        earned ? 'bg-yellow-400' : 'bg-gray-300'
      }`}>
        <Icon className={`w-8 h-8 ${earned ? 'text-white' : 'text-gray-500'}`} />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
      <p className="text-xs text-gray-500">{badge.requirement}</p>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  difficulty: string;
  players: number;
  topScore: number;
}

function GameCard({ title, description, difficulty, players, topScore }: GameCardProps) {
  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'bg-green-100 text-green-800';
    if (diff === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Gamepad2 className="w-10 h-10 text-blue-600" />
        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{players.toLocaleString()} players</span>
        <span>Top: {topScore.toLocaleString()} pts</span>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Play Now
      </button>
    </div>
  );
}

interface LeaderboardItemProps {
  rank: number;
  name: string;
  score: number;
  highlight?: boolean;
}

function LeaderboardItem({ rank, name, score, highlight }: LeaderboardItemProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      highlight ? 'bg-blue-50 border-2 border-blue-600' : 'bg-gray-50'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
          rank === 1 ? 'bg-yellow-400 text-white' :
          rank === 2 ? 'bg-gray-300 text-white' :
          rank === 3 ? 'bg-orange-400 text-white' :
          'bg-gray-200 text-gray-700'
        }`}>
          {rank}
        </div>
        <span className="font-semibold text-gray-900">{name}</span>
      </div>
      <span className="font-bold text-blue-600">{score.toLocaleString()} pts</span>
    </div>
  );
}
