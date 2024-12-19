# Digital and Analog Clock

This project is a dynamic and interactive clock that lets you toggle between digital and analogue modes. Additionally, it includes a light/dark mode feature to enhance user experience. The clock is built with HTML, CSS, and JavaScript, demonstrating precise time calculations and smooth animations.

## Features

- **Digital and Analog Modes:** Easily switch between digital and analogue clock displays.
- **Light/Dark Mode:** Toggle between a light or dark theme for better usability.
- **Smooth Animations:** Ensures seamless transitions and accurate hand movements on the analogue clock.
- **Responsive Design:** Adapts beautifully to different screen sizes.

---

## The Challenge with the Second Hand

One of the most significant challenges in this project was handling the second-hand movement of the analog clock. Initially, the second hand would behave erratically, especially when transitioning past specific positions (e.g., at 12 o’clock or 3 o’clock). It would momentarily rotate in the opposite direction or skip forward unexpectedly, creating a visually jarring experience.

### Root Cause

The issue stemmed from the way CSS transitions and JavaScript rotations were calculated using degrees. When the second-hand rotation reset from `360deg` back to `0deg`, CSS interpreted this as a large backward motion, causing the erratic behaviour.

### The Solution

To address this, we implemented a mechanism that tracks the total degrees rotated and ensures a continuous rotation logic. Instead of resetting the rotation back to `0deg` each minute, we kept an accumulated degree value in JavaScript. This ensured that the rotation remained smooth, without abrupt changes or reversals.

The key improvement was the following logic:
```javascript
let totalSecondsDegrees = (seconds * 6) + (milliseconds / 1000) * 6;
secondHand.style.transform = `rotate(${totalSecondsDegrees}deg)`;
