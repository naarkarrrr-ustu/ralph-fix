🕹️ ARCADE OS – System Corruption Mode
A Reactive Arcade Operating System Inspired by the Wreck-It Ralph Universe
🎯 Overview

ARCADE OS simulates a networked arcade machine at Litwak’s Arcade that is actively being corrupted by Ralph.

The system dynamically degrades through a centralized corruption engine and requires the user to:

Select a ROM

Diagnose the anomaly

Repair system instability

Successfully launch and play the game

Survive corruption resurgence

Perform a full system purge

The result is a fully interactive, cinematic arcade OS simulation.

✅ Problem Statement Compliance

This project implements the Arcade Game Operating System – Wreck-It Ralph Theme requirements:

Required Modules

✔ Game Selection Screen

✔ Character Control Panel

✔ Glitch Repair System

✔ Game Status Monitor

Required Flow

Select Game → Select Character → Fix Glitch → Restart Game

Implemented Flow:
Boot → Game Select → Character → Repair → Play → Restart → Boot

The system contains multiple interactive screens, complete navigation, and a full user loop.

🧠 Core Architecture
🔥 Global Corruption Engine

Centralized state (0–100%)

CSS-variable driven visual distortion (--corruption-intensity)

Controls glitch, shake, flicker, distortion intensity

Debounced and clamped for stability

Auto-recovery safeguards

Corruption is not decorative — it drives UI behavior and gameplay difficulty.

🕹️ Playable Game Module

After successful repair, the selected ROM launches.

Example (Fix-It Felix Mode):

Falling repair targets

Click-to-fix mechanic

20-second survival timer

Stability meter interaction

Win/Lose logic

Corruption resurgence event

The system is not only repaired — it becomes playable.

🛠 Glitch Repair System

Hammer-based mini-game

Countdown timer

Score tracking

Real-time corruption reduction

Difficulty scaling based on instability

Fail state increases corruption

Guaranteed resolution (no soft-lock)

📊 Game Status Monitor

Explicitly labeled system HUD displaying:

Stability %

CPU Heat

Error Frequency

Operational Logs

Active ROM

The monitor is persistent and reactive to system state.

🎮 Character Control Panel

Interactive diagnostic suite allowing:

Sprite Stability toggling

Memory Shift simulation

ROM Emulation trigger

Direct anomaly control

All toggles affect system state safely.

🎨 Immersion Features

CRT curvature simulation

Scanline overlay

Metallic arcade cabinet frame

Animated marquee header

Pixel-shatter buttons

World-specific color themes

Dynamic corruption distortion

“Going Turbo” spike event

Cupcake anomaly interaction

Bad-Anon hidden overlay

Konami Code Developer Mode

Virtual gamepad input

🔊 Sound System

Integrated via HTML5 Audio API.

Includes:

Boot sequence

Coin insert

Button clicks

Glitch distortion

Hammer repair

Alert be
