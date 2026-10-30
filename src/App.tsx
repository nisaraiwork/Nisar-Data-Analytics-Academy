import React, { useState, useEffect } from 'react';
import { LESSONS_DATA } from './data/lessonsData';
import { Lesson } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { RoadmapList } from './components/RoadmapList';
import { CsvCheckerLab } from './components/CsvCheckerLab';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { LiveSalesDashboard } from './components/LiveSalesDashboard';
import { CurriculumBreakdown } from './components/CurriculumBreakdown';
import { LessonModal } from './components/LessonModal';
import { CertificateModal } from './components/CertificateModal';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'nisarAnalyticsProgressV1';

export default function App() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set<number>(parsed);
        }
      }
    } catch {
      // fallback
    }
    return new Set<number>();
  });

  const [activeLanguage, setActiveLanguage] = useState<'bilingual' | 'english' | 'urdu'>('bilingual');
  const [activeModalLesson, setActiveModalLesson] = useState<Lesson | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedIds)));
    } catch {
      // storage quota or disabled
    }
  }, [completedIds]);

  const handleToggleComplete = (id: number) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // If all 7 are now completed, celebrate and offer certificate
        if (next.size === LESSONS_DATA.length) {
          try {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.4 },
            });
          } catch {
            // no-op
          }
        }
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    setCompletedIds(new Set<number>());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  };

  const handleScrollToRoadmap = () => {
    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCsvLab = () => {
    document.getElementById('csv-lab')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07101d] text-[#edf5ff] flex flex-col font-sans selection:bg-[#35d5e8]/20 selection:text-[#35d5e8]">
      {/* Top Bar Contract (Wordmark — 4-5 Links — 1 Action) */}
      <Navbar
        completedCount={completedIds.size}
        totalCount={LESSONS_DATA.length}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Hero Section */}
        <HeroSection
          onScrollToRoadmap={handleScrollToRoadmap}
          onScrollToCsvLab={handleScrollToCsvLab}
          activeLanguage={activeLanguage}
        />

        {/* Reactive Learning Stats */}
        <StatsBar
          completedCount={completedIds.size}
          totalCount={LESSONS_DATA.length}
        />

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Learning Roadmap (7 Stages) */}
          <div className="lg:col-span-7 space-y-6">
            <RoadmapList
              lessons={LESSONS_DATA}
              completedIds={completedIds}
              onToggleComplete={handleToggleComplete}
              onOpenModal={(lesson) => setActiveModalLesson(lesson)}
              activeLanguage={activeLanguage}
            />
          </div>

          {/* Right Column: Practice Lab & Interactive Mini-tasks & Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. CSV Checker Practice Lab */}
            <CsvCheckerLab />

            {/* 2. Today's Mini Task & Technical Quiz */}
            <InteractiveQuiz />

            {/* 3. Live Sales Dashboard Preview */}
            <LiveSalesDashboard />
          </div>
        </div>

        {/* 7-Stage Curriculum Directory Overview */}
        <CurriculumBreakdown
          lessons={LESSONS_DATA}
          onOpenLesson={(lesson) => setActiveModalLesson(lesson)}
        />
      </main>

      {/* Footer */}
      <Footer
        onResetProgress={handleResetProgress}
        completedCount={completedIds.size}
      />

      {/* Deep-Dive Lesson Modal */}
      <LessonModal
        lesson={activeModalLesson}
        onClose={() => setActiveModalLesson(null)}
        isCompleted={activeModalLesson ? completedIds.has(activeModalLesson.id) : false}
        onToggleComplete={handleToggleComplete}
        activeLanguage={activeLanguage}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        completedCount={completedIds.size}
        totalCount={LESSONS_DATA.length}
      />
    </div>
  );
}
