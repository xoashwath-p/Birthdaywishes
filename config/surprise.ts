// =========================================================================
// DEEPZZ'S BIRTHDAY SURPRISE CONFIGURATION
// All personal messages, photos, and settings can be easily edited right here!
// =========================================================================

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  rotation?: number; // Polaroid tilt degrees
  tag?: string;
}

export interface GiftItem {
  id: string;
  title: string;
  color: string;
  ribbonColor: string;
  revealTitle: string;
  revealMessage: string;
  photoUrl?: string;
}

export interface TimelineItem {
  id: string;
  dateOrPhase: string;
  title: string;
  caption: string;
  photoUrl: string;
  sticker: string;
}

export const SURPRISE_CONFIG = {
  // 1. Personal Details
  recipient: {
    name: "DEEPZZ",
    age: 19,
    nickname: "Deepzz ❤️",
  },
  sender: {
    name: "ACHUU",
    relationship: "Girlfriend",
  },
  websiteTitle: "A SPECIAL SURPRISE FOR YOU ❤️",

  // 2. Login Screen Configuration
  login: {
    heading: "A LITTLE SURPRISE FOR YOU ❤️",
    subtitle: "A special digital gift crafted with all my love",
    buttonText: "UNLOCK YOUR SURPRISE ❤️",
    placeholder: "Enter the secret magic password...",
    errorMessage: "Oops! That's not the magic password. Try again, sweetheart! ❤️",
    successMessage: "Yayyy! You unlocked your little surprise! ❤️",
  },

  // 3. Opening Welcome Screen
  welcome: {
    heading: "Welcome, Deepzz! 🎉",
    tagline: "Today is all about celebrating YOU",
    openingMessage:
      "Every single moment with you is special, but today is the most magical day of all. Happy 19th Birthday to my favorite person in the entire universe! Are you ready for your surprise?",
    buttonText: "OPEN YOUR SURPRISE 🎁",
  },

  // 4. Interactive Cake Screen
  cake: {
    heading: "Make a Birthday Wish, Deepzz! 🎂",
    subheading: "Blow out the candles and see what sweet memories await you inside...",
    buttonWishText: "MAKE A WISH & BLOW CANDLES ✨",
    blownGreeting: "Happy 19th Birthday Deepzz! May all your dreams come true! ❤️",
    continueButtonText: "EXPLORE YOUR SURPRISES ➔",
  },

  // 5. Interactive Gift Surprise Boxes
  gifts: [
    {
      id: "gift-1",
      title: "Surprise #1",
      color: "from-pink-400 to-rose-400",
      ribbonColor: "bg-amber-300",
      revealTitle: "A Warm Hug Across Every Mile 🌸",
      revealMessage:
        "No matter where we are, having you in my life makes every single day brighter and warmer. You are truly one of a kind, Deepzz!",
      photoUrl: "/api/media/photo_5.jpg",
    },
    {
      id: "gift-2",
      title: "Surprise #2",
      color: "from-rose-400 to-pink-500",
      ribbonColor: "bg-white",
      revealTitle: "Our Sweetest & Silliest Moments 🐶",
      revealMessage:
        "Every goofy laugh, funny selfie, and sweet memory we share is a treasure I hold close to my heart. Never lose that adorable smile!",
      photoUrl: "/api/media/photo_6.jpg",
    },
    {
      id: "gift-3",
      title: "Surprise #3",
      color: "from-purple-400 to-pink-400",
      ribbonColor: "bg-amber-300",
      revealTitle: "Always By Your Side ✨",
      revealMessage:
        "Entering 19 with so much beauty, strength, and joy. I am so lucky and grateful to celebrate this special milestone with you!",
      photoUrl: "/api/media/photo_7.jpg",
    },
  ] as GiftItem[],

  // 6. Personal Photo Gallery (using your uploaded photographs)
  gallery: [
    {
      id: "photo-1",
      url: "/api/media/photo_1.jpg",
      caption: "That bright radiant smile that warms my heart every time ❤️",
      rotation: -3,
      tag: "Radiant Smile",
    },
    {
      id: "photo-2",
      url: "/api/media/photo_2.jpg",
      caption: "Pure elegance and sweet grace ✨",
      rotation: 2,
      tag: "Sweet Vibes",
    },
    {
      id: "photo-3",
      url: "/api/media/photo_3.jpg",
      caption: "Breathtaking in this saree... looking absolutely gorgeous! 🥰",
      rotation: -2,
      tag: "Stunning Beauty",
    },
    {
      id: "photo-4",
      url: "/api/media/photo_4.jpg",
      caption: "Vibrant colors, playful laughter, and pure happiness 🌸",
      rotation: 3,
      tag: "Pure Joy",
    },
    {
      id: "photo-5",
      url: "/api/media/photo_5.jpg",
      caption: "You & Me, forever in our own little world 💫",
      rotation: -4,
      tag: "Together",
    },
    {
      id: "photo-6",
      url: "/api/media/photo_6.jpg",
      caption: "Our goofy filter fun... making life so playful and sweet! 🐶❤️",
      rotation: 2,
      tag: "Goofy & Cute",
    },
    {
      id: "photo-7",
      url: "/api/media/photo_7.jpg",
      caption: "Wrapped in warmth and sweetest smiles 🧣✨",
      rotation: -1,
      tag: "Cozy Memories",
    },
    {
      id: "photo-8",
      url: "/api/media/photo_8.jpg",
      caption: "That charming floral grace and timeless beauty 🌸✨",
      rotation: -3,
      tag: "Graceful",
    },
    {
      id: "photo-9",
      url: "/api/media/photo_9.jpg",
      caption: "Our secret Spidey identities with cute pink bows 🕷️🎀❤️",
      rotation: 2,
      tag: "Spidey Duo",
    },
    {
      id: "photo-10",
      url: "/api/media/photo_10.jpg",
      caption: "Smiling side by side, today, tomorrow, and always 💞",
      rotation: -2,
      tag: "Two of Us",
    },
    {
      id: "photo-11",
      url: "/api/media/photo_11.jpg",
      caption: "Lost in sweet thoughts and that quiet, adorable smile 🎧🌸",
      rotation: 3,
      tag: "Sweet Moments",
    },
  ] as PhotoItem[],

  // 7. Scrapbook Memory Timeline
  timeline: [
    {
      id: "tl-1",
      dateOrPhase: "Chapter 1",
      title: "The Sunshine in My World ☀️",
      caption:
        "From the first smile to all the little moments we share, you have brought so much light and gentle warmth into my life.",
      photoUrl: "/api/media/photo_1.jpg",
      sticker: "🌟",
    },
    {
      id: "tl-2",
      dateOrPhase: "Chapter 2",
      title: "Unmatched Grace & Charm 💖",
      caption:
        "Every single side of you is special. Whether dressed up or just being your natural self, you never fail to amaze me.",
      photoUrl: "/api/media/photo_3.jpg",
      sticker: "✨",
    },
    {
      id: "tl-3",
      dateOrPhase: "Chapter 3",
      title: "Laughter, Fun & Goofiness 🎀",
      caption:
        "Being silly together, sharing endless laughs, and taking goofy photos that remind me how lucky I am.",
      photoUrl: "/api/media/photo_6.jpg",
      sticker: "🥰",
    },
    {
      id: "tl-4",
      dateOrPhase: "Chapter 4",
      title: "Turning 19 Together 🎂",
      caption:
        "Stepping into a wonderful new year of life! Excited for all the new adventures, dreams, and beautiful moments ahead.",
      photoUrl: "/api/media/photo_7.jpg",
      sticker: "🎉",
    },
  ] as TimelineItem[],

  // 8. Personal Birthday Letter
  letter: {
    envelopeTitle: "A Handwritten Note For You",
    envelopePrompt: "OPEN YOUR LETTER ❤️",
    date: "November 16, 2026",
    salutation: "My Dearest Deepzz,",
    paragraphs: [
      "En anbaana Deepzz ku  💗",
      "Eppadi indha letter-ah start panrathunu theriyala. Unkitta solla neraya vishayangal irukku. Aana sila feelings-ah words-la sollave mudiyadhu. 🥹❤️",
      "Nee en life-la vandhadhukku apram neraya vishayangal maarirukku. Normal-ah irukkura days kooda unnaala special-ah maariduchu. Unkooda pesura chinna chinna moments, unnodu sirippu, un kovam, un childish behaviour ellame enakku romba special. 🫠💕",
      "Sometimes, I may not express my love properly. Sila neram unkitta kovapadalaam, sanda podalaam, unna purinjukkama nadandhukkalaam. But please remember, en manasula unakkana edam eppovume special dhaan. ❤️",
      "Naan unkitta perfection expect pannala. Nee neeyaave iru. Unnoda happiness, dreams, feelings ellathayum naan respect pannanumnu ninaikkiren. Unakku happy-ah irukkura nerathula mattum illaama, kashtamana nerathulayum unakku support-ah irukkanumnu aasapaduren. 🫂❤️",
      "Unkooda eppolam romba sanda poduren, namakkulla neraya misunderstandings varudhu. Sometimes namma rendu perum oruthar oruthara purinjukkaama hurt pannikirOm. Aana idhellam oru naal kandippa seri aagum thangooo. 🥺❤️ Namma rendu perum konjam konjama purinjukittu, ellathayum serndhu overcome pannuvom. I never want small misunderstandings to become bigger than our love. 🫶🏻",
      "I don't know what the future holds for us. But I know one thing, the moments I spend with you are precious to me. Unnoda serndhu innum neraya memories create pannanum. Neraya sirikkanum, chinna chinna sandaigal podanum, marubadiyum samadhanam aaganum. I want more beautiful memories with you. 🥹💗",
      "Finally, one thing I want you to know... ❤️",
      "Nee enakku oru girlfriend mattum illa. En life-la naan romba value panra oru beautiful relationship. Unna love panradhoda mattum illaama, unna purinjukkavum, respect pannavum, un feelings-ku importance kudukkavum aasapaduren. Nee eppovume happy-ah irukkanum. Adhu dhaan enakku romba mukkiyam. 🥺🫶🏻",
    ],
    closingLines: [
      "Serii Thangoo pesuna pesite irupan , aprm letter patathu.. nama call la pesikalam 😅😘",
      "Epavum Unaku Uymai ah irukura Un Mamaa 💗💋🫶🏻",
      "Loveeeee youuuu diii Thangaaaa Pullaaaaa! 😘💋💗♾️",
    ],
  },

  // 9. Special Spotlight Photo Reveal (Highlighting Deepzz)
  specialReveal: {
    heading: "The Queen of the Day 👑",
    subheading: "A spotlight for the most gorgeous girl turning 19",
    photoUrl: "/api/media/photo_3.jpg",
    caption: "Deepzz — Elegant, beautiful, and the center of my universe ✨",
    quote: "“In your smile, I see something more beautiful than the stars.”",
  },

  // 10. Final Grand Birthday Screen
  finalScreen: {
    banner: "HAPPY 19TH BIRTHDAY, DEEPZZ! 💖",
    closingMessage:
      "May this year be filled with boundless joy, unforgettable memories, and all the love your heart can hold. You are deeply loved, today and every single day.",
    senderSignature: "With Endless Love, ACHUU ❤️",
    replayButtonText: "REPLAY THE SURPRISE ❤️",
  },

  // 11. Music Player Settings (Ready for your audio!)
  music: {
    songTitle: "Romantic Birthday Melody",
    audioSrc: "/audio/birthday-song.mp3",
    hasAudioFile: true,
  },
};
