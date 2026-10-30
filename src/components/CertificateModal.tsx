import React, { useState, useRef } from 'react';
import { Award, CheckCircle2, Download, Printer, X, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  completedCount,
  totalCount,
}) => {
  const [studentName, setStudentName] = useState('Data Analytics Student');
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isEligible = completedCount === totalCount;
  const issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // no-op
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#101d30] border border-[#263b55] rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl relative my-auto">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-[#263b55] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Academy Certificate of Completion</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9db0c8] hover:text-white hover:bg-[#14243a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {!isEligible && (
            <div className="p-3 bg-amber-950/30 border border-amber-800 rounded-xl text-xs text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                You have completed <strong>{completedCount} of {totalCount}</strong> stages. Complete all 7 stages to unlock the verified credential badge!
              </span>
            </div>
          )}

          {/* Student name customization input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-[#091626] border border-[#263b55] rounded-xl p-3">
            <label className="text-xs font-semibold text-[#9db0c8] whitespace-nowrap">
              Recipient Name on Certificate:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name..."
              className="flex-1 bg-[#101d30] border border-[#35516f] focus:border-[#35d5e8] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Visual Certificate Paper */}
          <div
            ref={certificateRef}
            className="relative bg-gradient-to-br from-[#0b1b2d] via-[#0d2238] to-[#071321] border-4 border-[#35d5e8]/40 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl overflow-hidden print:m-0 print:border-2"
          >
            {/* Guilloche border accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#35d5e8]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#35d5e8]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#35d5e8]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#35d5e8]" />

            <div className="text-[11px] font-mono tracking-widest uppercase text-[#35d5e8] font-bold mb-1">
              NISAR DATA ANALYTICS ACADEMY
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#edf5ff] to-[#9db0c8] mb-1">
              CERTIFICATE OF COMPLETION
            </h2>

            <p className="text-[11px] text-[#9db0c8] italic mb-4">
              This acknowledges that the student has successfully mastered foundational data analytics
            </p>

            <div className="my-4 py-2 border-b border-[#263b55] inline-block min-w-[240px]">
              <span className="text-xl sm:text-2xl font-bold text-[#46d39a] font-serif">
                {studentName || 'Learner'}
              </span>
            </div>

            <p className="text-xs text-[#cfe4f7] max-w-md mx-auto leading-relaxed mb-5">
              Demonstrating practical competency in <strong>Spreadsheets (SUM/AVERAGE/Filters)</strong>,{' '}
              <strong>Data Cleaning & De-duplication</strong>, <strong>SQL Querying</strong>,{' '}
              <strong>Python/Pandas</strong>, and <strong>Power BI Business Dashboards</strong>.
            </p>

            {/* Badges strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono mb-5 text-[#9db0c8]">
              <span className="px-2 py-0.5 rounded bg-[#101d30] border border-[#263b55]">
                ✓ Excel & Sheets
              </span>
              <span className="px-2 py-0.5 rounded bg-[#101d30] border border-[#263b55]">
                ✓ Data Quality
              </span>
              <span className="px-2 py-0.5 rounded bg-[#101d30] border border-[#263b55]">
                ✓ SQL Database
              </span>
              <span className="px-2 py-0.5 rounded bg-[#101d30] border border-[#263b55]">
                ✓ Python Pandas
              </span>
              <span className="px-2 py-0.5 rounded bg-[#101d30] border border-[#263b55]">
                ✓ Power BI
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9db0c8] pt-4 border-t border-[#263b55] font-mono">
              <div className="text-left">
                <span className="block text-white font-bold">Nisar Analytics Director</span>
                <span>Verification ID: NDA-2026-{(Math.abs(studentName.length * 37) + 1042).toString()}</span>
              </div>

              <div className="flex items-center gap-1.5 text-[#46d39a]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-sans font-semibold">Verified Curriculum</span>
              </div>

              <div className="text-right">
                <span className="block text-white font-bold">{issueDate}</span>
                <span>Self-Paced Practical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 border-t border-[#263b55] bg-[#091626] rounded-b-2xl flex items-center justify-between">
          <button
            onClick={handleCelebrate}
            className="inline-flex items-center gap-1 text-xs text-[#35d5e8] hover:text-[#20c8dc] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate 🎊</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#203650] hover:bg-[#284464] text-white text-xs font-semibold rounded-lg border border-[#35516f] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
