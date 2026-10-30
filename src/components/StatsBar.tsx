import React from 'react';
import { BookOpen, CheckCircle, Flame, Layers } from 'lucide-react';

interface StatsBarProps {
  completedCount: number;
  totalCount: number;
  activeStreakDays?: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  completedCount,
  totalCount,
  activeStreakDays = 3,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="my-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Stat 1: Completed count */}
        <div className="bg-[#101d30] border border-[#263b55] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9db0c8] mb-1">
            <span className="text-xs font-medium">Completed</span>
            <CheckCircle className="w-4 h-4 text-[#35d5e8]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#35d5e8] font-mono tabular-nums">
              {completedCount}/{totalCount}
            </span>
            <p className="text-xs text-[#9db0c8] mt-0.5">Lessons completed</p>
          </div>
        </div>

        {/* Stat 2: Progress percentage */}
        <div className="bg-[#101d30] border border-[#263b55] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9db0c8] mb-1">
            <span className="text-xs font-medium">Progress</span>
            <Flame className="w-4 h-4 text-[#46d39a]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#46d39a] font-mono tabular-nums">
              {percentage}%
            </span>
            <p className="text-xs text-[#9db0c8] mt-0.5">Learning progress</p>
          </div>
        </div>

        {/* Stat 3: Stages */}
        <div className="bg-[#101d30] border border-[#263b55] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9db0c8] mb-1">
            <span className="text-xs font-medium">Curriculum</span>
            <Layers className="w-4 h-4 text-[#9db0c8]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              {totalCount}
            </span>
            <p className="text-xs text-[#9db0c8] mt-0.5">Core learning stages</p>
          </div>
        </div>

        {/* Stat 4: Estimated Hours */}
        <div className="bg-[#101d30] border border-[#263b55] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9db0c8] mb-1">
            <span className="text-xs font-medium">Duration</span>
            <BookOpen className="w-4 h-4 text-[#9db0c8]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              3.5h
            </span>
            <p className="text-xs text-[#9db0c8] mt-0.5">Self-paced practice</p>
          </div>
        </div>
      </div>

      {/* Visual progress bar */}
      <div className="mt-3 bg-[#101d30] border border-[#263b55] rounded-lg p-2.5">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#9db0c8] font-medium">Path to Certificate of Completion</span>
          <span className="font-mono text-[#35d5e8] font-semibold">{percentage}% complete</span>
        </div>
        <div className="h-2.5 bg-[#091626] rounded-full overflow-hidden p-0.5 border border-[#263b55]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#35d5e8] via-[#46d39a] to-[#38ef7d] transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
};
