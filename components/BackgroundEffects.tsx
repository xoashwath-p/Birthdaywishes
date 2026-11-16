'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function BackgroundEffects() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate floating hearts with stable random values on client
    const generatedHearts: Heart[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen width
      size: Math.floor(Math.random() * 18) + 14, // 14px to 32px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft romantic ambient gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-rose-200/35 rounded-full blur-3xl translate-y-1/3 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-3xl" />

      {/* Floating romantic hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            bottom: '-40px',
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, Math.sin(heart.id) * 30, 0],
            rotate: [0, heart.id % 2 === 0 ? 25 : -25, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          {heart.id % 3 === 0 ? '💖' : heart.id % 3 === 1 ? '🌸' : '✨'}
        </motion.div>
      ))}

      {/* Subtle sparkling stars scattered */}
      <div className="absolute top-12 left-10 text-amber-300 text-sm animate-sparkle">✦</div>
      <div className="absolute top-28 right-20 text-pink-400 text-lg animate-sparkle" style={{ animationDelay: '0.8s' }}>✨</div>
      <div className="absolute top-3/4 left-16 text-rose-300 text-sm animate-sparkle" style={{ animationDelay: '1.4s' }}>✦</div>
      <div className="absolute bottom-20 right-12 text-amber-200 text-lg animate-sparkle" style={{ animationDelay: '0.4s' }}>✨</div>
    </div>
  );
}
