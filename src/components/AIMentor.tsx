import { useState } from 'react';
import { Send, Bot, User, Globe } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  language: string;
}

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Financial Mentor. I can help you with budgeting, saving, investing, credit building, and more. What would you like to learn about today?',
      language: 'en'
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage: string, lang: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      return lang === 'es'
        ? 'Un buen presupuesto sigue la regla 50/30/20: 50% para necesidades, 30% para deseos y 20% para ahorros. Comienza rastreando tus gastos durante un mes para entender tus patrones de gasto.'
        : 'A good budget follows the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Start by tracking your expenses for a month to understand your spending patterns.';
    }

    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return lang === 'es'
        ? 'Para ahorrar efectivamente: 1) Construye un fondo de emergencia de 3-6 meses de gastos, 2) Automatiza tus ahorros, 3) Establece metas específicas. Incluso ahorrar 50-100 dólares al mes puede crear un hábito poderoso.'
        : 'To save effectively: 1) Build an emergency fund of 3-6 months expenses, 2) Automate your savings, 3) Set specific goals. Even saving $50-100/month can build a powerful habit.';
    }

    if (lowerMessage.includes('credit') || lowerMessage.includes('score')) {
      return lang === 'hi'
        ? 'अपने क्रेडिट स्कोर को सुधारने के लिए: 1) समय पर भुगतान करें, 2) क्रेडिट उपयोग को 30% से कम रखें, 3) पुराने खाते खुले रखें, 4) नए क्रेडिट के लिए बहुत सारे आवेदन से बचें।'
        : 'To improve your credit score: 1) Pay bills on time, 2) Keep credit utilization under 30%, 3) Keep old accounts open, 4) Avoid too many applications for new credit.';
    }

    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return lang === 'es'
        ? 'La inversión comienza con comprender tu tolerancia al riesgo y horizonte temporal. Para principiantes: considera fondos indexados de bajo costo, diversifica entre clases de activos y piensa a largo plazo. Comienza con lo que puedas permitirte, incluso cantidades pequeñas.'
        : 'Investing starts with understanding your risk tolerance and time horizon. For beginners: consider low-cost index funds, diversify across asset classes, and think long-term. Start with what you can afford, even small amounts.';
    }

    if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      return lang === 'hi'
        ? 'ऋण प्रबंधन: 1) उच्च-ब्याज ऋण को प्राथमिकता दें, 2) न्यूनतम से अधिक भुगतान करें, 3) ऋण एकीकरण पर विचार करें, 4) और नया ऋण लेने से बचें। एक योजना बनाएं और उस पर टिके रहें।'
        : 'Debt management: 1) Prioritize high-interest debt, 2) Pay more than minimums, 3) Consider debt consolidation, 4) Avoid taking on new debt. Make a plan and stick to it.';
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('fund')) {
      return 'An emergency fund is crucial! Aim for 3-6 months of living expenses. Start small - even $500 can help. Keep it in a high-yield savings account that\'s easily accessible but separate from daily spending.';
    }

    return lang === 'es'
      ? 'Entiendo tu pregunta. Puedo ayudarte con presupuestos, ahorros, crédito, inversión y planificación financiera. ¿Podrías ser más específico sobre lo que te gustaría aprender?'
      : lang === 'hi'
      ? 'मैं आपका सवाल समझता हूं। मैं बजट, बचत, क्रेडिट, निवेश और वित्तीय योजना में मदद कर सकता हूं। क्या आप बता सकते हैं कि आप क्या सीखना चाहेंगे?'
      : 'I understand your question. I can help with budgeting, savings, credit, investing, and financial planning. Could you be more specific about what you\'d like to learn?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: getAIResponse(input, language),
        language
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    { en: 'How do I start budgeting?', es: '¿Cómo empiezo a presupuestar?', hi: 'मैं बजट कैसे शुरू करूं?' },
    { en: 'How to improve credit score?', es: '¿Cómo mejorar el puntaje de crédito?', hi: 'क्रेडिट स्कोर कैसे सुधारें?' },
    { en: 'Best savings strategies?', es: '¿Mejores estrategias de ahorro?', hi: 'सबसे अच्छी बचत रणनीतियाँ?' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Financial Mentor</h2>
        <p className="text-gray-600">Get personalized financial advice in your preferred language</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Language:</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              language === 'es'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Español
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              language === 'hi'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-md ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-600">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2 mb-3">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q[language as keyof typeof q])}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {q[language as keyof typeof q]}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                language === 'es'
                  ? 'Escribe tu pregunta...'
                  : language === 'hi'
                  ? 'अपना सवाल टाइप करें...'
                  : 'Type your question...'
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This AI mentor provides educational guidance. For personalized financial advice,
          please consult with a certified financial advisor.
        </p>
      </div>
    </div>
  );
}
