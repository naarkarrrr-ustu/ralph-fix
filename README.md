# 🕹️ ARCADE OS – System Corruption Mode

**Property of Litwak’s Arcade**  
*“I’m gonna wreck it!” — Ralph*

Welcome to **ARCADE OS**, a cinematic, fully immersive Next.js 15 simulation of a retro arcade machine operating system that is actively falling apart due to a character-based anomaly (RALPH.OBJ).

---

## 🚀 The Experience

This isn't just a website; it's a living arcade cabinet. As you navigate the system, **Corruption (0–100%)** builds up, physically distorting the UI with RGB splits, screen shakes, and audible glitching.

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

---

## 🤫 Easter Eggs (Top Secret)

### 1. The Konami Code
At any time, type the following on your physical keyboard:  
`↑ ↑ ↓ ↓ ← → ← → B A`
- **Success**: Unlocks **DEVELOPER MODE** (Rainbow UI + Reset).
- **Failure**: Triggers a **"GOING TURBO"** event, crashing the OS.

### 2. Secret Input Module
Can't find a keyboard? Look for the tiny **Terminal Icon** in the top-left corner. It opens a virtual gamepad for Konami input via mouse/touch.

### 3. Bad-Anon Meeting
Click the scrolling title marquee **5 times** to crash the meeting and see Ralph, Bowser, Zangief, and the rest of the villain support group.

### 4. Critical Cake (Interactive)
If you reach **85% Corruption**, the "Critical Cake" may appear. **Click to smash it** with the hammer to instantly drop corruption by 15%.

---

## 💻 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Components**: Shadcn UI + Radix Primitives
- **Styling**: Tailwind CSS + Custom Glitch Keyframes
- **State**: React Context (`CorruptionProvider`)
- **Icons**: Lucide React

*© 1982-2024 Litwak’s Arcade. All Rights Reserved.*
