import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Lesson } from '../types';
import confetti from 'canvas-confetti';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onOpenModal: (lesson: Lesson) => void;
  activeLanguage: 'bilingual' | 'english' | 'urdu';
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onOpenModal,
  activeLanguage,
}) => {
  const [showInteractiveTask, setShowInteractiveTask] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; text: string }>({
    status: null,
    text: '',
  });

  const handleCheckboxChange = () => {
    const nextState = !isCompleted;
    onToggleComplete(lesson.id);
    if (nextState) {
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.6 },
        });
      } catch {
        // no-op
      }
    }
  };

  const handleCheckExercise = () => {
    if (!userAnswer.trim()) {
      setFeedback({ status: 'wrong', text: 'Please write an answer before checking.' });
      return;
    }

    const cleaned = userAnswer.trim().toLowerCase();
    const solutions = Array.isArray(lesson.interactiveExercise.solution)
      ? lesson.interactiveExercise.solution.map((s) => s.toLowerCase().trim())
      : [lesson.interactiveExercise.solution.toLowerCase().trim()];

    const isMatch = solutions.some((sol) => cleaned.includes(sol) || sol.includes(cleaned));

    if (isMatch) {
      setFeedback({
        status: 'correct',
        text: lesson.interactiveExercise.explanation,
      });
      if (!isCompleted) {
        onToggleComplete(lesson.id);
      }
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.7 },
        });
      } catch {
        // no-op
      }
    } else {
      setFeedback({
        status: 'wrong',
        text: `Hint: ${lesson.interactiveExercise.hint}`,
      });
    }
  };

  return (
    <div
      className={`border-t border-[#263b55] first-of-type:border-t-0 py-4 transition-colors ${
        isCompleted ? 'bg-[#0a1829]/30 rounded-xl px-3 my-1' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Main lesson content */}
        <div className="flex-1 space-y-1.5">
          {/* Tag & Time */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#35d5e8] tracking-wider">
              {lesson.tag}
            </span>
            {isCompleted && (
              <span className="text-[11px] font-semibold text-[#46d39a] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>
              {lesson.stageNumber}. {lesson.title}
            </span>
          </h3>

          {/* Bilingual Short Description */}
          <p className="text-xs text-[#9db0c8] leading-relaxed">
            {lesson.shortDesc}
          </p>

          {/* Practice Task text */}
          <div className="text-xs text-[#cfe4f7] bg-[#091626] border border-[#263b55] rounded-lg p-2.5 mt-2">
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-[#46d39a] shrink-0">Practice:</span>
              <span className="text-[#edf5ff]">
                {lesson.task.replace('Practice: ', '')}
              </span>
            </div>
            {activeLanguage !== 'english' && (
              <div className="text-[11px] text-[#9db0c8] mt-1 pt-1 border-t border-[#263b55]/40">
                {lesson.taskUrdu}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Checkbox */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-1">
          {/* The Checkbox (matches original prototype) */}
          <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded-lg bg-[#091626] border border-[#263b55] hover:border-[#35d5e8] transition-colors">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded text-[#46d39a] accent-[#46d39a] cursor-pointer"
            />
            <span className="text-xs font-semibold text-white whitespace-nowrap">
              {isCompleted ? 'Marked complete' : 'Mark this lesson complete'}
            </span>
          </label>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenModal(lesson)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#35d5e8] hover:text-[#20c8dc] bg-[#14243a] hover:bg-[#203650] px-2.5 py-1 rounded-lg border border-[#263b55] transition-colors cursor-pointer"
              title="Read full lesson explanation in Urdu and English"
            >
              <BookOpen className="w-3 h-3" />
              <span>Read Guide</span>
            </button>

            <button
              onClick={() => setShowInteractiveTask(!showInteractiveTask)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9db0c8] hover:text-white bg-[#091626] hover:bg-[#14243a] px-2 py-1 rounded-lg border border-[#263b55] transition-colors cursor-pointer"
              title="Try interactive check task"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Exercise</span>
              {showInteractiveTask ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Mini Interactive Exercise */}
      {showInteractiveTask && (
        <div className="mt-3 p-3.5 bg-[#091626] border border-[#28506a] rounded-xl text-xs space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-white font-semibold">
            <span className="flex items-center gap-1.5 text-[#35d5e8]">
              <HelpCircle className="w-3.5 h-3.5" />
              Quick Check: Stage {lesson.stageNumber}
            </span>
            <span className="text-[10px] text-[#9db0c8] uppercase font-mono">
              {lesson.interactiveExercise.type}
            </span>
          </div>

          <p className="text-[#edf5ff]">{lesson.interactiveExercise.prompt}</p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckExercise()}
              placeholder="Your answer..."
              className="flex-1 bg-[#101d30] border border-[#35516f] focus:border-[#35d5e8] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#9db0c8] focus:outline-none"
            />
            <button
              onClick={handleCheckExercise}
              className="px-3 py-1.5 bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] font-bold rounded-lg text-xs whitespace-nowrap cursor-pointer"
            >
              Check
            </button>
          </div>

          {feedback.status && (
            <div
              className={`p-2 rounded-lg text-[11px] font-medium ${
                feedback.status === 'correct'
                  ? 'bg-emerald-950/40 border border-emerald-800 text-[#46d39a]'
                  : 'bg-rose-950/40 border border-rose-800 text-rose-300'
              }`}
            >
              {feedback.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
