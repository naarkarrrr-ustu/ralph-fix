# 🕹️ ARCADE OS – System Corruption Mode  
### A Reactive Arcade Operating System Inspired by the Wreck-It Ralph Universe

---

## 🎯 Overview

**ARCADE OS** simulates a networked arcade machine at *Litwak’s Arcade* that is actively being corrupted by Ralph.

Instead of building a static glitch-themed website, this project models a **reactive arcade operating system** where system instability dynamically affects visuals, gameplay, and difficulty.

Users must:

1. Insert Coin & Boot the Kernel  
2. Select a ROM (Game World)  
3. Diagnose the Character Anomaly  
4. Repair the Corrupted System  
5. Successfully Play the Restored ROM  
6. Purge Ralph and Reset the OS  

The experience forms a complete, playable arcade lifecycle.

---

## ✅ Problem Statement Compliance

### Required Modules
- ✔ Game Selection Screen  
- ✔ Character Control Panel  
- ✔ Glitch Repair System  
- ✔ Game Status Monitor  

### Required Flow
Select Game → Select Character → Fix Glitch → Restart Game  

### Implemented Flow
`/boot → /game-select → /character → /repair → /play → /restart → /boot`

The system contains:
- Multiple distinct interactive screens  
- Functional navigation between all modules  
- A complete playable user loop  
- Clear reset and completion states  

---

## 🧠 Core Architecture

### 🔥 Global Corruption Engine

At the heart of the system is a centralized **CorruptionProvider** (React Context).

- Corruption Level: 0–100% (strictly clamped)
- Drives a dynamic CSS variable: `--corruption-intensity`
- Controls:
  - RGB split distortion
  - Screen shake amplitude
  - Flicker intensity
  - Visual instability
  - Mini-game difficulty scaling
  - Audio distortion

Corruption is not decorative — it actively influences gameplay and UI behavior.

---

## 🕹️ Modules Breakdown

---

### 1️⃣ `/boot` — Kernel Initialization

**Purpose:** Reset system and unlock audio safely.

- “INSERT COIN TO START” interaction
- Resets corruption to 0%
- Initializes Litwak-3000 Kernel
- Audio unlock compliant with browser policies

---

### 2️⃣ `/game-select` — ROM Selector

**Purpose:** Choose arcade world.

- Grid-based ROM selection
- World-specific accent themes
- Hover glitch effects
- Corruption increases upon ROM load

Worlds:
- Fix-It Felix Jr.
- Sugar Rush
- Hero’s Duty

---

### 3️⃣ `/character` — Diagnostic Control Panel

**Purpose:** Identify and manage the Ralph anomaly.

- SYSTEM MONITOR HUD
- Stability indicator
- Toggle-based character controls
- Real-time system logs

User can:
- Inspect sprite stability
- Emulate ROM state
- Trigger repair sequence

---

### 4️⃣ `/repair` — Glitch Repair Mini-Game

**Purpose:** Restore corrupted ROM.

Mechanics:
- Hammer-based interaction
- Smash 5 corruption fragments
- Countdown timer
- Real-time corruption reduction
- Fail state increases instability

Features:
- Difficulty scaling based on corruption level
- Safe interval cleanup
- Guaranteed win/lose resolution

---

### 5️⃣ `/play` — Playable ROM Simulation

**Purpose:** Provide gameplay payoff after repair.

Mechanics (Fix-It Felix style):
- 20-second survival
- Falling targets
- Click to maintain stability
- Score tracking
- Lose if stability drops to 0

Corruption may resurge mid-play, triggering crash.

This completes the arcade narrative loop.

---

### 6️⃣ `/restart` — Purge Protocol

**Purpose:** Remove Ralph and reset OS.

- “RALPH PURGED”
- Factory reset animation
- Corruption reset to 0%
- Returns to `/boot`

---

## 📊 Game Status Monitor

Persistent, labeled HUD displaying:

- Stability %
- CPU Heat
- Error Frequency
- Active ROM
- Real-time System Logs

Log size is capped to prevent memory growth.

---

## 🔊 Audio System

Built using HTML5 Audio API with custom React hooks.

Includes:
- Boot sound
- Coin insert
- Button clicks
- Glitch distortion
- Hammer repair
- Shutdown sequence

Audio:
- Preloaded
- User-unlocked
- Toggle-enabled
- Non-blocking

---

## 🎨 Visual System

- CRT curvature simulation
- Scanline overlay
- Metallic arcade cabinet frame
- Animated marquee header
- Pixel-shatter buttons
- RGB glitch distortion
- Corruption-reactive visual scaling
- Controlled shake & flicker limits

All visuals are dynamically controlled by CSS variables.

---

## ☁ Firebase Integration

- Firestore leaderboard for repair scores
- Async-safe write operations
- Non-blocking fetch
- Graceful offline fallback
- No UI dependency on network success

Simulates a connected Litwak arcade network.

---

## 🎭 Easter Eggs

### 🕹 Konami Code
`↑ ↑ ↓ ↓ ← → ← → B A`

- Correct: Developer Mode (rainbow glitch + stability reset)
- Incorrect: “Going Turbo” crash

---

### 🧁 Cupcake Anomaly
At >85% corruption:
- Rare glitch event
- Smash to reduce corruption instantly

---

### 👥 Bad-Anon Meeting
Click marquee 5 times:
- Hidden villain support overlay

---

### 🎮 Virtual Gamepad
Accessible input for non-keyboard devices.

---

## 🛡 Stability & Safety

- Corruption clamped 0–100
- Debounced updates
- No interval stacking
- Timer cleanup on unmount
- Safe route refresh
- Back-button resilience
- Memory leak prevention
- Console-clean deployment

Designed to withstand aggressive demo interaction.

---

## 🏆 Why This Project Stands Out

Most glitch-based designs are aesthetic overlays.

ARCADE OS models:

- A reactive instability engine
- Gameplay influenced by system state
- A complete arcade lifecycle
- Narrative cohesion
- Networked persistence
- Technical safety under high distortion

This is not just a UI experiment.

It is a playable arcade operating system simulation.

---

## 🚀 Deployment

- Next.js 15 (App Router)
- React 19
- Tailwind CSS + Custom HSL Variables
- ShadCN UI (Radix-based)
- Lucide Icons
- Firebase Firestore
- Vercel Deployment

Fully production-ready and competition stable.
