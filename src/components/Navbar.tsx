import React from 'react';
import { Award, Compass } from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  onOpenCertificate: () => void;
  activeLanguage: 'bilingual' | 'english' | 'urdu';
  onChangeLanguage: (lang: 'bilingual' | 'english' | 'urdu') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  onOpenCertificate,
  activeLanguage,
  onChangeLanguage,
}) => {
  const isFinished = completedCount === totalCount && totalCount > 0;

  return (
    <header className="sticky top-0 z-40 bg-[#081321]/95 backdrop-blur-md border-b border-[#263b55] px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a href="#hero" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#35d5e8] to-[#46d39a] flex items-center justify-center font-black text-slate-950 text-sm shadow-sm group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="font-extrabold tracking-tight text-base md:text-lg text-white">
            NISAR <span className="text-[#35d5e8]">ANALYTICS</span> ACADEMY
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#9db0c8]">
          <a
            href="#roadmap"
            className="hover:text-[#35d5e8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Roadmap
          </a>
          <a
            href="#csv-lab"
            className="hover:text-[#35d5e8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            CSV Lab
          </a>
          <a
            href="#mini-task"
            className="hover:text-[#35d5e8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Practice Quiz
          </a>
          <a
            href="#dashboard-preview"
            className="hover:text-[#35d5e8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Live Dashboard
          </a>
          <a
            href="#curriculum-breakdown"
            className="hover:text-[#35d5e8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Curriculum
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle Language Pill toggle */}
          <div className="hidden sm:flex items-center gap-1 p-0.5 bg-[#101d30] border border-[#263b55] rounded-lg text-[11px] font-medium">
            <button
              onClick={() => onChangeLanguage('bilingual')}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                activeLanguage === 'bilingual'
                  ? 'bg-[#203650] text-[#35d5e8] font-semibold'
                  : 'text-[#9db0c8] hover:text-white'
              }`}
            >
              Urdu + EN
            </button>
            <button
              onClick={() => onChangeLanguage('english')}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                activeLanguage === 'english'
                  ? 'bg-[#203650] text-[#35d5e8] font-semibold'
                  : 'text-[#9db0c8] hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {isFinished ? (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-[#46d39a] hover:bg-[#3ec48d] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Get Certificate</span>
            </button>
          ) : (
            <a
              href="#roadmap"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-[#35d5e8] hover:bg-[#25c4d6] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Continue ({completedCount}/{totalCount})</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
