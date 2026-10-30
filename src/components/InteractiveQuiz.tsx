import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizItem {
  id: string;
  category: string;
  question: string;
  questionUrdu: string;
  contextBox?: string;
  placeholder: string;
  hint: string;
  check: (input: string) => boolean;
  successFeedback: string;
  errorFeedback: string;
}

export const InteractiveQuiz: React.FC = () => {
  const [activeQuizId, setActiveQuizId] = useState<string>('mini_arithmetic');
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, { status: 'correct' | 'wrong' | null; message: string }>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const quizzes: QuizItem[] = [
    {
      id: 'mini_arithmetic',
      category: "TODAY'S MINI-TASK",
      question: 'What is the total sales amount for the first three days?',
      questionUrdu: 'پہلے تین دنوں کی کل سیلز کتنی ہے؟',
      contextBox: `Monday: Rs. 2,500\nTuesday: Rs. 3,000\nWednesday: Rs. 1,500`,
      placeholder: 'Write your answer in Rs (e.g. 7000)...',
      hint: '2,500 + 3,000 + 1,500 ko jama karein.',
      check: (input) => {
        const cleaned = input.replace(/[,\s]|rs\.?|pkr/gi, '');
        return Number(cleaned) === 7000;
      },
      successFeedback: 'Correct! Rs. 7,000. Great work! (Shabash, bilkul sahi hisab kiya).',
      errorFeedback: 'Try again: add 2,500 + 3,000 + 1,500.',
    },
    {
      id: 'excel_sum',
      category: 'EXCEL FORMULA',
      question: 'What formula sums cells B2 through B8 in Excel/Sheets?',
      questionUrdu: 'ایکسل میں B2 سے B8 تک کی ویلیوز جمع کرنے کا فارمولا کیا ہے؟',
      contextBox: `Column B contains 7 days of daily revenue figures.`,
      placeholder: 'Write formula e.g. =SUM(...)',
      hint: 'Formula starts with =, followed by SUM and bracketed range (B2:B8)',
      check: (input) => {
        const cleaned = input.trim().toUpperCase().replace(/\s/g, '');
        return cleaned === '=SUM(B2:B8)' || cleaned === 'SUM(B2:B8)';
      },
      successFeedback: 'Zabardast! =SUM(B2:B8) is the standard syntax for continuous ranges.',
      errorFeedback: 'Remember the formula starts with =SUM followed by (B2:B8).',
    },
    {
      id: 'sql_where',
      category: 'SQL QUERY',
      question: 'Complete the query to get all orders where amount exceeds 5000: SELECT * FROM orders WHERE ...',
      questionUrdu: 'وہ کیوری مکمل کریں جہاں آرڈر کی رقم 5000 سے زائد ہو: SELECT * FROM orders WHERE ...',
      contextBox: `Table: orders (id, customer, amount, status)`,
      placeholder: 'Complete the condition (e.g. amount > 5000)',
      hint: 'Use the column name "amount", greater-than operator ">", and 5000',
      check: (input) => {
        const cleaned = input.trim().toLowerCase().replace(/\s/g, '').replace(/;/g, '');
        return cleaned.includes('amount>5000') || cleaned.includes('amount>=5000');
      },
      successFeedback: 'Brilliant! "amount > 5000" filters the database for high-value orders.',
      errorFeedback: 'Hint: write condition like: amount > 5000',
    },
  ];

  const currentQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];
  const currentInput = userInputs[currentQuiz.id] || '';
  const currentResult = results[currentQuiz.id] || { status: null, message: '' };

  const handleCheck = () => {
    if (!currentInput.trim()) {
      setResults((prev) => ({
        ...prev,
        [currentQuiz.id]: {
          status: 'wrong',
          message: 'Please write an answer before submitting.',
        },
      }));
      return;
    }

    const isCorrect = currentQuiz.check(currentInput);
    if (isCorrect) {
      setResults((prev) => ({
        ...prev,
        [currentQuiz.id]: {
          status: 'correct',
          message: currentQuiz.successFeedback,
        },
      }));
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // no-op if confetti fails
      }
    } else {
      setResults((prev) => ({
        ...prev,
        [currentQuiz.id]: {
          status: 'wrong',
          message: currentQuiz.errorFeedback,
        },
      }));
    }
  };

  const handleReset = () => {
    setUserInputs((prev) => ({ ...prev, [currentQuiz.id]: '' }));
    setResults((prev) => ({ ...prev, [currentQuiz.id]: { status: null, message: '' } }));
    setShowHint((prev) => ({ ...prev, [currentQuiz.id]: false }));
  };

  return (
    <div id="mini-task" className="bg-[#101d30] border border-[#263b55] rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Category selector */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">🎯 Today's mini-task</h2>
        </div>
        <div className="flex items-center gap-1">
          {quizzes.map((q) => (
            <button
              key={q.id}
              onClick={() => setActiveQuizId(q.id)}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeQuizId === q.id
                  ? 'bg-[#203650] text-[#35d5e8] border border-[#35516f]'
                  : 'text-[#9db0c8] hover:text-white'
              }`}
            >
              {q.id === 'mini_arithmetic' ? 'Sales Task' : q.id === 'excel_sum' ? 'Excel' : 'SQL'}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#9db0c8] mb-3">
        {currentQuiz.questionUrdu} Practice quick numerical and technical questions.
      </p>

      {/* Context Box */}
      {currentQuiz.contextBox && (
        <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3.5 font-mono text-xs text-[#cfe4f7] whitespace-pre-wrap mb-3 leading-relaxed">
          {currentQuiz.contextBox}
        </div>
      )}

      {/* Question */}
      <div className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#35d5e8]" />
        <span>Question: {currentQuiz.question}</span>
      </div>

      {/* Answer Input */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            id="answer"
            rows={2}
            value={currentInput}
            onChange={(e) =>
              setUserInputs((prev) => ({ ...prev, [currentQuiz.id]: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCheck();
              }
            }}
            placeholder={currentQuiz.placeholder}
            className="w-full bg-[#091626] border border-[#35516f] focus:border-[#35d5e8] rounded-xl p-3 text-xs text-[#edf5ff] placeholder-[#9db0c8] focus:outline-none transition-colors"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              id="checkAnswer"
              onClick={handleCheck}
              className="px-4 py-2 rounded-lg bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Check answer
            </button>

            <button
              onClick={() =>
                setShowHint((prev) => ({ ...prev, [currentQuiz.id]: !prev[currentQuiz.id] }))
              }
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#14243a] hover:bg-[#203650] text-[#9db0c8] hover:text-white text-xs border border-[#263b55] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hint</span>
            </button>
          </div>

          {(currentResult.status !== null || currentInput) && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] text-[#9db0c8] hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Hint banner */}
        {showHint[currentQuiz.id] && (
          <div className="p-2.5 rounded-lg bg-[#14243a] border border-[#263b55] text-xs text-[#35d5e8]">
            💡 <strong>Hint:</strong> {currentQuiz.hint}
          </div>
        )}

        {/* Result Feedback banner */}
        {currentResult.status && (
          <div
            id="answerResult"
            aria-live="polite"
            className={`p-3 rounded-xl text-xs flex items-center gap-2 transition-all ${
              currentResult.status === 'correct'
                ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                : 'bg-rose-950/40 border border-rose-800 text-rose-300'
            }`}
          >
            {currentResult.status === 'correct' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#46d39a]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span className="font-medium">{currentResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
