import React, { useState } from 'react';
import { RotateCcw, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onResetProgress: () => void;
  completedCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onResetProgress, completedCount }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <footer className="mt-16 border-t border-[#263b55] bg-[#081321] text-[#9db0c8] py-10 px-4 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <div className="font-extrabold text-white text-sm tracking-tight">
            NISAR <span className="text-[#35d5e8]">DATA ANALYTICS</span> ACADEMY
          </div>
          <p className="text-[11px] text-[#9db0c8]">
            Urdu + English practical analytics curriculum. Designed for self-paced students and career switchers.
          </p>
          <div className="text-[11px] text-[#9db0c8]/80 flex items-center justify-center md:justify-start gap-1">
            <span>© 2026 Nisar AI Studio</span>
            <span aria-hidden="true">·</span>
            <span>Progress saved in browser localStorage</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#46d39a]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Privacy
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {showConfirm ? (
            <div className="flex items-center gap-2 bg-[#14243a] p-2 rounded-xl border border-rose-800 animate-in fade-in">
              <span className="text-[11px] text-rose-300">Reset all progress ({completedCount} lessons)?</span>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowConfirm(false);
                }}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-xs cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-2 py-1 bg-[#203650] hover:bg-[#284464] text-white rounded text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101d30] hover:bg-[#14243a] text-[#9db0c8] hover:text-white border border-[#263b55] transition-colors cursor-pointer text-xs"
              title="Reset progress stored in localStorage"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          )}

          <a
            href="#hero"
            className="text-xs text-[#35d5e8] hover:underline whitespace-nowrap"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
