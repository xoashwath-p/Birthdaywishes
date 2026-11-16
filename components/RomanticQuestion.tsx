'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, ArrowLeft } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface RomanticQuestionProps {
  onReplayStory: () => void;
}

type AnswerState = 'question' | 'yes' | 'no';

export default function RomanticQuestion({ onReplayStory }: RomanticQuestionProps) {
  const [answerState, setAnswerState] = useState<AnswerState>('question');

  const handleYes = () => {
    setAnswerState('yes');

    // Grand celebratory heart explosion & confetti burst
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // Confetti burst from left & right
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: ['#f472b6', '#fb7185', '#ec4899', '#fda4af', '#fef08a', '#e9d5ff'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: ['#f472b6', '#fb7185', '#ec4899', '#fda4af', '#fef08a', '#e9d5ff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleNo = () => {
    setAnswerState('no');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 z-10 overflow-hidden">
      {/* Background Soft Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-pink-300/35 via-rose-200/40 to-pink-100/30 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Floating subtle rose petals in this slide */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/60 select-none text-lg sm:text-2xl"
            style={{
              left: `${(i * 13 + 7) % 95}%`,
              top: '-30px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(i) * 40, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 9 + (i % 5),
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-xl sm:max-w-2xl text-center relative z-10">
        <AnimatePresence mode="wait">
          {answerState === 'question' && (
            /* QUESTION SCREEN */
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-100 overflow-hidden"
            >
              {/* Top Washi Tape */}
              <div className="washi-tape" />

              {/* Romantic Interlaced Hearts Illustration */}
              <div className="relative my-4 flex justify-center items-center">
                <div className="relative">
                  {/* Subtle pulsing glow */}
                  <div className="absolute inset-0 rounded-full bg-pink-300/40 blur-xl scale-125 animate-pulse" />
                  
                  {/* Two interlaced hearts */}
                  <div className="relative flex items-center justify-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [-12, -8, -12] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-300"
                    >
                      <Heart className="w-6 h-6 fill-current" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.18, 1], rotate: [12, 16, 12] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.3 }}
                      className="w-14 h-14 -ml-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-xl shadow-rose-300"
                    >
                      <Heart className="w-7 h-7 fill-current" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mt-4 mb-3">
                <span className="inline-block px-3.5 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-semibold mb-2 border border-pink-200">
                  <Sparkles className="w-3 h-3 inline mr-1 text-pink-400" />
                  From Achuu's Heart
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
                  One Last Thing, Deepzz... 💗
                </h2>
              </div>

              {/* Glowing Question Card */}
              <div className="relative my-6 p-6 rounded-2xl bg-gradient-to-tr from-pink-50/80 via-rose-50/50 to-pink-50/80 border border-pink-200/80 shadow-inner">
                <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 leading-snug font-bold">
                  “Can I keep choosing you, loving you, and making memories with you forever?”
                </p>
              </div>

              {/* Interactive Answer Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
                {/* YES BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300/70 hover:shadow-2xl hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 group"
                >
                  <Heart className="w-5 h-5 fill-current text-pink-200 group-hover:scale-125 transition-transform" />
                  <span>YES, FOREVER! ❤️</span>
                </motion.button>

                {/* NO BUTTON (Functional and unforced) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNo}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white text-gray-500 hover:text-gray-700 font-medium text-sm sm:text-base border border-pink-200 shadow-md hover:bg-pink-50/50 transition-all"
                >
                  <span>NO 🙈</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {answerState === 'yes' && (
            /* SPECIAL FINAL MESSAGE WHEN YES IS CLICKED */
            <motion.div
              key="yes-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-200 overflow-hidden text-center"
            >
              {/* Top Washi Tape */}
              <div className="washi-tape" />

              {/* Romantic Circular Couple Photograph (Holding Hands) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-500 shadow-xl shadow-pink-300/70 mx-auto mb-6 flex items-center justify-center ring-4 ring-pink-100"
              >
                {/* Perfect circular cropped black & white photograph focused on intertwined hands */}
                <div className="w-full h-full rounded-full overflow-hidden bg-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/api/media/holding_hands.jpg"
                    alt="Our Forever Promise"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: '65% 65%' }}
                  />
                </div>
              </motion.div>

              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Our Forever Promise</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              </div>

              {/* The Exact Promised Message (4 Paragraphs) */}
              <div className="p-6 sm:p-8 bg-pink-50/70 rounded-2xl border border-pink-200/90 mb-8 space-y-4 text-center">
                <p className="font-handwriting text-xl sm:text-2xl text-pink-700 font-bold leading-relaxed">
                  ❤️🥹 I promise you that I'll always be loyal to you, no matter what. 🫶🏻💍
                </p>

                <p className="font-handwriting text-xl sm:text-2xl text-pink-700 font-bold leading-relaxed">
                  Unnoda career, dreams, goals edhukkum naan oru naalum disturbance-ah irukka maaten. 🥺❤️
                </p>

                <p className="font-handwriting text-xl sm:text-2xl text-pink-700 font-bold leading-relaxed">
                  Unnoda dreams-ah achieve panna naan eppovume unakku support-ah iruppen. 🌍✨
                </p>

                <p className="font-handwriting text-xl sm:text-2xl text-pink-700 font-bold leading-relaxed">
                  I don't want to be the reason you give up on your dreams; I want to be the reason you believe in yourself even more. 🫂❤️♾️
                </p>

                <div className="pt-4 border-t border-pink-200/60">
                  <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold">
                    With Endless Love, ACHUU ❤️
                  </p>
                </div>
              </div>

              {/* Replay Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplayStory}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl transition-all inline-flex items-center gap-2 group"
              >
                <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
                <span>REPLAY OUR STORY 💞</span>
              </motion.button>
            </motion.div>
          )}

          {answerState === 'no' && (
            /* GENTLE MESSAGE WHEN NO IS CLICKED */
            <motion.div
              key="no-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-100 overflow-hidden text-center"
            >
              <div className="washi-tape" />

              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 fill-pink-200" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Always & Forever
              </h3>

              <p className="font-handwriting text-xl sm:text-2xl text-pink-700 mb-8 leading-relaxed">
                “That's okay... I'll always cherish the beautiful memories we've made. 💗”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Option to return to the question */}
                <button
                  onClick={() => setAnswerState('question')}
                  className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-pink-600 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Let me think again! 💗</span>
                </button>

                {/* Replay option */}
                <button
                  onClick={onReplayStory}
                  className="px-6 py-3 rounded-full bg-white text-pink-600 font-semibold text-xs sm:text-sm border border-pink-300 hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>REPLAY OUR STORY 💞</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
