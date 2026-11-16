'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface SpecialPhotoRevealProps {
  onContinue: () => void;
}

export default function SpecialPhotoReveal({ onContinue }: SpecialPhotoRevealProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 z-10 overflow-hidden">
      {/* Background Soft Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-tr from-pink-300/40 via-rose-200/50 to-amber-200/30 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="w-full max-w-xl text-center relative z-10">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-pink-100 border border-amber-200 text-amber-800 text-xs font-bold shadow-sm mb-6"
        >
          <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>{SURPRISE_CONFIG.specialReveal.heading}</span>
        </motion.div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-2">
          {SURPRISE_CONFIG.specialReveal.subheading}
        </h2>
        <p className="font-handwriting text-pink-600 text-xl sm:text-2xl mb-8">
          {SURPRISE_CONFIG.specialReveal.quote}
        </p>

        {/* Highlighted Photograph Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-sm sm:max-w-md"
        >
          {/* Animated Glowing Ring Border */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 opacity-60 blur-lg animate-pulse" />

          {/* Polaroid Frame */}
          <div className="relative polaroid-frame bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-pink-100">
            <div className="washi-tape" />

            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-pink-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SURPRISE_CONFIG.specialReveal.photoUrl}
                alt="Special Highlight"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Sparkle badge on corner */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-pink-700 text-xs font-bold flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                <span>Deepzz • 19</span>
              </div>
            </div>

            <p className="font-handwriting text-pink-700 text-base sm:text-lg mt-3 text-center font-bold">
              {SURPRISE_CONFIG.specialReveal.caption}
            </p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={onContinue}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 group"
          >
            <span>FINAL BIRTHDAY SURPRISE 💖</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
