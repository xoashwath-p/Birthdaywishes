'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc } from 'lucide-react';
import { SURPRISE_CONFIG } from '@/config/surprise';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);

  // Sync refs to use inside event listeners without stale closures
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Load preferences from sessionStorage if user previously toggled mute/pause
  useEffect(() => {
    try {
      const savedMute = sessionStorage.getItem('deepzz_music_muted');
      if (savedMute !== null) {
        const muted = savedMute === 'true';
        setIsMuted(muted);
        if (audioRef.current) audioRef.current.muted = muted;
      }
    } catch (e) {
      // sessionStorage may be blocked in some private browsing modes
    }
  }, []);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.muted = isMutedRef.current;

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          setHasStartedOnce(true);
        })
        .catch((err) => {
          console.warn('Audio play deferred waiting for user touch/click:', err);
          // Browser autoplay restriction: resume on the very next user touch/click anywhere
          const unlockAudio = () => {
            if (audioRef.current && !isPlayingRef.current) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                setHasStartedOnce(true);
              }).catch(() => {});
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          };
          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
          window.addEventListener('keydown', unlockAudio, { once: true });
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // When autoPlayTrigger changes to true (after password unlocked), start audio
  useEffect(() => {
    if (autoPlayTrigger && !hasStartedOnce) {
      playAudio();
    }
  }, [autoPlayTrigger, hasStartedOnce, playAudio]);

  // Handle seamless infinite loop
  const handleEnded = useCallback(() => {
    if (audioRef.current && isPlayingRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  }, []);

  // Extra loop protection for 35-second tracks across mobile devices
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration && isPlayingRef.current) {
      // If within 0.2s of the end, loop smoothly
      if (audio.currentTime >= audio.duration - 0.2) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }
  }, []);

  // Music ON/OFF Play/Pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
      try {
        sessionStorage.setItem('deepzz_music_paused', 'true');
      } catch (e) {}
    } else {
      playAudio();
      try {
        sessionStorage.setItem('deepzz_music_paused', 'false');
      } catch (e) {}
    }
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      sessionStorage.setItem('deepzz_music_muted', String(nextMuted));
    } catch (e) {}
  };

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 select-none">
      {/* Persistent Single Audio Instance */}
      <audio
        ref={audioRef}
        src={SURPRISE_CONFIG.music.audioSrc}
        preload="auto"
        loop
        playsInline
        // @ts-ignore
        webkit-playsinline="true"
        onCanPlay={() => setIsLoaded(true)}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Floating Pastel Pink Music Control Card */}
      <div className="relative group">
        <div
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'bg-gradient-to-r from-pink-500/90 to-rose-500/90 text-white border-pink-300/80 shadow-pink-300/50'
              : 'bg-white/95 text-pink-700 border-pink-200/90 hover:bg-pink-50 shadow-pink-200/40'
          }`}
        >
          {/* Animated Spinning Vinyl Disc */}
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-1.5 focus:outline-none"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={isPlaying ? 'Pause Birthday Melody' : 'Play Birthday Melody'}
          >
            <div className="relative flex items-center justify-center">
              <Disc
                className={`w-5 h-5 ${
                  isPlaying && !isMuted
                    ? 'animate-spin text-pink-100'
                    : 'text-pink-400'
                }`}
                style={{ animationDuration: '4s' }}
              />
              {isPlaying && !isMuted && (
                <span className="absolute w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </div>

            {/* Pulsing Audio Equalizer Waves */}
            {isPlaying && !isMuted ? (
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                <span className="w-0.5 bg-white rounded-full h-full animate-pulse" />
                <span
                  className="w-0.5 bg-white rounded-full h-2 animate-pulse"
                  style={{ animationDelay: '0.15s' }}
                />
                <span
                  className="w-0.5 bg-white rounded-full h-3 animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                />
                <span
                  className="w-0.5 bg-white rounded-full h-1.5 animate-pulse"
                  style={{ animationDelay: '0.45s' }}
                />
              </div>
            ) : null}
          </button>

          {/* Quick Play/Pause Control Button */}
          <button
            onClick={togglePlayPause}
            className={`p-1.5 rounded-full transition-transform active:scale-90 ${
              isPlaying && !isMuted
                ? 'hover:bg-white/20 text-white'
                : 'hover:bg-pink-100 text-pink-600'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Quick Mute/Unmute Indicator & Toggle */}
          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-full transition-transform active:scale-90 border-l ${
              isPlaying && !isMuted
                ? 'border-white/30 hover:bg-white/20 text-white'
                : 'border-pink-200 hover:bg-pink-100 text-pink-600'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Text Status Badge for Desktop */}
          <span className="hidden sm:inline-block text-[11px] font-semibold pr-1">
            {isMuted
              ? 'Muted 🔇'
              : isPlaying
              ? 'Music ON 🎵'
              : 'Music OFF ⏸️'}
          </span>
        </div>
      </div>
    </div>
  );
}
