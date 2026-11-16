# 💖 Deepzz's 19th Birthday Surprise Website

A premium-quality, romantic, interactive birthday surprise website crafted with love by **Achuu** for **Deepzz** on her 19th Birthday.

---

## 🌟 Key Features

1. **🔐 Password-Protected Entrance (Always On Entry)**:
   - When entering or refreshing the website, it **always prompts for the secret magic password**.
   - Server-side verification via `/api/login` and signed HTTP-only session cookies.
   - Brute-force protection & attempt rate limiting.
   - Unauthenticated visitors **cannot** access private photos or birthday sections.
   - Beautiful polaroid teaser, password input with show/hide, interactive numeric keypad, and celebratory unlock animation.
2. **🎂 Interactive Birthday Cake**:
   - Multi-tier pastel cake with flickering candle flames.
   - "MAKE A WISH" interactive button that blows out the candle flames with smoke puff animations, floating hearts, and colorful confetti explosions.
3. **🎁 Interactive Gift Boxes**:
   - 3 individual animated gift boxes that unwrap to reveal private romantic messages and couple photos.
4. **📸 Personal Scrapbook Photo Gallery**:
   - Real uploaded photographs displayed as vintage polaroids with washi tape, stamps, and natural proportions (zero distortion).
   - Click to zoom into full high-res lightbox modals.
   - Advances directly to Deepzz's personal birthday letter!
5. **💌 Handwritten Birthday Letter**:
   - 3D wax-sealed animated envelope that unfolds into a parchment letter with smooth typing reveals.
6. **👑 Spotlight Special Photo Reveal**:
   - Dedicated spotlight celebrating Deepzz turning 19 with glowing halo lighting and petals.
7. **🎉 Grand Birthday Finale & Replay**:
   - Confetti shower, photo collage montage, closing signature from Achuu, and a "REPLAY THE SURPRISE ❤️" button.
8. **🎵 Background Music Player**:
   - Elegant top-right floating music toggle ready for when audio is uploaded.
9. **⚙️ Single Configuration File**:
   - All messages, dates, nicknames, and captions live in [`config/surprise.ts`](./config/surprise.ts).

---

## 🚀 How to Run Locally

1. Open a terminal in this project directory:
   ```bash
   cd c:\Users\ashwa\Downloads\deepzz-surprise
   ```
2. Start the local server:
   ```bash
   npm run start
   # or for development mode:
   npm run dev
   ```
   Or simply double-click [`preview-website.bat`](./preview-website.bat)!
3. Open your browser to `http://localhost:3000`.
4. Enter the password: `20112024` (or the custom password you configure in `.env.local`).

---

## 🎵 How to Add Your Background Audio Track

When you are ready to add your background music:
1. Place your audio file in the folder: `public/audio/birthday-song.mp3`
2. In `config/surprise.ts`, ensure:
   ```typescript
   music: {
     songTitle: "Our Song",
     audioSrc: "/audio/birthday-song.mp3",
     hasAudioFile: true,
   }
   ```
3. That's it! The music player will automatically play seamlessly across all sections.

---

## 🔒 Security & Environment Variables

Create or configure these environment variables in your local `.env.local` or on your **Vercel Project Settings**:

| Variable | Description | Default (if not set) |
|---|---|---|
| `SURPRISE_PASSWORD` | The secret password Deepzz must enter to unlock the website | `20112024` |
| `SESSION_SECRET` | Secret key used to cryptographically sign session cookies | `deepzz-birthday-achuu-love-secret-2026` |

---

## 🌐 Step-by-Step Deployment Guide (GitHub & Vercel)

### Step 1: Create a Private GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Set Repository Name: `deepzz-birthday-surprise`.
3. Choose **Private** (Crucial so nobody else can see the code or photos).
4. Click **Create repository**.

### Step 2: Push the Project to GitHub
In PowerShell inside `c:\Users\ashwa\Downloads\deepzz-surprise`:
```powershell
git init
git add .
git commit -m "Deepzz 19th Birthday Surprise Website ❤️"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/deepzz-birthday-surprise.git
git push -u origin main
```

### Step 3: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New...** -> **Project**.
3. Import your private repository `deepzz-birthday-surprise`.
4. Framework Preset: **Next.js** (automatically detected).

### Step 4: Configure Environment Variables in Vercel
Before clicking Deploy, expand the **Environment Variables** section:
- Key: `SURPRISE_PASSWORD` | Value: *[Your Secret Password]*
- Key: `SESSION_SECRET` | Value: *[Any Random 32-character string]*
Click **Add**.

### Step 5: Deploy
Click **Deploy**. Vercel will build and deploy the website in under 1 minute and give you a live production URL (e.g., `https://deepzz-surprise.vercel.app`)!
