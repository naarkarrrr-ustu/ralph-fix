# 🕹️ ARCADE OS – System Corruption Mode

**Property of Litwak’s Arcade**  
*“I’m gonna wreck it!” — Ralph*

Welcome to **ARCADE OS**, a cinematic, fully immersive Next.js 15 simulation of a retro arcade machine operating system that is actively falling apart due to a character-based anomaly (RALPH.OBJ).

---

## 🚀 The Experience

This isn't just a website; it's a living arcade cabinet. As you navigate the system, **Corruption (0–100%)** builds up, physically distorting the UI with RGB splits, screen shakes, and audible glitching.

### 🛠️ Required Competition Modules
1.  **Game Selection Screen**: `/game-select` — Choose between Niceland (Felix), Sugar Rush (Vanellope), or Hero's Duty (Calhoun).
2.  **Character Control Panel**: `/character` — A diagnostic interface where you can "Control" character stability, memory shift, and latency.
3.  **Glitch Repair System**: `/repair` — An interactive mini-game where you must "hammer" code fragments before the system crashes.
4.  **Game Status Monitor**: Global footer HUD (`SystemLog.tsx`) — Real-time telemetry of CPU heat, character locations, and "Turbo" activity.

---

## 🔄 Official System Flow
To satisfy the "Wreck-It Ralph" competition requirements, the user must follow this strict operational loop:
1.  **BOOT**: Insert a coin to power on the Litwak-3000 kernel.
2.  **SELECT GAME**: Choose a ROM module to simulate.
3.  **SELECT CHARACTER**: Inspect the anomaly and attempt to "Control" character parameters.
4.  **FIX GLITCH**: Engage the emergency repair protocol to restore system integrity.
5.  **RESTART**: Purge Ralph from the memory and perform a factory reset.

---

## ✨ Immersive Features & "Weird" Interactions
- **Pixel-Shatter Buttons**: Interacting with system buttons causes them to physically break into pixel fragments.
- **CRT Simulation**: High-fidelity scanlines, screen curvature (warp), and hardware vignettes.
- **Dynamic Glitch Text**: Typography that jitters and flickers based on the current `corruptionLevel`.
- **Sound System**: 8-bit arcade effects for coins, hammers, and system failures (Requires `.mp3` assets in `/public/sounds`).

---

## 🤫 Easter Eggs (Top Secret)

### 1. The Konami Code
At any time, type the following on your physical keyboard:  
`↑ ↑ ↓ ↓ ← → ← → B A`
- **Success**: Unlocks **DEVELOPER MODE** (Rainbow UI + Reset).
- **Failure**: Triggers a **"GOING TURBO"** event, crashing the OS.

### 2. Secret Input Module
Can't find a keyboard? Look for the tiny **Terminal Icon** in the top-left corner. It opens a virtual gamepad so you can enter the Konami code via mouse or touch.

### 3. Bad-Anon Meeting
The villains are meeting! **Click the scrolling title marquee 5 times** to crash the meeting and see Ralph, Bowser, Zangief, and the rest of the support group.

### 4. Cupcake Jumpscare
If you let the system reach **85% Corruption**, there is a 5% chance the "Critical Cake" anomaly will flash on your screen.

---

## 💻 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Components**: Shadcn UI + Radix Primitives
- **Styling**: Tailwind CSS + Custom Glitch Keyframes
- **State**: React Context (`CorruptionProvider`)
- **Icons**: Lucide React

---

## ⚠️ Warning
If **Turbo** activity is detected, immediately proceed to `/repair`. Failure to maintain system integrity may result in the cabinet being labeled **"OUT OF ORDER"**.

*© 1982-2024 Litwak’s Arcade. All Rights Reserved.*
