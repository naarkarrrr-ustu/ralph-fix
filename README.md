# 🕹️ ARCADE OS – System Corruption Mode

### A Reactive Arcade Operating System Inspired by the Wreck-It Ralph Universe

---

## 🎯 Overview

**ARCADE OS** simulates a networked arcade machine at *Litwak’s Arcade* that is actively being corrupted by Ralph. The system dynamically degrades through a centralized corruption engine and requires the user to diagnose, repair, and play the game to restore stability.

---

## 🔄 Official System Flow
To satisfy the competition requirements, the system follows this strict operational loop:
1.  **BOOT**: Insert a coin to power on the Litwak-3000 kernel.
2.  **SELECT GAME**: Choose a ROM module to simulate.
3.  **SELECT CHARACTER**: Inspect the anomaly and use the **Control Interface** to adjust character parameters.
4.  **FIX GLITCH**: Engage the emergency repair protocol using the system hammer.
5.  **PLAY ROM**: Successfully survive a session of the repaired game module.
6.  **RESTART**: Purge the Ralph anomaly and perform a factory reset.

---

## 🔊 Audio Asset Setup (REQUIRED ACTION)
The sound engine looks for files in the **`public/sounds/`** directory. You must manually add your own `.mp3` files to this folder using these exact absolute paths:

| Absolute File Path | Trigger Event |
| :--- | :--- |
| **`/public/sounds/coin.mp3`** | Initial credit insert at boot. |
| **`/public/sounds/boot.mp3`** | System startup and reset completion. |
| **`/public/sounds/click.mp3`** | Standard button and menu navigation. |
| **`/public/sounds/glitch.mp3`** | Corruption events and secret console access. |
| **`/public/sounds/hammer.mp3`** | Repairing fragments or smashing glitches. |
| **`/public/sounds/alert.mp3`** | System warnings and jumpscare events. |
| **`/public/sounds/death.mp3`** | Game over or sequence failure. |
| **`/public/sounds/shutdown.mp3`** | OS termination sequence. |

---

## 🧠 Core Architecture
- **Global Corruption Engine**: Visual distortion (RGB split, shake, flicker) that scales with system instability.
- **Game Status Monitor**: Persistent HUD tracking CPU temp, error frequency, and real-time logs.
- **Character Control Panel**: Real-time diagnostic toggles (Sprite Stability, Memory Shift) for active characters.
- **Konami Secret Module**: Input `↑ ↑ ↓ ↓ ← → ← → B A` via keyboard or virtual terminal to access Developer Mode.
- **Critical Cake Interaction**: Smashing the high-corruption cake with the hammer reduces corruption level by 15%.

*© 1982-2024 Litwak’s Arcade. All Rights Reserved.*