# 🕹️ ARCADE OS – System Corruption Mode

### A Reactive Arcade Operating System Inspired by the Wreck-It Ralph Universe

---

## 🎯 Overview

**ARCADE OS** simulates a networked arcade machine at *Litwak’s Arcade* that is actively being corrupted by Ralph.

<<<<<<< HEAD
### 🛠️ Required Competition Modules
1.  **Game Selection Screen**: `/game-select` — Choose between Niceland (Felix), Sugar Rush (Vanellope), or Hero's Duty (Calhoun).
2.  **Character Control Panel**: `/character` — A diagnostic interface where you can modify character stability, memory shift, and latency.
3.  **Glitch Repair System**: `/repair` — An interactive mini-game where you must "hammer" code fragments before the system crashes.
4.  **Game Status Monitor**: Global footer HUD (`SystemLog.tsx`) — Real-time telemetry labeled explicitly for monitoring system integrity.

---

## 🔄 Official System Flow
To satisfy the competition requirements, follow this strict operational loop:
1.  **BOOT**: Insert a coin to power on the Litwak-3000 kernel.
2.  **SELECT GAME**: Choose a ROM module to simulate.
3.  **SELECT CHARACTER**: Inspect the anomaly and use the **Control Interface** to adjust character parameters.
4.  **FIX GLITCH**: Engage the emergency repair protocol to restore system integrity.
5.  **RESTART**: Purge Ralph from the memory and perform a factory reset.

---

## 🔊 Audio Assets (Required)
Place these `.mp3` files in `/public/sounds/` to enable full system immersion:
- `coin.mp3`: Triggered on credit insert.
- `boot.mp3`: System startup and reset completion.
- `click.mp3`: Standard button and menu navigation.
- `glitch.mp3`: Corruption events and secret console access.
- `hammer.mp3`: Repairing code fragments or smashing glitches.
- `alert.mp3`: System warnings and jumpscare events.
- `death.mp3`: Game over or sequence failure.
- `shutdown.mp3`: OS termination sequence.
=======
The system dynamically degrades through a centralized corruption engine and requires the user to:

1. Select a ROM
2. Diagnose the anomaly
3. Repair system instability
4. Successfully launch and play the game
5. Survive corruption resurgence
6. Perform a full system purge

The result is a fully interactive, cinematic arcade OS simulation.

---

## ✅ Problem Statement Compliance

This project implements the **Arcade Game Operating System – Wreck-It Ralph Theme** requirements:

### Required Modules

* ✔ Game Selection Screen
* ✔ Character Control Panel
* ✔ Glitch Repair System
* ✔ Game Status Monitor

### Required Flow

Select Game → Select Character → Fix Glitch → Restart Game

Implemented Flow:
Boot → Game Select → Character → Repair → Play → Restart → Boot

The system contains multiple interactive screens, complete navigation, and a full user loop.

---

## 🧠 Core Architecture

### 🔥 Global Corruption Engine

* Centralized state (0–100%)
* CSS-variable driven visual distortion (`--corruption-intensity`)
* Controls glitch, shake, flicker, distortion intensity
* Debounced and clamped for stability
* Auto-recovery safeguards

Corruption is not decorative — it drives UI behavior and gameplay difficulty.
>>>>>>> 38ca047ae9b0bb9aa78413c8b81b89df6ed381e4

---

### 🕹️ Playable Game Module

After successful repair, the selected ROM launches.

<<<<<<< HEAD
### 2. Secret Input Module
Can't find a keyboard? Look for the tiny **Terminal Icon** in the top-left corner. It opens a virtual gamepad for Konami input via mouse/touch.

### 3. Bad-Anon Meeting
Click the scrolling title marquee **5 times** to crash the meeting and see Ralph, Bowser, Zangief, and the rest of the villain support group.

### 4. Critical Cake (Interactive)
If you reach **85% Corruption**, the "Critical Cake" may appear. **Click to smash it** with the hammer to instantly drop corruption by 15%.
=======
Example (Fix-It Felix Mode):

* Falling repair targets
* Click-to-fix mechanic
* 20-second survival timer
* Stability meter interaction
* Win/Lose logic
* Corruption resurgence event

The system is not only repaired — it becomes playable.
>>>>>>> 38ca047ae9b0bb9aa78413c8b81b89df6ed381e4

---

### 🛠 Glitch Repair System

* Hammer-based mini-game
* Countdown timer
* Score tracking
* Real-time corruption reduction
* Difficulty scaling based on instability
* Fail state increases corruption
* Guaranteed resolution (no soft-lock)

<<<<<<< HEAD
*© 1982-2024 Litwak’s Arcade. All Rights Reserved.*
=======
---

### 📊 Game Status Monitor

Explicitly labeled system HUD displaying:

* Stability %
* CPU Heat
* Error Frequency
* Operational Logs
* Active ROM

The monitor is persistent and reactive to system state.

---

### 🎮 Character Control Panel

Interactive diagnostic suite allowing:

* Sprite Stability toggling
* Memory Shift simulation
* ROM Emulation trigger
* Direct anomaly control

All toggles affect system state safely.

---

## 🎨 Immersion Features

* CRT curvature simulation
* Scanline overlay
* Metallic arcade cabinet frame
* Animated marquee header
* Pixel-shatter buttons
* World-specific color themes
* Dynamic corruption distortion
* “Going Turbo” spike event
* Cupcake anomaly interaction
* Bad-Anon hidden overlay
* Konami Code Developer Mode
* Virtual gamepad input

---

## 🔊 Sound System

Integrated via HTML5 Audio API.

Includes:

* Boot sequence
* Coin insert
* Button clicks
* Glitch distortion
* Hammer repair
* Alert be
>>>>>>> 38ca047ae9b0bb9aa78413c8b81b89df6ed381e4
