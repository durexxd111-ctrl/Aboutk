---
name: WebGL ambient effects
description: Vanta/Three.js backgrounds must degrade gracefully when the preview browser has no WebGL context.
---

Feature-detect WebGL and wrap third-party ambient effect initialization in a try/catch so the CSS fallback remains the source of truth for rendering.

**Why:** The Replit preview browser can reject WebGL context creation, and an uncaught Vanta error can take down the entire React route instead of merely disabling the enhancement.

**How to apply:** Treat Vanta, Three.js, and similar effects as optional decoration; never let their initialization run without a fallback or error guard.