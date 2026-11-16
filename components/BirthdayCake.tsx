'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, ArrowRight } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface BirthdayCakeProps {
  onContinue: () => void;
}

type CakePhase = 'candles_lit' | 'candles_blown' | 'cake_cut';

export default function BirthdayCake({ onContinue }: BirthdayCakeProps) {
  const [phase, setPhase] = useState<CakePhase>('candles_lit');
  const [isBlowing, setIsBlowing] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  // 1. Blow out all candle flames
  const handleBlowCandles = () => {
    if (phase !== 'candles_lit' || isBlowing) return;
    setIsBlowing(true);

    setTimeout(() => {
      setPhase('candles_blown');
      setIsBlowing(false);

      // Light initial burst of sparkles when flames go off
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.5 },
        colors: ['#fef08a', '#fda4af', '#e9d5ff'],
      });
    }, 700);
  };

  // 2. Cut the cake with the knife and take out the slice!
  const handleCutCake = () => {
    if (phase !== 'candles_blown' || isCutting) return;
    setIsCutting(true);

    setTimeout(() => {
      setPhase('cake_cut');
      setIsCutting(false);

      // Grand celebratory confetti explosion!
      const end = Date.now() + 3 * 1000;
      const colors = ['#f472b6', '#ec4899', '#f43f5e', '#fef08a', '#e9d5ff', '#38bdf8'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 1100);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl text-center"
      >
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-pink-100 overflow-hidden">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Sweet 19 Celebration</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight">
              {phase === 'candles_lit'
                ? 'Blow Out The Candles, Deepzz! 🎂'
                : phase === 'candles_blown'
                ? 'Now Cut Your Birthday Cake! 🔪🍰'
                : 'A Sweet Slice Just For You! 🍰🎉'}
            </h2>
            <p className="text-xs sm:text-sm text-pink-600 font-medium">
              {phase === 'candles_lit'
                ? 'Make a special wish and blow out all the candle flames ✨'
                : phase === 'candles_blown'
                ? 'Flames are blown! Take the knife and cut the cake to take out your slice! 🌸'
                : 'The first slice is served for Deepzz! May all your dreams come true! ❤️'}
            </p>
          </div>

          {/* THE BIRTHDAY CAKE CONTAINER */}
          <div className="relative my-8 sm:my-10 flex flex-col items-center justify-center select-none">
            <div className="relative w-64 sm:w-80 flex flex-col items-center">
              
              {/* ANIMATED KNIFE (Visible during candles_blown or while cutting) */}
              <AnimatePresence>
                {phase === 'candles_blown' && (
                  <motion.div
                    initial={{ opacity: 0, y: -40, rotate: -25 }}
                    animate={
                      isCutting
                        ? { y: [0, 115], rotate: [-25, 0], opacity: [1, 0.9, 1] }
                        : { y: [0, -10, 0], rotate: [-25, -20, -25], opacity: 1 }
                    }
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={
                      isCutting
                        ? { duration: 1.0, ease: 'easeInOut' }
                        : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                    }
                    onClick={handleCutCake}
                    className="absolute -top-16 right-10 z-30 cursor-pointer group"
                    title="Click to cut the cake!"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="w-4 h-14 bg-gradient-to-b from-rose-800 to-rose-600 rounded-t-md shadow-md border border-rose-900" />
                      <div className="w-6 h-2 bg-amber-400 rounded-sm shadow-sm" />
                      <div className="w-3.5 h-20 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-b-xl border-l-2 border-white shadow-lg relative">
                        <div className="absolute inset-0 bg-white/40 blur-[1px]" />
                      </div>
                      <div className="mt-1 px-2.5 py-0.5 bg-pink-500 text-white text-[10px] rounded-full font-bold shadow whitespace-nowrap animate-bounce">
                        Tap Knife to Cut! 🔪
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LIFTED CAKE SLICE (TAKEN OUT OF THE CAKE!) */}
              <AnimatePresence>
                {phase === 'cake_cut' && (
                  <motion.div
                    initial={{ x: 0, y: 0, scale: 0.9, opacity: 0 }}
                    animate={{
                      x: [0, 40, 85],
                      y: [0, -50, -25],
                      scale: [0.9, 1.1, 1.05],
                      rotate: [0, -6, 5],
                      opacity: 1,
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                    className="absolute z-40 -top-8 right-0 sm:-right-4 flex flex-col items-center pointer-events-auto"
                  >
                    {/* Delicious Strawberry on Top */}
                    <div className="text-2xl -mb-2 z-10 animate-bounce">🍓</div>

                    {/* The Layered Slice */}
                    <div className="relative w-16 sm:w-20 h-24 sm:h-28 bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 rounded-t-xl shadow-2xl border-2 border-white flex flex-col justify-between p-1.5 overflow-hidden">
                      {/* Whipped Frosting Top */}
                      <div className="w-full h-3 bg-white rounded-b-md shadow-sm" />
                      {/* Sponge Layer 1 */}
                      <div className="w-full h-3.5 bg-amber-100 rounded-sm shadow-inner" />
                      {/* Sweet Berry Cream Filling */}
                      <div className="w-full h-2.5 bg-rose-400 rounded-sm" />
                      {/* Sponge Layer 2 */}
                      <div className="w-full h-3.5 bg-amber-100 rounded-sm shadow-inner" />
                      {/* Crust Layer */}
                      <div className="w-full h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-b-sm" />
                    </div>

                    {/* Cute Golden Dessert Plate */}
                    <div className="w-24 sm:w-28 h-3.5 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 rounded-full shadow-lg border-t border-white mt-1" />

                    {/* Sweet Tag */}
                    <div className="mt-2 px-2.5 py-1 bg-white/95 rounded-full text-[11px] font-handwriting text-pink-700 font-bold shadow-md border border-pink-200 whitespace-nowrap">
                      First Slice For Deepzz! 🍰❤️
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candles on top tier */}
              <div className="flex justify-center items-end gap-3 sm:gap-4 mb-0 z-20">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    {/* Candle Flame or Smoke Puff */}
                    {phase === 'candles_lit' ? (
                      <div className="relative">
                        <div className="flame" />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-300/30 blur-md pointer-events-none" />
                      </div>
                    ) : (
                      <div className="absolute -top-7 text-xs text-gray-400 smoke-puff pointer-events-none">
                        💨
                      </div>
                    )}
                    {/* Candle Wick */}
                    <div className="w-0.5 h-2 bg-gray-700 mt-1" />
                    {/* Candle Body */}
                    <div
                      className={`w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-sm shadow-sm border border-white/40 ${
                        i % 2 === 0
                          ? 'bg-gradient-to-b from-pink-300 via-rose-200 to-pink-300'
                          : 'bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-200'
                      }`}
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.7) 3px, rgba(255,255,255,0.7) 6px)',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Top Tier Cake */}
              <div className="relative w-44 sm:w-56 h-16 sm:h-20 bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 rounded-t-3xl shadow-inner border-t-4 border-white flex flex-col items-center justify-center z-10 overflow-hidden">
                {/* Decorative Sugar Pearls */}
                <div className="absolute -top-2 flex gap-2">
                  {[...Array(7)].map((_, idx) => (
                    <span key={idx} className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                  ))}
                </div>
                {/* Dripping Glaze Effect */}
                <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-b-xl" />

                {/* THE CUT CAVITY (Visible when slice has been removed) */}
                {phase === 'cake_cut' && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    className="absolute right-8 sm:right-12 inset-y-0 w-10 sm:w-12 bg-gradient-to-r from-amber-900/40 via-rose-950/50 to-amber-900/40 border-x border-rose-300 shadow-inner z-20 flex flex-col justify-between py-1"
                  >
                    <div className="w-full h-1.5 bg-amber-100/70" />
                    <div className="w-full h-1 bg-rose-400/80" />
                    <div className="w-full h-1.5 bg-amber-100/70" />
                  </motion.div>
                )}

                <span className="font-handwriting text-pink-700 text-lg sm:text-xl font-bold tracking-wider z-10">
                  DEEPZZ ❤️ 19
                </span>
              </div>

              {/* Bottom Tier Cake */}
              <div className="relative w-56 sm:w-72 h-20 sm:h-24 bg-gradient-to-b from-pink-200 via-rose-200 to-rose-300 rounded-t-3xl shadow-lg border-t-4 border-white flex flex-col items-center justify-center overflow-hidden">
                {/* Rosette flowers decoration */}
                <div className="absolute -top-3 flex justify-between w-full px-3">
                  {[...Array(9)].map((_, idx) => (
                    <span key={idx} className="text-xs">
                      🌸
                    </span>
                  ))}
                </div>

                {/* THE CUT CAVITY ON BOTTOM TIER */}
                {phase === 'cake_cut' && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute right-10 sm:right-16 inset-y-0 w-12 sm:w-14 bg-gradient-to-r from-amber-900/40 via-rose-950/50 to-amber-900/40 border-x border-rose-300 shadow-inner z-20 flex flex-col justify-between py-2"
                  >
                    <div className="w-full h-2 bg-amber-100/70" />
                    <div className="w-full h-1.5 bg-rose-400/80" />
                    <div className="w-full h-2 bg-amber-100/70" />
                    <div className="w-full h-1.5 bg-rose-400/80" />
                  </motion.div>
                )}

                {/* Banner Ribbon */}
                <div className="px-4 py-1 rounded-full bg-white/90 shadow-md border border-pink-200 z-10">
                  <p className="font-serif text-[11px] sm:text-xs font-bold text-pink-700 uppercase tracking-widest">
                    Something Special For You
                  </p>
                </div>
              </div>

              {/* Cake Plate & Stand */}
              <div className="w-64 sm:w-80 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full shadow-xl border-t border-white" />
              <div className="w-32 sm:w-40 h-3 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-b-xl shadow-md" />
            </div>
          </div>

          {/* Action Area: Step 1 -> Step 2 -> Step 3 */}
          <div className="min-h-[90px] flex items-center justify-center">
            {phase === 'candles_lit' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 w-full"
              >
                <button
                  onClick={handleBlowCandles}
                  disabled={isBlowing}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300/60 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto group"
                >
                  <Flame className="w-5 h-5 text-amber-200 group-hover:scale-125 transition-transform" />
                  <span>
                    {isBlowing ? 'Blowing out the candles...' : 'BLOW OUT THE CANDLES 💨'}
                  </span>
                </button>
                <p className="text-[11px] text-pink-400">
                  Step 1: Make a heartfelt wish and tap to blow out all the flames!
                </p>
              </motion.div>
            )}

            {phase === 'candles_blown' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3 w-full"
              >
                <button
                  onClick={handleCutCake}
                  disabled={isCutting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto group animate-pulse"
                >
                  <span className="text-lg">🔪</span>
                  <span>
                    {isCutting ? 'Slicing & serving the cake...' : 'CUT THE CAKE WITH KNIFE 🎂'}
                  </span>
                </button>
                <p className="text-[11px] text-pink-500 font-medium">
                  Step 2: All candle flames are off! Tap to cut and take out the slice! ✨
                </p>
              </motion.div>
            )}

            {phase === 'cake_cut' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-5 w-full"
              >
                <div className="p-4 bg-pink-50 rounded-2xl border border-pink-200 text-pink-800">
                  <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 mb-1">
                    ✨ First Slice Served! ✨
                  </p>
                  <p className="text-sm font-medium leading-relaxed">
                    {SURPRISE_CONFIG.cake.blownGreeting}
                  </p>
                </div>

                <button
                  onClick={onContinue}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto group"
                >
                  <span>{SURPRISE_CONFIG.cake.continueButtonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
