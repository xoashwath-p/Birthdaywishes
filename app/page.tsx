'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import MusicPlayer from '@/components/MusicPlayer';
import PasswordScreen from '@/components/PasswordScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import BirthdayCake from '@/components/BirthdayCake';
import InteractiveGifts from '@/components/InteractiveGifts';
import PhotoGallery from '@/components/PhotoGallery';
import BirthdayLetter from '@/components/BirthdayLetter';
import SpecialPhotoReveal from '@/components/SpecialPhotoReveal';
import FinalSurprise from '@/components/FinalSurprise';
import RomanticQuestion from '@/components/RomanticQuestion';

type Stage =
  | 'welcome'
  | 'cake'
  | 'gifts'
  | 'gallery'
  | 'letter'
  | 'special'
  | 'final'
  | 'question';

export default function BirthdayPage() {
  // Always unauthenticated on entry so it ALWAYS asks for the password first
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<Stage>('welcome');
  const [musicStarted, setMusicStarted] = useState<boolean>(false);

  const handleUnlockSuccess = () => {
    setIsAuthenticated(true);
    setMusicStarted(true);
    setCurrentStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStage = (next: Stage) => {
    setCurrentStage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    goToStage('welcome');
  };

  const handleFullReplay = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    // Replay returns to password screen, while persistent music continues seamlessly
    setIsAuthenticated(false);
    setCurrentStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-gradient-to-tr from-pink-50 via-rose-50/40 to-pink-100">
      <BackgroundEffects />
      {/* Single persistent audio player mounted across entire app lifecycle */}
      <MusicPlayer autoPlayTrigger={musicStarted} />

      {/* Dynamic Stage Transitions */}
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="stage-password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PasswordScreen onUnlockSuccess={handleUnlockSuccess} />
          </motion.div>
        ) : currentStage === 'welcome' ? (
          <motion.div
            key="stage-welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onOpenSurprise={() => goToStage('cake')} />
          </motion.div>
        ) : currentStage === 'cake' ? (
          <motion.div
            key="stage-cake"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <BirthdayCake onContinue={() => goToStage('gifts')} />
          </motion.div>
        ) : currentStage === 'gifts' ? (
          <motion.div
            key="stage-gifts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveGifts onContinue={() => goToStage('gallery')} />
          </motion.div>
        ) : currentStage === 'gallery' ? (
          <motion.div
            key="stage-gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoGallery onContinue={() => goToStage('letter')} />
          </motion.div>
        ) : currentStage === 'letter' ? (
          <motion.div
            key="stage-letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BirthdayLetter onContinue={() => goToStage('special')} />
          </motion.div>
        ) : currentStage === 'special' ? (
          <motion.div
            key="stage-special"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <SpecialPhotoReveal onContinue={() => goToStage('final')} />
          </motion.div>
        ) : currentStage === 'final' ? (
          <motion.div
            key="stage-final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <FinalSurprise
              onNext={() => goToStage('question')}
              onReplay={handleReplay}
            />
          </motion.div>
        ) : currentStage === 'question' ? (
          <motion.div
            key="stage-question"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <RomanticQuestion onReplayStory={handleFullReplay} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
