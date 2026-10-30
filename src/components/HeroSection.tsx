import React from 'react';
import { ArrowRight, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onScrollToRoadmap: () => void;
  onScrollToCsvLab: () => void;
  activeLanguage: 'bilingual' | 'english' | 'urdu';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRoadmap,
  onScrollToCsvLab,
  activeLanguage,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-2">
      <div className="relative overflow-hidden rounded-2xl border border-[#28506a] bg-gradient-to-br from-[#102c43] via-[#13243b] to-[#0d1829] p-6 sm:p-9 shadow-lg">
        {/* Subtle decorative mesh background */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#35d5e8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-[#46d39a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#46d39a] mb-3">
            <Sparkles className="w-4 h-4 text-[#46d39a]" />
            <span>Beginner → Practical Analyst</span>
            <span className="text-[#9db0c8]/60" aria-hidden="true">·</span>
            <span className="text-[#9db0c8] normal-case font-medium">Bilingual Urdu + English Path</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 text-balance">
            Turn raw data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35d5e8] to-[#46d39a]">clear decisions.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[#c2d3e5] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
            {activeLanguage === 'english' ? (
              <>
                A hands-on, job-oriented curriculum covering spreadsheets, data cleaning, SQL, Python, and Power BI dashboards. Short lessons, real-world retail cases, and an in-browser CSV inspector.
              </>
            ) : (
              <>
                Urdu + English learning path. Short lessons, hands-on exercises, aur built-in CSV checker. Har stage par practical practice karein aur raw numbers se business insights nikaalna seekhein.
              </>
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onScrollToRoadmap}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] font-bold text-sm shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>Start learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToCsvLab}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#203650]/80 hover:bg-[#203650] text-[#edf5ff] border border-[#35516f] font-semibold text-sm transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#35d5e8]" />
              <span>Practice Lab: CSV Checker</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-6 pt-5 border-t border-[#263b55]/60 text-xs text-[#9db0c8]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>100% In-Browser Privacy</span>
            </div>
            <span aria-hidden="true" className="text-[#263b55]">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>No account or payment required</span>
            </div>
            <span aria-hidden="true" className="text-[#263b55]">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>Progress saved automatically</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
