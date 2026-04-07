# Ruzivo

**Gamified, offline-first learning platform for ZIMSEC O-Level & A-Level students.**

*Ruzivo* (Shona: "knowledge") is a mobile-first Progressive Web App designed for the Zimbabwean education market. It transforms static past papers into interactive micro-lessons, timed mock exams, and AI-graded essays — all optimized for low-end Android devices, intermittent connectivity, and battery constraints.

## Features

- **Adaptive Dashboard** — Daily streaks, XP tracking, and progress rings with O-Level/A-Level focus modes
- **Gamified Progression Tree** — Duolingo-style learning paths with locked/active/completed nodes
- **Interactive Micro-Lessons** — LaTeX-rendered STEM questions with instant feedback and XP rewards
- **Timed Mock Exams** — Full ZIMSEC exam simulations with countdown timer and flag-for-review
- **AI Essay Grader** — Structural feedback for Humanities essays (History, Divinity, English)
- **SBP Portfolio Tracker** — Kanban-style project management for the mandatory 20% continuous assessment
- **Offline Data Manager** — Module-level downloads with storage metering and CRDT-based event sync
- **WhatsApp-to-Parent Monetization** — Student requests upgrade, parent pays via EcoCash, webhook unlocks premium

## Architecture

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** with custom AMOLED-friendly dark theme
- **Offline-first** with event sourcing and local storage (CRDT-ready)
- **Device-aware** graceful degradation (RAM/battery detection)
- **PWA manifest** for installability on Android devices

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a mobile viewport.

## Project Structure

```
src/
  app/
    page.tsx              # Login/Splash screen
    dashboard/page.tsx    # Daily dashboard with streak & progress
    path/[subject]/       # Subject progression tree
    lesson/[nodeId]/      # Interactive micro-lesson engine
    exam/[examId]/        # Timed mock exam interface
    essay/page.tsx        # LLM essay grader
    sbp/page.tsx          # SBP portfolio builder
    offline/page.tsx      # Offline data & sync manager
    pay/page.tsx          # WhatsApp billing flow
  components/ui/          # Shared UI components
  lib/
    types.ts              # TypeScript type definitions
    mock-data.ts          # Seed data for all modules
    device.ts             # Hardware profiling (RAM, battery)
    store.ts              # Local storage & event sourcing
```

## Name

**Ruzivo** — from the Shona word for "knowledge." Authentic to Zimbabwe, easy to pronounce, and evocative of the platform's mission to democratize access to quality exam preparation.
