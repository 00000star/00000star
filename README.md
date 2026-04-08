# Nhaka

**Gamified, offline-first learning platform for ZIMSEC O-Level & A-Level students.**

*Nhaka* (Shona: "heritage/inheritance") is a mobile-first Progressive Web App designed for the Zimbabwean education market, aligned to the Heritage-Based Education 2024–2030 Curriculum. It transforms ZIMSEC past papers into interactive micro-lessons, timed mock exams, and AI-graded essays — optimized for low-end Android devices, intermittent connectivity, and battery constraints.

## Features

- **11 ZIMSEC subjects** — all 5 compulsory + 6 popular electives
- **Spaced Repetition** — SM-2 algorithm tracks wrong answers and resurfaces them at expanding intervals
- **Onboarding Flow** — subject selection, daily goal, exam countdown, notification setup
- **Leaderboards** — 4-tier league system (Bronze → Diamond) with school-based rankings
- **Push Notifications** — daily reminders, streak-at-risk alerts
- **KaTeX LaTeX Rendering** — crisp mathematical typography
- **Timed Mock Exams** — full ZIMSEC Paper 1 simulation
- **AI Essay Grader** — structural feedback for Humanities essays
- **SBP Portfolio Tracker** — Kanban board for School-Based Projects
- **Offline Data Manager** — module downloads with CRDT event sync
- **Payment Integration** — EcoCash, InnBucks, WhatsApp-to-Parent via Paynow

## Subjects

### Compulsory (every O-Level student)
| Subject | Code | Topics |
|---------|------|--------|
| Mathematics | 4004 | 12 nodes: Arithmetic → Vectors |
| English Language | 1122 | 5 nodes: Comprehension → Report Writing |
| Shona | 3159 | 4 nodes: Grammar → Comprehension |
| Combined Science | 5006 | 4 nodes: Living Things → Environment |
| Heritage Studies | 6081 | 5 nodes: Socialisation → Constitution |

### Electives
| Subject | Code | Topics |
|---------|------|--------|
| Physics | 5055 | 6 nodes: Measurement → Nuclear |
| Chemistry | 5071 | 6 nodes: Atomic Structure → Organic |
| Biology | 5007 | 5 nodes: Cell Biology → Ecology |
| History | 2167 | 4 nodes: Pre-Colonial → Regional |
| Geography | 2248 | 4 nodes: Map Work → Population |
| Accounting | 7112 | 3 nodes: Double Entry → Cash Book |

## Monetization

Payments via **Paynow Zimbabwe** (EcoCash, InnBucks, OneMoney, Visa/MC):
- Monthly: $2.99
- Per Term: $6.99
- Full Year: $14.99

Merchant EcoCash: `0785378845`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a mobile viewport.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (AMOLED dark theme)
- KaTeX for LaTeX rendering
- Paynow Node.js SDK for payments
- PWA with service worker

## Name

**Nhaka** — Shona for "heritage" or "inheritance." Connects directly to Zimbabwe's Heritage-Based Education Curriculum and represents the knowledge students inherit and build upon.
