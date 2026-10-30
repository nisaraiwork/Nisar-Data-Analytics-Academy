import React, { useState } from 'react';
import { Lesson } from '../types';
import { LessonCard } from './LessonCard';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

interface RoadmapListProps {
  lessons: Lesson[];
  completedIds: Set<number>;
  onToggleComplete: (id: number) => void;
  onOpenModal: (lesson: Lesson) => void;
  activeLanguage: 'bilingual' | 'english' | 'urdu';
}

export const RoadmapList: React.FC<RoadmapListProps> = ({
  lessons,
  completedIds,
  onToggleComplete,
  onOpenModal,
  activeLanguage,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredLessons = lessons.filter((l) => {
    if (filter === 'pending') return !completedIds.has(l.id);
    if (filter === 'completed') return completedIds.has(l.id);
    return true;
  });

  return (
    <section id="roadmap" className="bg-[#101d30] border border-[#263b55] rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#263b55] mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>📚 Your learning roadmap</span>
            </h2>
          </div>
          <p className="text-xs text-[#9db0c8] mt-0.5">
            Har stage ka lesson parhein, practice karein, phir complete mark karein.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-[#091626] p-1 rounded-xl border border-[#263b55]">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#203650] text-[#35d5e8] shadow-sm'
                : 'text-[#9db0c8] hover:text-white'
            }`}
          >
            All (7)
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-[#203650] text-[#35d5e8] shadow-sm'
                : 'text-[#9db0c8] hover:text-white'
            }`}
          >
            Pending ({7 - completedIds.size})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'completed'
                ? 'bg-[#203650] text-[#46d39a] shadow-sm'
                : 'text-[#9db0c8] hover:text-white'
            }`}
          >
            Done ({completedIds.size})
          </button>
        </div>
      </div>

      {/* Lesson List */}
      <div id="lessons" className="divide-y divide-[#263b55]">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={completedIds.has(lesson.id)}
            onToggleComplete={onToggleComplete}
            onOpenModal={onOpenModal}
            activeLanguage={activeLanguage}
          />
        ))}

        {filteredLessons.length === 0 && (
          <div className="py-8 text-center text-xs text-[#9db0c8]">
            No lessons match this filter.
          </div>
        )}
      </div>
    </section>
  );
};
