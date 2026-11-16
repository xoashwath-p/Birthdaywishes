'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, ArrowRight, Stamp } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface BirthdayLetterProps {
  onContinue: () => void;
}

export default function BirthdayLetter({ onContinue }: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Gentle heart confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#fda4af', '#e9d5ff'],
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 z-10">
      <div className="w-full max-w-2xl sm:max-w-3xl text-center">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-pink-500" />
            <span>Personal Handwritten Note</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            A Letter For You, Deepzz 💌
          </h2>
          <p className="text-sm sm:text-base text-pink-600 font-medium">
            Written straight from the heart, just for your 19th birthday.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto max-w-xl sm:max-w-2xl">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED ENVELOPE */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cursor-pointer group select-none max-w-lg mx-auto"
                onClick={handleOpenEnvelope}
              >
                <div className="relative bg-gradient-to-tr from-pink-200 via-rose-100 to-pink-200 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-white/80 overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                  {/* Postage Stamp on Envelope */}
                  <div className="absolute top-5 right-6 w-14 h-16 bg-white border-2 border-dashed border-pink-300 rounded p-1 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-lg">💖</span>
                    <span className="text-[9px] font-serif text-pink-600 font-bold uppercase">19 YRS</span>
                  </div>

                  {/* Airmail stripes decorative border */}
                  <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 opacity-70" />

                  {/* Envelope Front Flap Geometry */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-300 group-hover:rotate-12 transition-transform">
                    <Heart className="w-10 h-10 fill-current" />
                  </div>

                  <p className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {SURPRISE_CONFIG.letter.envelopeTitle}
                  </p>
                  <p className="text-xs text-pink-600 font-medium mb-6">
                    To: {SURPRISE_CONFIG.recipient.name} • From: {SURPRISE_CONFIG.sender.name}
                  </p>

                  <button
                    type="button"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-300 hover:shadow-xl transition-all inline-flex items-center gap-2 group-hover:scale-105"
                  >
                    <span>{SURPRISE_CONFIG.letter.envelopePrompt}</span>
                    <Sparkles className="w-4 h-4 text-pink-200 animate-spin" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* OPENED LETTER ON TEXTURED PARCHMENT PAPER */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="letter-paper rounded-3xl p-6 sm:p-10 text-left border border-pink-200 shadow-2xl relative"
              >
                {/* Vintage Washi Tape at Top */}
                <div className="washi-tape" />

                {/* Letter Header */}
                <div className="flex justify-between items-center border-b border-pink-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-serif text-pink-400 tracking-wider uppercase font-semibold">
                      Private Letter
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800">
                      {SURPRISE_CONFIG.letter.salutation}
                    </h3>
                  </div>
                  <span className="text-xs text-pink-500 font-medium bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    {SURPRISE_CONFIG.letter.date}
                  </span>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 font-serif text-gray-700 leading-relaxed text-sm sm:text-base">
                  {SURPRISE_CONFIG.letter.paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                      className={
                        idx === 0
                          ? 'font-handwriting text-xl sm:text-2xl text-pink-600 font-bold mb-4'
                          : 'font-light'
                      }
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Special Design for the Ending: Personal Handwritten Closing */}
                <div className="mt-8 pt-6 border-t border-pink-100/90 text-right space-y-2">
                  <p className="font-handwriting text-lg sm:text-xl text-pink-600 leading-relaxed">
                    Serii Thangoo pesuna pesite irupan , aprm letter patathu.. nama call la pesikalam 😅😘
                  </p>
                  <p className="font-handwriting text-xl sm:text-2xl text-pink-700 font-semibold leading-relaxed">
                    Epavum Unaku Uymai ah irukura Un Mamaa 💗💋🫶🏻
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-extrabold tracking-wide pt-1 leading-snug">
                    Loveeeee youuuu diii Thangaaaa Pullaaaaa! 😘💋💗♾️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={onContinue}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 group"
            >
              <span>SEE YOUR SPECIAL PHOTO REVEAL ✨</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
