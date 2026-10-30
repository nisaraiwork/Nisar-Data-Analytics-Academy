import React from 'react';
import { X, CheckCircle, Clock, BookOpen, Lightbulb, Terminal, HelpCircle } from 'lucide-react';
import { Lesson } from '../types';

interface LessonModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  activeLanguage: 'bilingual' | 'english' | 'urdu';
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  isCompleted,
  onToggleComplete,
  activeLanguage,
}) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#101d30] border border-[#263b55] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#263b55] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#35d5e8] font-bold tracking-wider mb-1">
              <span>{lesson.tag}</span>
              <span className="text-[#9db0c8]/50" aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#9db0c8] font-sans">
                <Clock className="w-3 h-3" />
                {lesson.timeEstimate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lesson.stageNumber}. {lesson.title}
            </h2>
            <p className="text-xs text-[#46d39a] mt-0.5 font-medium">{lesson.titleUrdu}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9db0c8] hover:text-white hover:bg-[#14243a] transition-colors shrink-0"
            aria-label="Close lesson details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#cfe4f7] leading-relaxed">
          {/* Key Concepts bullet strip */}
          <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#35d5e8]" />
              Key Analytical Concepts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#9db0c8]">
              {lesson.concepts.map((concept, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#35d5e8] font-bold">✓</span>
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Urdu Explanation */}
          {activeLanguage !== 'english' && (
            <div className="bg-[#14243a]/70 border border-[#263b55] rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#35d5e8] mb-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Urdu / Roman Urdu Explanation (اردو وضاحت)</span>
              </div>
              <div className="text-xs sm:text-[13px] text-[#edf5ff] leading-relaxed whitespace-pre-line font-normal">
                {lesson.urduExplanation}
              </div>
            </div>
          )}

          {/* English Overview */}
          <div className="bg-[#091626] border border-[#263b55] rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#46d39a] mb-2">
              <Terminal className="w-4 h-4 text-[#46d39a]" />
              <span>Technical & Industry Overview</span>
            </div>
            <div className="text-xs sm:text-[13px] text-[#cfe4f7] leading-relaxed whitespace-pre-line font-normal">
              {lesson.englishExplanation}
            </div>
          </div>

          {/* Real World Scenario */}
          <div className="bg-[#0b1c30] border border-[#28506a] rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1.5">
              <span>📌 Real-World Scenario: {lesson.realWorldExample.scenario}</span>
            </div>
            <p className="text-[11px] text-[#9db0c8] mb-2">{lesson.realWorldExample.scenarioUrdu}</p>
            <pre className="bg-[#050e18] p-3 rounded-lg font-mono text-[11px] text-[#35d5e8] overflow-x-auto border border-[#263b55]">
              {lesson.realWorldExample.dataSnippet}
            </pre>
            <div className="mt-2 text-xs text-[#edf5ff] bg-[#101d30] p-2 rounded border border-[#263b55]/60">
              <span className="font-semibold text-[#46d39a]">Key takeaway: </span>
              {lesson.realWorldExample.lessonTakeaway}
            </div>
          </div>

          {/* Practice Task Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#102c43] to-[#14243a] border border-[#35d5e8]/40">
            <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#35d5e8]" />
              <span>Hands-On Practice Task</span>
            </div>
            <p className="text-xs text-[#edf5ff] font-medium">{lesson.task}</p>
            <p className="text-[11px] text-[#46d39a] mt-1">{lesson.taskUrdu}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#263b55] bg-[#091626] rounded-b-2xl flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleComplete(lesson.id)}
              className="w-4 h-4 rounded text-[#46d39a] accent-[#46d39a] cursor-pointer"
            />
            <span className="text-xs font-semibold text-white">
              {isCompleted ? 'Completed ✓' : 'Mark this lesson complete'}
            </span>
          </label>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] font-bold rounded-lg text-xs transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
