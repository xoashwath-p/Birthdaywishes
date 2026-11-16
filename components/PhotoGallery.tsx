'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, ZoomIn, Camera, ArrowRight } from 'lucide-react';
import { SURPRISE_CONFIG, PhotoItem } from '@/config/surprise';

interface PhotoGalleryProps {
  onContinue: () => void;
}

export default function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-4 py-16 z-10">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-pink-500" />
            <span>Digital Scrapbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Memories of Deepzz ❤️
          </h2>
          <p className="text-sm sm:text-base text-pink-600 font-medium">
            A hand-picked collection of polaroids celebrating your smiles, grace, and our moments.
          </p>
        </div>

        {/* Scrapbook Arranged Masonry / Scattered Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {SURPRISE_CONFIG.gallery.map((photo, index) => {
            const isLiked = likedPhotos.includes(photo.id);

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  transform: `rotate(${photo.rotation || 0}deg)`,
                }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Polaroid Card */}
                <div className="polaroid-frame bg-white">
                  {/* Washi tape on top */}
                  <div
                    className={
                      index % 3 === 0
                        ? 'washi-tape'
                        : index % 3 === 1
                        ? 'washi-tape-corner-left'
                        : 'washi-tape-corner-right'
                    }
                  />

                  {/* Tag badge */}
                  {photo.tag && (
                    <div className="absolute top-2 right-2 bg-pink-500/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 shadow-sm">
                      {photo.tag}
                    </div>
                  )}

                  {/* Photo Container - preserves original aspect ratio perfectly */}
                  <div className="relative w-full rounded overflow-hidden bg-pink-50 flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-auto max-h-[380px] object-contain rounded transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 shadow-md text-pink-600 flex items-center justify-center">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Polaroid Bottom Caption Area */}
                  <div className="pt-3 px-1 flex items-center justify-between">
                    <p className="font-handwriting text-pink-700 text-sm sm:text-base leading-snug">
                      {photo.caption}
                    </p>
                    <button
                      onClick={(e) => toggleLike(photo.id, e)}
                      className="p-1 text-pink-400 hover:text-pink-600 transition-colors ml-2 flex-shrink-0"
                      aria-label="Like photograph"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isLiked ? 'fill-pink-500 text-pink-500' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Navigation Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onContinue}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5 group"
          >
            <span>READ YOUR BIRTHDAY LETTER 💌 ➔</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-pink-100 overflow-hidden"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full max-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden bg-pink-50/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>

                <div className="pt-4 text-center">
                  <p className="font-handwriting text-pink-700 text-xl sm:text-2xl font-bold">
                    {selectedPhoto.caption}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Deepzz & Achuu • Sweet 19 Memories</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
