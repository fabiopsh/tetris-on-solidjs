# 🧱 Tetris on SolidJS

![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**A fully functional Tetris clone built from scratch in under 60 minutes.**

This project was created as a preparatory exercise for the **Advanced Programming** exam at the **University of Pisa** (MSc in Computer Science / ICT Solution Architect), taught by **Prof. Antonio Cisternino**.

The goal was not to create a polished product, but to challenge the capabilities of **SolidJS's fine-grained reactivity** and to test rapid prototyping skills under time constraints.

---

## ⚡ The Challenge: "1-Hour Sprint"

-  **Constraint:** ~1 Hour of coding time.
-  **Goal:** Implement core mechanics (Grid, Tetrominos, Gravity, Collision, Line Clearing).
-  **Stack:** SolidJS + TypeScript.

### Why SolidJS?

Unlike React, SolidJS does not use a Virtual DOM. Instead, it compiles its templates to real DOM nodes and updates them with fine-grained reactions. For a game loop like Tetris, this ensures high performance and direct state management without unnecessary re-renders.

## 🎮 Features Implemented

Despite the short timeframe, the core mechanics are operational:

-  ✅ **Game Loop:** Managed via `requestAnimationFrame` or `setInterval` for gravity.
-  ✅ **Collision Detection:** Wall kicks and floor collision logic.
-  ✅ **State Management:** Using SolidJS `Signals` and `Stores` for the grid and active piece.
-  ✅ **Rendering:** Reactive rendering of the 10x20 grid.

## 🚀 How to Run

This project uses [Vite](https://vitejs.dev/) for a lightning-fast development server.

### 1. Clone & Install

```bash
git clone [https://github.com/fabiopsh/tetris-on-solidjs.git](https://github.com/fabiopsh/tetris-on-solidjs.git)
cd tetris-on-solidjs
npm install
```

### 2. Run the Project

```bash
npm run dev
```

### 3. Build the Project

```bash
npm run build
```
