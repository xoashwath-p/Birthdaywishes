'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface PasswordScreenProps {
  onUnlockSuccess: () => void;
}

export default function PasswordScreen({ onUnlockSuccess }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsUnlocked(true);
        setTimeout(() => {
          onUnlockSuccess();
        }, 1800); // Allow unlock animation to play
      } else {
        setErrorMsg(data.message || SURPRISE_CONFIG.login.errorMessage);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'CLEAR') {
      setPassword('');
      setErrorMsg('');
    } else if (val === 'BACK') {
      setPassword((prev) => prev.slice(0, -1));
      setErrorMsg('');
    } else {
      setPassword((prev) => prev + val);
      setErrorMsg('');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Main Card */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 text-center overflow-hidden">
          {/* Decorative background sparkles inside card */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />

          {/* Polaroid Teaser Frame at Top (inspired by reference video) */}
          <div className="relative mx-auto w-40 sm:w-48 mb-6">
            <div className="washi-tape" />
            <div className="polaroid-frame transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="w-full h-36 sm:h-44 bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-100 rounded flex flex-col items-center justify-center p-3 text-center border border-pink-100 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isUnlocked ? (
                    <motion.div
                      key="unlocked-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-300">
                        <Unlock className="w-8 h-8 animate-bounce" />
                      </div>
                      <span className="text-xs font-serif font-bold text-pink-700 mt-2">
                        Unlocked! ❤️
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="locked-icon"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/80 shadow-md text-pink-500 flex items-center justify-center mb-2">
                        <Lock className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-serif tracking-wider text-pink-800 font-semibold uppercase">
                        {SURPRISE_CONFIG.recipient.name}
                      </span>
                      <span className="text-[10px] text-pink-500 font-handwriting text-base">
                        Special Surprise ✨
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="font-handwriting text-pink-600 text-sm mt-2 text-center">
                For Deepzz ❤️
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1 mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-1.5">
              <span>{SURPRISE_CONFIG.login.heading}</span>
            </h1>
            <p className="text-xs sm:text-sm text-pink-600 font-medium">
              {SURPRISE_CONFIG.login.subtitle}
            </p>
          </div>

          {/* Unlocked Announcement */}
          <AnimatePresence>
            {isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-pink-50 rounded-2xl border border-pink-200 text-pink-700 text-sm font-semibold flex items-center justify-center gap-2 mb-4"
              >
                <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
                <span>{SURPRISE_CONFIG.login.successMessage}</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Form */}
          {!isUnlocked && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder={SURPRISE_CONFIG.login.placeholder}
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-pink-50/70 border border-pink-200 text-center text-gray-800 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all text-sm font-medium tracking-wide shadow-inner"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error Message with Shake Animation */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium leading-relaxed"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Numeric Keypad Helper (Matching Reference Video Pinpad) */}
              <div className="pt-2">
                <p className="text-[11px] text-pink-400 mb-2 font-medium">Quick Keypad</p>
                <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'BACK'].map((btn) => (
                    <button
                      key={btn}
                      type="button"
                      onClick={() => handleKeypadPress(btn)}
                      className={`h-10 rounded-xl font-medium text-xs sm:text-sm transition-all active:scale-95 shadow-sm border ${
                        btn === 'CLEAR'
                          ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 text-[11px]'
                          : btn === 'BACK'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 text-[11px]'
                          : 'bg-white/90 text-gray-700 border-pink-100 hover:bg-pink-100 hover:text-pink-700'
                      }`}
                    >
                      {btn === 'CLEAR' ? 'Clear' : btn === 'BACK' ? '⌫' : btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unlock Button */}
              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-pink-300/60 hover:shadow-xl hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Unlocking your magic...</span>
                  </span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-pink-200 group-hover:scale-125 transition-transform fill-current" />
                    <span>{SURPRISE_CONFIG.login.buttonText}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-pink-50 flex items-center justify-center gap-1.5 text-[11px] text-pink-400">
            <span>Crafted with love by {SURPRISE_CONFIG.sender.name}</span>
            <span>❤️</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
