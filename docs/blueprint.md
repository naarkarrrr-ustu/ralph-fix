# **App Name**: System Corruption: Arcade OS

## Core Features:

- Boot Screen: Initial loading screen with subtle loading animation and minimal flicker to establish a retro arcade feel.
- Game Selection Screen: Presents a selection of (non-functional) games with titles using GlitchText, a slight flicker overlay, and buttons with pixel hover distortion. Select any button to proceed to character selection.
- Character Control Screen: Allows 'control' of a character, displaying random corruption overlay flashes, slight cursor distortion, small layout shifts on hover, and occasional fake system warning popups.
- Glitch Repair Screen: A screen with a corruption progress bar that increases unpredictably. Features buttons that break into pixel blocks on click, random glitch overlays, fake error popups ('Memory leak detected', 'Ralph detected'), pixel distortion animations, and scrambled text labels. Simulate fragment clicking to repair glitches.
- Restart Screen: Resets the system to a clean UI state, with a smooth transition animation, and one final micro-glitch as a humorous send-off. Navigates back to the boot screen.
- Global Corruption Level: Maintains a global state for 'corruptionLevel' that increases as the user progresses through the screens. The corruptionLevel value is used to increase glitch intensity across screens.

## Style Guidelines:

- Primary color: Electric Blue (#7DF9FF) for a retro-futuristic arcade vibe.
- Background color: Dark charcoal (#222831) to emulate a darkened arcade setting.
- Accent color: Magenta (#FF00FF) for highlights and interactive elements, adding to the neon arcade aesthetic.
- Body and headline font: 'Space Grotesk', a sans-serif with a computerized, techy, scientific feel, used throughout to reinforce the arcade operating system theme.
- Utilize pixel-style icons to enhance the retro arcade aesthetic. Keep it minimal.
- Maintain a grid-based layout to mimic structured OS architecture. Introduce slight, controlled layout shifts as corruption increases to simulate system instability.
- Implement subtle animations, including RGB glitch text effects, flicker overlays, screen shakes, pixel break effects, corruption progress bar animation, loading animations, random opacity flickers, text scrambling, cursor size distortions, scanline overlays, and pixelation bursts to escalate the chaotic and humorous system corruption.