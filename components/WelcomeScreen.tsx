'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface WelcomeScreenProps {
  onOpenSurprise: () => void;
}

export default function WelcomeScreen({ onOpenSurprise }: WelcomeScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Launch celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#ec4899', '#fef08a', '#e9d5ff'],
    });

    setTimeout(() => {
      onOpenSurprise();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-lg text-center"
      >
        <div className="relative bg-white/85 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-100 overflow-hidden">
          {/* Decorative Corner Ribbons */}
          <div className="washi-tape-corner-left" />
          <div className="washi-tape-corner-right" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Chapter 19 Begins Today</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight leading-tight mb-3">
            {SURPRISE_CONFIG.welcome.heading}
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 mb-6">
            {SURPRISE_CONFIG.welcome.tagline}
          </p>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-8 font-light">
            {SURPRISE_CONFIG.welcome.openingMessage}
          </p>

          {/* Interactive Gift Box with 3D Pop & Glow */}
          <div className="relative my-6 flex justify-center">
            <motion.div
              animate={
                isOpening
                  ? { scale: [1, 1.25, 1.1], rotate: [0, -10, 10, -5, 5, 0] }
                  : { y: [0, -10, 0] }
              }
              transition={
                isOpening
                  ? { duration: 1.2 }
                  : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
              }
              className="relative cursor-pointer group"
              onClick={handleOpen}
            >
              {/* Soft Pulsing Glow Aura */}
              <div className="absolute inset-0 rounded-full bg-pink-300/40 blur-xl group-hover:bg-pink-400/50 transition-all scale-110" />

              {/* Gift Box Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-300 shadow-xl shadow-pink-200 border-2 border-white/60 flex items-center justify-center overflow-hidden">
                {/* Gift Ribbons */}
                <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200 shadow-sm" />
                <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-sm" />

                {/* Gift Bow */}
                <div className="absolute -top-3 w-12 h-8 flex justify-center">
                  <div className="w-5 h-5 rounded-full bg-amber-300 border border-amber-400 -mr-1 rotate-45 shadow-sm" />
                  <div className="w-5 h-5 rounded-full bg-amber-300 border border-amber-400 -ml-1 -rotate-45 shadow-sm" />
                </div>

                {/* Center Icon */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 shadow text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6 text-pink-600 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Button: OPEN YOUR SURPRISE */}
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300/60 hover:shadow-2xl hover:shadow-pink-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto group"
          >
            {isOpening ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Opening your magic world...</span>
              </span>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-current text-pink-200 group-hover:scale-125 transition-transform" />
                <span>{SURPRISE_CONFIG.welcome.buttonText}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
