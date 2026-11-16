'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Award } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface FinalSurpriseProps {
  onReplay: () => void;
  onNext?: () => void;
}

export default function FinalSurprise({ onReplay, onNext }: FinalSurpriseProps) {
  useEffect(() => {
    // Grand Finale Confetti Burst
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#f472b6', '#fb7185', '#ec4899', '#fef08a', '#e9d5ff', '#38bdf8'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 z-10">
      <div className="w-full max-w-4xl text-center">
        {/* Animated Celebration Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-200 overflow-hidden mb-8"
        >
          {/* Top Washi Tape */}
          <div className="washi-tape" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
            <span>Forever Celebrated • November 16, 2026</span>
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
          </div>

          {/* Big Greeting Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 tracking-tight leading-tight mb-4">
            {SURPRISE_CONFIG.finalScreen.banner}
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 mb-8 max-w-xl mx-auto leading-relaxed">
            {SURPRISE_CONFIG.finalScreen.closingMessage}
          </p>

          {/* Romantic Photo Montage Collage (matching reference video frame 021) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-8 max-w-3xl mx-auto">
            {/* Photo 5: Anime hug */}
            <div className="polaroid-frame transform -rotate-2 hover:rotate-0 transition-transform bg-white">
              <div className="aspect-square rounded overflow-hidden bg-pink-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/media/photo_5.jpg"
                  alt="Us"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-pink-600 text-xs mt-1 text-center">Together 💫</p>
            </div>

            {/* Photo 6: Puppy filter */}
            <div className="polaroid-frame transform rotate-2 hover:rotate-0 transition-transform bg-white">
              <div className="aspect-square rounded overflow-hidden bg-pink-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/media/photo_6.jpg"
                  alt="Goofy Us"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-pink-600 text-xs mt-1 text-center">Goofy Us 🐶</p>
            </div>

            {/* Photo 7: Pink shawl selfie */}
            <div className="polaroid-frame transform -rotate-1 hover:rotate-0 transition-transform bg-white">
              <div className="aspect-square rounded overflow-hidden bg-pink-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/media/photo_7.jpg"
                  alt="Cozy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-pink-600 text-xs mt-1 text-center">Warm Days 🧣</p>
            </div>

            {/* Photo 9: Spidey masks */}
            <div className="polaroid-frame transform rotate-2 hover:rotate-0 transition-transform bg-white">
              <div className="aspect-square rounded overflow-hidden bg-pink-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/media/photo_9.jpg"
                  alt="Spidey Duo"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-pink-600 text-xs mt-1 text-center">Spidey Duo 🕷️🎀</p>
            </div>
          </div>

          {/* Achuu Signature */}
          <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-center">
            <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold">
              {SURPRISE_CONFIG.finalScreen.senderSignature}
            </p>
            <p className="text-xs text-gray-500 mt-1">Your Girlfriend • Always & Forever</p>
          </div>
        </motion.div>

        {/* Action Navigation: One Last Surprise & Replay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {onNext && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300/80 hover:shadow-2xl hover:shadow-pink-400 transition-all inline-flex items-center gap-2 group"
            >
              <span>ONE LAST THING, DEEPZZ... 💗</span>
              <Heart className="w-5 h-5 fill-current text-pink-200 group-hover:scale-125 transition-transform" />
            </motion.button>
          )}

          <button
            onClick={onReplay}
            className="px-8 py-4 rounded-full bg-white text-pink-600 font-bold text-sm sm:text-base border-2 border-pink-300 shadow-xl shadow-pink-200 hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 group"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
            <span>{SURPRISE_CONFIG.finalScreen.replayButtonText}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
