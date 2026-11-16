'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, X, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { SURPRISE_CONFIG, GiftItem } from '@/config/surprise';

interface InteractiveGiftsProps {
  onContinue: () => void;
}

export default function InteractiveGifts({ onContinue }: InteractiveGiftsProps) {
  const [openedGifts, setOpenedGifts] = useState<string[]>([]);
  const [activeModalGift, setActiveModalGift] = useState<GiftItem | null>(null);

  const handleOpenGift = (gift: GiftItem) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    setActiveModalGift(gift);

    // Mini confetti burst for this gift
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#fb7185', '#fef08a'],
    });
  };

  const allOpened = openedGifts.length === SURPRISE_CONFIG.gifts.length;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 z-10">
      <div className="w-full max-w-4xl text-center">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>Interactive Surprises</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Treasured Memories ✨
          </h2>
          <p className="text-sm sm:text-base text-pink-600 font-medium">
            Tap each gift box to unwrap your personalized surprises! ({openedGifts.length} of{' '}
            {SURPRISE_CONFIG.gifts.length} opened)
          </p>
        </div>

        {/* Gift Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {SURPRISE_CONFIG.gifts.map((gift, idx) => {
            const isOpened = openedGifts.includes(gift.id);

            return (
              <motion.div
                key={gift.id}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenGift(gift)}
                className="cursor-pointer group"
              >
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:border-pink-200">
                  {/* Status Indicator */}
                  {isOpened && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unwrapped</span>
                    </div>
                  )}

                  {/* 3D Gift Box Graphic - Borderless & Clean */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 flex items-center justify-center">
                    <div
                      className={`w-full h-full rounded-2xl bg-gradient-to-tr ${gift.color} shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-300 ${
                        isOpened ? 'scale-95 opacity-90' : 'group-hover:scale-105'
                      }`}
                    >
                      {/* Ribbons */}
                      <div className={`absolute inset-y-0 w-5 ${gift.ribbonColor} shadow-sm`} />
                      <div className={`absolute inset-x-0 h-5 ${gift.ribbonColor} shadow-sm`} />

                      {/* Icon */}
                      <div className="relative z-10 w-10 h-10 rounded-full bg-white/95 shadow text-pink-600 flex items-center justify-center">
                        <Gift className="w-5 h-5 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Clean subtitle without Surprise # labels */}
                  <p className="text-xs sm:text-sm text-pink-500 font-medium">
                    {isOpened ? 'Click to view again ✨' : 'Tap to unwrap 🎁'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={onContinue}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 group"
            >
              <span>EXPLORE YOUR PHOTO GALLERY ❤️</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Modal Reveal Popup */}
        <AnimatePresence>
          {activeModalGift && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setActiveModalGift(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-100 text-center relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalGift(null)}
                  className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-pink-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 fill-current" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  {activeModalGift.revealTitle}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                  {activeModalGift.revealMessage}
                </p>

                {/* Revealed Photograph */}
                {activeModalGift.photoUrl && (
                  <div className="relative mx-auto w-48 sm:w-56 mb-4">
                    <div className="polaroid-frame transform rotate-1">
                      <div className="w-full aspect-[4/5] rounded overflow-hidden bg-pink-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeModalGift.photoUrl}
                          alt="Special Memory"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-handwriting text-pink-600 text-xs mt-2 text-center">
                        Deepzz & Achuu ❤️
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setActiveModalGift(null)}
                  className="px-6 py-2.5 rounded-full bg-pink-500 text-white font-semibold text-xs shadow-md hover:bg-pink-600 transition-colors"
                >
                  Keep Surprises Going ✨
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
