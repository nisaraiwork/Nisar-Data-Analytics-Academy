import React from 'react';
import { Database, FileSpreadsheet, BarChart3, Code2, Sparkles, ShieldCheck, Briefcase } from 'lucide-react';
import { Lesson } from '../types';

interface CurriculumBreakdownProps {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
}

export const CurriculumBreakdown: React.FC<CurriculumBreakdownProps> = ({ lessons, onOpenLesson }) => {
  const getStageIcon = (category: Lesson['category']) => {
    switch (category) {
      case 'foundation':
        return <Sparkles className="w-4 h-4 text-[#35d5e8]" />;
      case 'spreadsheets':
        return <FileSpreadsheet className="w-4 h-4 text-[#46d39a]" />;
      case 'quality':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-[#35d5e8]" />;
      case 'python':
        return <Code2 className="w-4 h-4 text-[#46d39a]" />;
      case 'visualization':
        return <BarChart3 className="w-4 h-4 text-cyan-400" />;
      case 'project':
        return <Briefcase className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <section id="curriculum-breakdown" className="my-8">
      <div className="bg-[#101d30] border border-[#263b55] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#263b55] mb-5">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Structured 7-Stage Career Path
            </h2>
            <p className="text-xs text-[#9db0c8] mt-0.5">
              From absolute beginner concepts to corporate data analyst toolset.
            </p>
          </div>
          <span className="text-xs font-mono text-[#35d5e8] bg-[#091626] px-3 py-1.5 rounded-lg border border-[#263b55] self-start sm:self-auto">
            Total: 7 Modules · ~3.5 Hours
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {lessons.map((l) => (
            <div
              key={l.id}
              onClick={() => onOpenLesson(l)}
              className="bg-[#091626] border border-[#263b55] hover:border-[#35d5e8] rounded-xl p-4 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[#35d5e8] font-bold">{l.stageNumber}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#9db0c8]">
                    {getStageIcon(l.category)}
                    {l.timeEstimate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#35d5e8] transition-colors mb-1">
                  {l.title}
                </h3>
                <p className="text-[11px] text-[#46d39a] font-medium mb-2">{l.titleUrdu}</p>
                <p className="text-xs text-[#9db0c8] line-clamp-2 leading-relaxed">
                  {l.shortDesc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#263b55]/60 flex items-center justify-between text-[11px]">
                <span className="text-[#9db0c8] group-hover:text-white transition-colors">
                  Open study guide →
                </span>
                <span className="font-mono text-[#35d5e8] text-[10px] uppercase">
                  {l.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
