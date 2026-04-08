import type {
  User,
  Subject,
  Lesson,
  MockExam,
  SBPProject,
  OfflineModule,
} from "./types";

export const mockUser: User = {
  id: "u_001",
  phone: "+263771234567",
  name: "Tatenda",
  level: "O-Level",
  avatar: "T",
  xp: 2450,
  streak: 7,
  lastActiveDate: "2026-04-07",
  premium: false,
  deviceProfile: {
    ramGB: 3,
    batteryPct: 65,
    lowEnd: false,
    darkMode: true,
  },
  createdAt: "2026-01-15",
};

// ─── SUBJECTS ────────────────────────────────────────────────────────
// Heritage-Based Education 2024-2030 Curriculum
// 5 Compulsory: Mathematics (4004), English (1122), Indigenous Lang (3159/3155),
//               Combined Science (5006), Heritage Studies (6081)
// Electives: Physics (5055), Chemistry (5071), History (2167), Biology (5007),
//            Geography (2248), Accounting (7112), Commerce (7103), Economics (2283)

export const mockSubjects: Subject[] = [
  {
    id: "math-o",
    name: "Mathematics",
    level: "O-Level",
    icon: "📐",
    color: "#22c55e",
    progress: 0.35,
    nodes: [
      { id: "m1", title: "General Arithmetic", description: "Standard form, ratios, percentages, currency conversion", status: "completed", xpReward: 120, stars: 3, order: 1, lessonCount: 5, completedLessons: 5 },
      { id: "m2", title: "Sets", description: "Venn diagrams, union, intersection, complement", status: "completed", xpReward: 100, stars: 2, order: 2, lessonCount: 4, completedLessons: 4 },
      { id: "m3", title: "Algebraic Expressions", description: "Simplification, factorisation, expansion", status: "completed", xpReward: 150, stars: 3, order: 3, lessonCount: 6, completedLessons: 6 },
      { id: "m4", title: "Equations", description: "Linear, quadratic, simultaneous equations", status: "active", xpReward: 200, stars: 0, order: 4, lessonCount: 8, completedLessons: 3 },
      { id: "m5", title: "Inequalities & Sequences", description: "Linear inequalities, number patterns, nth term", status: "locked", xpReward: 150, stars: 0, order: 5, lessonCount: 5, completedLessons: 0 },
      { id: "m6", title: "Geometry", description: "Angles, polygons, circle theorems, similarity", status: "locked", xpReward: 250, stars: 0, order: 6, lessonCount: 10, completedLessons: 0 },
      { id: "m7", title: "Mensuration", description: "Area, volume, surface area of solids", status: "locked", xpReward: 200, stars: 0, order: 7, lessonCount: 6, completedLessons: 0 },
      { id: "m8", title: "Trigonometry", description: "Sine, cosine, tangent, bearings, 3D trig", status: "locked", xpReward: 300, stars: 0, order: 8, lessonCount: 8, completedLessons: 0 },
      { id: "m9", title: "Graphs & Coordinate Geometry", description: "Linear graphs, gradients, distance-time, speed-time", status: "locked", xpReward: 250, stars: 0, order: 9, lessonCount: 7, completedLessons: 0 },
      { id: "m10", title: "Statistics & Probability", description: "Mean, median, mode, histograms, tree diagrams", status: "locked", xpReward: 200, stars: 0, order: 10, lessonCount: 6, completedLessons: 0 },
      { id: "m11", title: "Matrices & Transformations", description: "Matrix operations, reflections, rotations, enlargements", status: "locked", xpReward: 250, stars: 0, order: 11, lessonCount: 7, completedLessons: 0 },
      { id: "m12", title: "Vectors", description: "Column vectors, position vectors, magnitude", status: "locked", xpReward: 200, stars: 0, order: 12, lessonCount: 5, completedLessons: 0 },
    ],
  },
  {
    id: "phys-o",
    name: "Physics",
    level: "O-Level",
    icon: "⚡",
    color: "#3b82f6",
    progress: 0.18,
    nodes: [
      { id: "p1", title: "Measurement & Units", description: "SI units, significant figures, scientific notation", status: "completed", xpReward: 100, stars: 3, order: 1, lessonCount: 4, completedLessons: 4 },
      { id: "p2", title: "Mechanics", description: "Speed, velocity, acceleration, Newton's laws, energy", status: "active", xpReward: 250, stars: 0, order: 2, lessonCount: 10, completedLessons: 3 },
      { id: "p3", title: "Thermal Physics", description: "Heat transfer, expansion, change of state", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 6, completedLessons: 0 },
      { id: "p4", title: "Waves & Optics", description: "Sound, light, reflection, refraction, EM spectrum", status: "locked", xpReward: 250, stars: 0, order: 4, lessonCount: 8, completedLessons: 0 },
      { id: "p5", title: "Electricity & Magnetism", description: "Circuits, Ohm's law, electromagnetism, motors", status: "locked", xpReward: 300, stars: 0, order: 5, lessonCount: 10, completedLessons: 0 },
      { id: "p6", title: "Atomic & Nuclear Physics", description: "Radioactivity, half-life, nuclear reactions", status: "locked", xpReward: 200, stars: 0, order: 6, lessonCount: 5, completedLessons: 0 },
    ],
  },
  {
    id: "chem-o",
    name: "Chemistry",
    level: "O-Level",
    icon: "🧪",
    color: "#a855f7",
    progress: 0.08,
    nodes: [
      { id: "c1", title: "Atomic Structure & Periodic Table", description: "Protons, neutrons, electrons, groups, periods", status: "completed", xpReward: 120, stars: 2, order: 1, lessonCount: 5, completedLessons: 5 },
      { id: "c2", title: "Chemical Bonding", description: "Ionic, covalent, metallic bonds, structures", status: "active", xpReward: 150, stars: 0, order: 2, lessonCount: 6, completedLessons: 1 },
      { id: "c3", title: "Stoichiometry", description: "Moles, formulae, equations, reacting masses", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 7, completedLessons: 0 },
      { id: "c4", title: "Acids, Bases & Salts", description: "pH, neutralisation, salt preparation", status: "locked", xpReward: 200, stars: 0, order: 4, lessonCount: 6, completedLessons: 0 },
      { id: "c5", title: "Metals & Reactivity", description: "Reactivity series, extraction, corrosion", status: "locked", xpReward: 250, stars: 0, order: 5, lessonCount: 6, completedLessons: 0 },
      { id: "c6", title: "Organic Chemistry", description: "Alkanes, alkenes, alcohols, polymers", status: "locked", xpReward: 250, stars: 0, order: 6, lessonCount: 7, completedLessons: 0 },
    ],
  },
  {
    id: "hist-o",
    name: "History",
    level: "O-Level",
    icon: "📜",
    color: "#f59e0b",
    progress: 0.25,
    nodes: [
      { id: "h1", title: "Pre-Colonial States", description: "Great Zimbabwe, Mutapa, Rozvi, Ndebele states", status: "completed", xpReward: 150, stars: 2, order: 1, lessonCount: 6, completedLessons: 6 },
      { id: "h2", title: "Colonial Occupation", description: "BSAC, Pioneer Column, Chimurenga, land dispossession", status: "active", xpReward: 200, stars: 0, order: 2, lessonCount: 8, completedLessons: 3 },
      { id: "h3", title: "African Nationalism", description: "ANC, ZAPU, ZANU, liberation struggle", status: "locked", xpReward: 250, stars: 0, order: 3, lessonCount: 8, completedLessons: 0 },
      { id: "h4", title: "Regional History", description: "Apartheid South Africa, Mozambique, Zambia", status: "locked", xpReward: 200, stars: 0, order: 4, lessonCount: 6, completedLessons: 0 },
    ],
  },
  {
    id: "heri-o",
    name: "Heritage Studies",
    level: "O-Level",
    icon: "🏛️",
    color: "#ef4444",
    progress: 0.0,
    nodes: [
      { id: "he1", title: "Socialisation", description: "Agents of socialisation, ICTs, media influence", status: "active", xpReward: 100, stars: 0, order: 1, lessonCount: 4, completedLessons: 0 },
      { id: "he2", title: "Identity & Citizenship", description: "National identity documents, dual citizenship", status: "locked", xpReward: 120, stars: 0, order: 2, lessonCount: 5, completedLessons: 0 },
      { id: "he3", title: "Cultural Heritage", description: "Norms, values, ubuntu, unhu philosophy", status: "locked", xpReward: 150, stars: 0, order: 3, lessonCount: 5, completedLessons: 0 },
      { id: "he4", title: "National Symbols & Monuments", description: "Flag, coat of arms, Great Zimbabwe, Heroes Acre", status: "locked", xpReward: 150, stars: 0, order: 4, lessonCount: 5, completedLessons: 0 },
      { id: "he5", title: "Constitution & Governance", description: "Arms of government, Bill of Rights, devolution", status: "locked", xpReward: 200, stars: 0, order: 5, lessonCount: 6, completedLessons: 0 },
    ],
  },
  // ─── COMPULSORY: Combined Science (5006) ───────────────────────────
  {
    id: "csci-o",
    name: "Combined Science",
    level: "O-Level",
    icon: "🔬",
    color: "#06b6d4",
    progress: 0.0,
    nodes: [
      { id: "cs1", title: "Living Things", description: "Cells, classification, nutrition, respiration", status: "active", xpReward: 120, stars: 0, order: 1, lessonCount: 6, completedLessons: 0 },
      { id: "cs2", title: "Matter & Materials", description: "Elements, compounds, mixtures, separation", status: "locked", xpReward: 150, stars: 0, order: 2, lessonCount: 6, completedLessons: 0 },
      { id: "cs3", title: "Energy & Forces", description: "Electricity, magnetism, forces, motion", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 8, completedLessons: 0 },
      { id: "cs4", title: "Earth & Environment", description: "Water cycle, pollution, conservation, soil", status: "locked", xpReward: 150, stars: 0, order: 4, lessonCount: 5, completedLessons: 0 },
    ],
  },
  // ─── COMPULSORY: English Language (1122) ────────────────────────────
  {
    id: "eng-o",
    name: "English Language",
    level: "O-Level",
    icon: "📖",
    color: "#f472b6",
    progress: 0.0,
    nodes: [
      { id: "en1", title: "Comprehension", description: "Reading passages, inference, vocabulary in context", status: "active", xpReward: 120, stars: 0, order: 1, lessonCount: 6, completedLessons: 0 },
      { id: "en2", title: "Summary Writing", description: "Identifying key points, concise writing", status: "locked", xpReward: 150, stars: 0, order: 2, lessonCount: 5, completedLessons: 0 },
      { id: "en3", title: "Grammar & Usage", description: "Tenses, articles, prepositions, sentence structure", status: "locked", xpReward: 150, stars: 0, order: 3, lessonCount: 8, completedLessons: 0 },
      { id: "en4", title: "Composition", description: "Narrative, descriptive, argumentative essays", status: "locked", xpReward: 200, stars: 0, order: 4, lessonCount: 6, completedLessons: 0 },
      { id: "en5", title: "Letter & Report Writing", description: "Formal/informal letters, report format", status: "locked", xpReward: 150, stars: 0, order: 5, lessonCount: 5, completedLessons: 0 },
    ],
  },
  // ─── COMPULSORY: Shona (3159) ──────────────────────────────────────
  {
    id: "shona-o",
    name: "Shona",
    level: "O-Level",
    icon: "🗣️",
    color: "#84cc16",
    progress: 0.0,
    nodes: [
      { id: "sh1", title: "Dudziramutauro", description: "Grammar: mazwi, chirevo, mitsara", status: "active", xpReward: 100, stars: 0, order: 1, lessonCount: 6, completedLessons: 0 },
      { id: "sh2", title: "Zvirungamutauro", description: "Idioms, proverbs, figurative language", status: "locked", xpReward: 150, stars: 0, order: 2, lessonCount: 5, completedLessons: 0 },
      { id: "sh3", title: "Rondedzero", description: "Composition: narrative, descriptive, dialogue", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 6, completedLessons: 0 },
      { id: "sh4", title: "Kunzwisisa", description: "Comprehension: reading passages, questions", status: "locked", xpReward: 150, stars: 0, order: 4, lessonCount: 5, completedLessons: 0 },
    ],
  },
  // ─── ELECTIVE: Biology (5007) ──────────────────────────────────────
  {
    id: "bio-o",
    name: "Biology",
    level: "O-Level",
    icon: "🧬",
    color: "#10b981",
    progress: 0.0,
    nodes: [
      { id: "bi1", title: "Cell Biology", description: "Cell structure, organelles, microscopy", status: "active", xpReward: 120, stars: 0, order: 1, lessonCount: 5, completedLessons: 0 },
      { id: "bi2", title: "Nutrition", description: "Food groups, enzymes, digestion, photosynthesis", status: "locked", xpReward: 200, stars: 0, order: 2, lessonCount: 8, completedLessons: 0 },
      { id: "bi3", title: "Transport", description: "Blood, heart, circulation, transpiration", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 7, completedLessons: 0 },
      { id: "bi4", title: "Reproduction", description: "Human reproduction, plant reproduction, genetics", status: "locked", xpReward: 250, stars: 0, order: 4, lessonCount: 8, completedLessons: 0 },
      { id: "bi5", title: "Ecology", description: "Ecosystems, food chains, conservation", status: "locked", xpReward: 200, stars: 0, order: 5, lessonCount: 6, completedLessons: 0 },
    ],
  },
  // ─── ELECTIVE: Geography (2248) ────────────────────────────────────
  {
    id: "geo-o",
    name: "Geography",
    level: "O-Level",
    icon: "🌍",
    color: "#0ea5e9",
    progress: 0.0,
    nodes: [
      { id: "ge1", title: "Map Work", description: "Scale, contours, grid references, cross-sections", status: "active", xpReward: 150, stars: 0, order: 1, lessonCount: 6, completedLessons: 0 },
      { id: "ge2", title: "Weathering & Landforms", description: "Erosion, rivers, volcanoes, earthquakes", status: "locked", xpReward: 200, stars: 0, order: 2, lessonCount: 7, completedLessons: 0 },
      { id: "ge3", title: "Weather & Climate", description: "Atmosphere, rainfall, climate zones of Zimbabwe", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 6, completedLessons: 0 },
      { id: "ge4", title: "Population & Settlement", description: "Migration, urbanisation, rural-urban contrasts", status: "locked", xpReward: 200, stars: 0, order: 4, lessonCount: 6, completedLessons: 0 },
    ],
  },
  // ─── ELECTIVE: Accounting (7112) ───────────────────────────────────
  {
    id: "acc-o",
    name: "Accounting",
    level: "O-Level",
    icon: "📊",
    color: "#f97316",
    progress: 0.0,
    nodes: [
      { id: "ac1", title: "Double Entry", description: "Debits, credits, T-accounts, trial balance", status: "active", xpReward: 120, stars: 0, order: 1, lessonCount: 6, completedLessons: 0 },
      { id: "ac2", title: "Final Accounts", description: "Trading, profit & loss, balance sheet", status: "locked", xpReward: 250, stars: 0, order: 2, lessonCount: 8, completedLessons: 0 },
      { id: "ac3", title: "Cash Book & Bank Rec", description: "Cash book, bank reconciliation statements", status: "locked", xpReward: 200, stars: 0, order: 3, lessonCount: 6, completedLessons: 0 },
    ],
  },
];

// ─── LESSONS (keyed by node ID) ──────────────────────────────────────
// Based on actual ZIMSEC 4004 O-Level Mathematics past papers (2017–2024),
// 4023 Physics, 4024 Chemistry, 2167/6081 History & Heritage Studies

export const mockLessons: Record<string, Lesson[]> = {
  // ─── MATH: General Arithmetic (m1) ─────────────────────────────────
  m1: [
    { id: "m1_01", nodeId: "m1", title: "Standard Form (2024 P1)", questionText: "Express 0.000 372 in standard form.", options: [{ text: "3.72 × 10⁻⁴", latex: "3.72 \\times 10^{-4}" }, { text: "37.2 × 10⁻⁵", latex: "37.2 \\times 10^{-5}" }, { text: "3.72 × 10⁻³", latex: "3.72 \\times 10^{-3}" }, { text: "0.372 × 10⁻³", latex: "0.372 \\times 10^{-3}" }], correctIndex: 0, explanation: "Move the decimal 4 places right to get 3.72, so the answer is 3.72 × 10⁻⁴.", xpReward: 20 },
    { id: "m1_02", nodeId: "m1", title: "Ratio (2022 P1)", questionText: "Divide $240 in the ratio 3:5. What is the larger share?", options: [{ text: "$150" }, { text: "$90" }, { text: "$160" }, { text: "$120" }], correctIndex: 0, explanation: "Total parts = 3 + 5 = 8. Larger share = (5/8) × 240 = $150.", xpReward: 20 },
    { id: "m1_03", nodeId: "m1", title: "Percentage Increase (2023 P1)", questionText: "A shirt costs $25. After a 12% increase, what is the new price?", options: [{ text: "$28.00" }, { text: "$27.00" }, { text: "$28.50" }, { text: "$37.00" }], correctIndex: 0, explanation: "Increase = 12% of 25 = $3. New price = 25 + 3 = $28.", xpReward: 20 },
    { id: "m1_04", nodeId: "m1", title: "Currency Conversion (2024 P1)", questionText: "The exchange rate is 1 USD = 6 500 ZWL. Convert 325 000 ZWL to USD.", options: [{ text: "$50" }, { text: "$45" }, { text: "$55" }, { text: "$500" }], correctIndex: 0, explanation: "325 000 ÷ 6 500 = $50 USD.", xpReward: 25 },
    { id: "m1_05", nodeId: "m1", title: "Simple Interest (2019 P1)", questionText: "Calculate the simple interest on $800 at 5% per annum for 3 years.", options: [{ text: "$120" }, { text: "$40" }, { text: "$140" }, { text: "$1200" }], correctIndex: 0, explanation: "SI = PRT/100 = (800 × 5 × 3)/100 = $120.", xpReward: 25 },
  ],

  // ─── MATH: Sets (m2) ───────────────────────────────────────────────
  m2: [
    { id: "m2_01", nodeId: "m2", title: "Venn Diagrams (2023 P1)", questionText: "In a class of 40 students, 25 play soccer, 18 play cricket, and 8 play both. How many play neither?", options: [{ text: "5" }, { text: "3" }, { text: "8" }, { text: "10" }], correctIndex: 0, explanation: "Using inclusion-exclusion: 25 + 18 - 8 = 35 play at least one. Neither = 40 - 35 = 5.", xpReward: 25 },
    { id: "m2_02", nodeId: "m2", title: "Set Notation (2022 P1)", questionText: "If A = {1, 2, 3, 4, 5} and B = {3, 4, 5, 6, 7}, find n(A ∪ B).", options: [{ text: "7" }, { text: "10" }, { text: "5" }, { text: "3" }], correctIndex: 0, explanation: "A ∪ B = {1, 2, 3, 4, 5, 6, 7}, so n(A ∪ B) = 7.", xpReward: 20 },
    { id: "m2_03", nodeId: "m2", title: "Complement (2021 P1)", questionText: "Given ε = {1,2,...,10}, A = {2,4,6,8}, find n(A').", options: [{ text: "6" }, { text: "4" }, { text: "5" }, { text: "10" }], correctIndex: 0, explanation: "A' = {1, 3, 5, 7, 9, 10}, so n(A') = 6.", xpReward: 20 },
  ],

  // ─── MATH: Algebraic Expressions (m3) ──────────────────────────────
  m3: [
    { id: "m3_01", nodeId: "m3", title: "Factorisation (2024 P1)", questionText: "Factorise completely:", questionLatex: "2x^2 - 8", options: [{ text: "2(x+2)(x-2)", latex: "2(x+2)(x-2)" }, { text: "2(x²-4)", latex: "2(x^2-4)" }, { text: "(2x+4)(x-2)", latex: "(2x+4)(x-2)" }, { text: "2(x-2)²", latex: "2(x-2)^2" }], correctIndex: 0, explanation: "2x² - 8 = 2(x² - 4) = 2(x+2)(x-2) using the difference of two squares.", xpReward: 25 },
    { id: "m3_02", nodeId: "m3", title: "Simplification (2023 P1)", questionText: "Simplify:", questionLatex: "\\frac{3x^2 - 12}{x - 2}", options: [{ text: "3(x+2)", latex: "3(x+2)" }, { text: "3x - 6", latex: "3x-6" }, { text: "3(x-2)", latex: "3(x-2)" }, { text: "x+2", latex: "x+2" }], correctIndex: 0, explanation: "3x² - 12 = 3(x² - 4) = 3(x+2)(x-2). Dividing by (x-2) gives 3(x+2).", xpReward: 30 },
    { id: "m3_03", nodeId: "m3", title: "Expansion (2022 P1)", questionText: "Expand and simplify:", questionLatex: "(2x + 3)(x - 4)", options: [{ text: "2x² - 5x - 12", latex: "2x^2 - 5x - 12" }, { text: "2x² + 5x - 12", latex: "2x^2 + 5x - 12" }, { text: "2x² - 5x + 12", latex: "2x^2 - 5x + 12" }, { text: "2x² - 11x - 12", latex: "2x^2 - 11x - 12" }], correctIndex: 0, explanation: "(2x+3)(x-4) = 2x² - 8x + 3x - 12 = 2x² - 5x - 12.", xpReward: 25 },
  ],

  // ─── MATH: Equations (m4) — active node ────────────────────────────
  m4: [
    { id: "m4_01", nodeId: "m4", title: "Quadratic by Factoring (2024 P1)", questionText: "Solve for x:", questionLatex: "x^2 + 5x + 6 = 0", options: [{ text: "x = -2 or x = -3", latex: "x = -2 \\text{ or } x = -3" }, { text: "x = 2 or x = 3", latex: "x = 2 \\text{ or } x = 3" }, { text: "x = -1 or x = -6", latex: "x = -1 \\text{ or } x = -6" }, { text: "x = 1 or x = 6", latex: "x = 1 \\text{ or } x = 6" }], correctIndex: 0, explanation: "x² + 5x + 6 = (x + 2)(x + 3) = 0, so x = -2 or x = -3.", xpReward: 25 },
    { id: "m4_02", nodeId: "m4", title: "Quadratic Formula (2023 P1)", questionText: "Use the quadratic formula to solve:", questionLatex: "2x^2 - 7x + 3 = 0", options: [{ text: "x = 3 or x = ½", latex: "x = 3 \\text{ or } x = \\frac{1}{2}" }, { text: "x = -3 or x = -½", latex: "x = -3 \\text{ or } x = -\\frac{1}{2}" }, { text: "x = 7 or x = 3" }, { text: "x = 1 or x = 1.5" }], correctIndex: 0, explanation: "Using x = (-b ± √(b²-4ac))/2a: x = (7 ± √(49-24))/4 = (7 ± 5)/4, giving x = 3 or x = ½.", xpReward: 30 },
    { id: "m4_03", nodeId: "m4", title: "Completing the Square (2022 P1)", questionText: "Express in the form (x + a)² + b:", questionLatex: "x^2 + 6x + 2", options: [{ text: "(x+3)² - 7", latex: "(x+3)^2 - 7" }, { text: "(x+3)² + 7", latex: "(x+3)^2 + 7" }, { text: "(x+6)² - 34", latex: "(x+6)^2 - 34" }, { text: "(x+2)² - 2", latex: "(x+2)^2 - 2" }], correctIndex: 0, explanation: "Half of 6 is 3. (x+3)² = x²+6x+9. So x²+6x+2 = (x+3)² - 9 + 2 = (x+3)² - 7.", xpReward: 30 },
    { id: "m4_04", nodeId: "m4", title: "Simultaneous Equations (2024 P1)", questionText: "Solve the simultaneous equations:", questionLatex: "2x + y = 7 \\quad \\text{and} \\quad x - y = 2", options: [{ text: "x = 3, y = 1" }, { text: "x = 2, y = 3" }, { text: "x = 4, y = -1" }, { text: "x = 1, y = 5" }], correctIndex: 0, explanation: "Adding the equations: 3x = 9, so x = 3. Substituting: y = 7 - 2(3) = 1.", xpReward: 25 },
    { id: "m4_05", nodeId: "m4", title: "Linear Equation (2019 P1)", questionText: "Solve:", questionLatex: "\\frac{3x - 1}{4} = 5", options: [{ text: "x = 7", latex: "x = 7" }, { text: "x = 3", latex: "x = 3" }, { text: "x = 21", latex: "x = 21" }, { text: "x = 19/3", latex: "x = \\frac{19}{3}" }], correctIndex: 0, explanation: "Multiply both sides by 4: 3x - 1 = 20. Then 3x = 21, so x = 7.", xpReward: 20 },
    { id: "m4_06", nodeId: "m4", title: "Subject of Formula (2023 P2)", questionText: "Make r the subject:", questionLatex: "V = \\frac{4}{3}\\pi r^3", options: [{ text: "r = ∛(3V/4π)", latex: "r = \\sqrt[3]{\\frac{3V}{4\\pi}}" }, { text: "r = 3V/4π" }, { text: "r = √(3V/4π)" }, { text: "r = (4πV/3)^⅓" }], correctIndex: 0, explanation: "Rearranging: r³ = 3V/(4π), so r = ∛(3V/(4π)).", xpReward: 35 },
  ],

  // ─── PHYSICS: Measurement (p1) ─────────────────────────────────────
  p1: [
    { id: "p1_01", nodeId: "p1", title: "SI Units (2023 P1)", questionText: "Which is the SI unit of force?", options: [{ text: "Newton (N)" }, { text: "Joule (J)" }, { text: "Pascal (Pa)" }, { text: "Watt (W)" }], correctIndex: 0, explanation: "The Newton is the SI unit of force. 1 N = 1 kg⋅m/s².", xpReward: 15 },
    { id: "p1_02", nodeId: "p1", title: "Significant Figures (2022 P1)", questionText: "Round 0.03467 to 2 significant figures.", options: [{ text: "0.035" }, { text: "0.034" }, { text: "0.03" }, { text: "0.0347" }], correctIndex: 0, explanation: "Leading zeros are not significant. The first two significant figures are 3 and 4. The next digit (6) rounds up: 0.035.", xpReward: 15 },
  ],

  // ─── PHYSICS: Mechanics (p2) ───────────────────────────────────────
  p2: [
    { id: "p2_01", nodeId: "p2", title: "Newton's Second Law (2024 P1)", questionText: "A 5 kg object accelerates at 3 m/s². What is the net force acting on it?", options: [{ text: "15 N" }, { text: "8 N" }, { text: "1.67 N" }, { text: "150 N" }], correctIndex: 0, explanation: "F = ma = 5 kg × 3 m/s² = 15 N.", xpReward: 20 },
    { id: "p2_02", nodeId: "p2", title: "Kinetic Energy (2023 P1)", questionText: "Calculate the kinetic energy of a 4 kg mass moving at 6 m/s.", questionLatex: "E_k = \\frac{1}{2}mv^2", options: [{ text: "72 J" }, { text: "12 J" }, { text: "48 J" }, { text: "144 J" }], correctIndex: 0, explanation: "Eₖ = ½ × 4 × 6² = ½ × 4 × 36 = 72 J.", xpReward: 25 },
    { id: "p2_03", nodeId: "p2", title: "Speed-Distance-Time (2022 P1)", questionText: "A car travels 150 km in 2.5 hours. Calculate its average speed.", options: [{ text: "60 km/h" }, { text: "75 km/h" }, { text: "50 km/h" }, { text: "37.5 km/h" }], correctIndex: 0, explanation: "Speed = distance/time = 150/2.5 = 60 km/h.", xpReward: 20 },
    { id: "p2_04", nodeId: "p2", title: "Gravitational PE (2024 P1)", questionText: "Calculate the gravitational potential energy of a 2 kg object at 10 m height. (g = 10 m/s²)", questionLatex: "E_p = mgh", options: [{ text: "200 J" }, { text: "20 J" }, { text: "100 J" }, { text: "2000 J" }], correctIndex: 0, explanation: "Ep = mgh = 2 × 10 × 10 = 200 J.", xpReward: 20 },
    { id: "p2_05", nodeId: "p2", title: "Momentum (2023 P2)", questionText: "A 0.5 kg ball moves at 8 m/s. What is its momentum?", questionLatex: "p = mv", options: [{ text: "4 kg⋅m/s" }, { text: "16 kg⋅m/s" }, { text: "0.0625 kg⋅m/s" }, { text: "4.5 kg⋅m/s" }], correctIndex: 0, explanation: "p = mv = 0.5 × 8 = 4 kg⋅m/s.", xpReward: 20 },
    { id: "p2_06", nodeId: "p2", title: "Pressure (2019 P1)", questionText: "A force of 600 N acts on an area of 0.02 m². Calculate the pressure.", questionLatex: "P = \\frac{F}{A}", options: [{ text: "30 000 Pa" }, { text: "12 Pa" }, { text: "300 Pa" }, { text: "3 000 Pa" }], correctIndex: 0, explanation: "P = F/A = 600/0.02 = 30 000 Pa.", xpReward: 25 },
  ],

  // ─── CHEMISTRY: Atomic Structure (c1) ──────────────────────────────
  c1: [
    { id: "c1_01", nodeId: "c1", title: "Atomic Number (2024 P1)", questionText: "The atomic number of an element tells you the number of:", options: [{ text: "protons in the nucleus" }, { text: "protons and neutrons" }, { text: "electrons in the outer shell" }, { text: "neutrons only" }], correctIndex: 0, explanation: "The atomic number (Z) equals the number of protons, which defines the element.", xpReward: 15 },
    { id: "c1_02", nodeId: "c1", title: "Isotopes (2023 P1)", questionText: "Isotopes of the same element have:", options: [{ text: "same protons, different neutrons" }, { text: "same neutrons, different protons" }, { text: "same mass number" }, { text: "different atomic numbers" }], correctIndex: 0, explanation: "Isotopes have the same number of protons (same element) but different numbers of neutrons (different mass numbers).", xpReward: 15 },
    { id: "c1_03", nodeId: "c1", title: "Electron Configuration (2022 P1)", questionText: "What is the electron configuration of sodium (Na, Z=11)?", options: [{ text: "2, 8, 1" }, { text: "2, 8, 2" }, { text: "2, 1, 8" }, { text: "2, 9" }], correctIndex: 0, explanation: "Na has 11 electrons arranged as 2 in the first shell, 8 in the second, 1 in the third: 2, 8, 1.", xpReward: 20 },
    { id: "c1_04", nodeId: "c1", title: "Periodic Table Groups (2024 P1)", questionText: "Elements in Group 1 of the periodic table are called:", options: [{ text: "Alkali metals" }, { text: "Halogens" }, { text: "Noble gases" }, { text: "Transition metals" }], correctIndex: 0, explanation: "Group 1 elements (Li, Na, K, etc.) are the alkali metals — they are soft, reactive metals that form +1 ions.", xpReward: 15 },
  ],

  // ─── CHEMISTRY: Chemical Bonding (c2) ──────────────────────────────
  c2: [
    { id: "c2_01", nodeId: "c2", title: "Ionic Bonding (2023 P1)", questionText: "Ionic bonds are formed by:", options: [{ text: "transfer of electrons from metal to non-metal" }, { text: "sharing of electrons between non-metals" }, { text: "delocalised electrons in metals" }, { text: "weak intermolecular forces" }], correctIndex: 0, explanation: "In ionic bonding, a metal atom transfers one or more electrons to a non-metal atom, forming positive and negative ions that attract each other.", xpReward: 20 },
    { id: "c2_02", nodeId: "c2", title: "Covalent Bonding (2022 P1)", questionText: "How many covalent bonds does a carbon atom typically form?", options: [{ text: "4" }, { text: "2" }, { text: "3" }, { text: "1" }], correctIndex: 0, explanation: "Carbon has 4 electrons in its outer shell and needs 4 more to complete it, so it forms 4 covalent bonds.", xpReward: 20 },
  ],

  // ─── HISTORY: Pre-Colonial States (h1) ─────────────────────────────
  h1: [
    { id: "h1_01", nodeId: "h1", title: "Great Zimbabwe (2024 P1)", questionText: "Great Zimbabwe was the capital of which state?", options: [{ text: "The Kingdom of Zimbabwe (Rozwi/Great Zimbabwe state)" }, { text: "The Mutapa Empire" }, { text: "The Ndebele Kingdom" }, { text: "The Rozvi Empire" }], correctIndex: 0, explanation: "Great Zimbabwe (c. 1100–1450 AD) was the capital of the Kingdom of Zimbabwe, a medieval Shona state known for its stone architecture.", xpReward: 20 },
    { id: "h1_02", nodeId: "h1", title: "Mutapa Empire (2023 P1)", questionText: "The title 'Mwene Mutapa' means:", options: [{ text: "Master of conquered lands / Great Plunderer" }, { text: "King of kings" }, { text: "Chief of the Shona" }, { text: "Builder of stone walls" }], correctIndex: 0, explanation: "Mwene Mutapa translates roughly to 'master of conquered lands' or 'great plunderer,' reflecting the empire's expansion through conquest.", xpReward: 20 },
    { id: "h1_03", nodeId: "h1", title: "Trade Networks (2022 P2)", questionText: "Which port was the main trading outlet for the Mutapa state?", options: [{ text: "Sofala" }, { text: "Kilwa" }, { text: "Mombasa" }, { text: "Maputo" }], correctIndex: 0, explanation: "Sofala (in modern Mozambique) was the key Indian Ocean port through which gold, ivory, and other goods from the Mutapa interior were traded.", xpReward: 25 },
  ],

  // ─── HISTORY: Colonial Occupation (h2) ─────────────────────────────
  h2: [
    { id: "h2_01", nodeId: "h2", title: "BSAC Royal Charter (2024 P1)", questionText: "In what year was the British South Africa Company granted a Royal Charter?", options: [{ text: "1889" }, { text: "1890" }, { text: "1895" }, { text: "1888" }], correctIndex: 0, explanation: "The BSAC was granted a Royal Charter by Queen Victoria on 29 October 1889, giving Cecil Rhodes authority to colonise territory north of the Limpopo.", xpReward: 20 },
    { id: "h2_02", nodeId: "h2", title: "Pioneer Column (2023 P1)", questionText: "The Pioneer Column arrived and raised the Union Jack at Fort Salisbury on 12 September of which year?", options: [{ text: "1890" }, { text: "1889" }, { text: "1893" }, { text: "1896" }], correctIndex: 0, explanation: "The Pioneer Column, approximately 200 settlers and 500 BSAC police, hoisted the flag at Fort Salisbury (now Harare) on 12 September 1890.", xpReward: 20 },
    { id: "h2_03", nodeId: "h2", title: "First Chimurenga (2022 P1)", questionText: "The First Chimurenga (1896–97) was a rising against colonial rule led partly by:", options: [{ text: "Spirit mediums Nehanda and Kaguvi" }, { text: "Cecil Rhodes" }, { text: "King Lobengula" }, { text: "Herbert Chitepo" }], correctIndex: 0, explanation: "The First Chimurenga was inspired and led in part by the spirit mediums Mbuya Nehanda and Sekuru Kaguvi, who rallied the Shona against BSAC rule.", xpReward: 25 },
    { id: "h2_04", nodeId: "h2", title: "Land Apportionment Act (2019 P1)", questionText: "The Land Apportionment Act of 1930 was significant because it:", options: [{ text: "legally divided land between Europeans and Africans, with the best land reserved for whites" }, { text: "gave Africans the right to own land anywhere" }, { text: "abolished tribal trust lands" }, { text: "ended the settler economy" }], correctIndex: 0, explanation: "The 1930 Land Apportionment Act formally segregated land: 51% for Europeans (about 50,000 people), 30% for Africans (over 1 million), entrenching dispossession.", xpReward: 25 },
    { id: "h2_05", nodeId: "h2", title: "Forced Labour (2017 P1)", questionText: "Which system forced Africans to pay money to the colonial government, pushing them into wage labour?", options: [{ text: "Hut Tax and Poll Tax" }, { text: "Income Tax" }, { text: "The Pass Laws" }, { text: "The Masters and Servants Act" }], correctIndex: 0, explanation: "The Hut Tax (1894) and Poll Tax forced Africans to earn cash by working on European farms and mines, disrupting subsistence agriculture.", xpReward: 20 },
  ],

  // ─── HERITAGE STUDIES: Socialisation (he1) ─────────────────────────
  he1: [
    { id: "he1_01", nodeId: "he1", title: "Agents of Socialisation (2024 P1)", questionText: "Which of the following is a primary agent of socialisation?", options: [{ text: "The family" }, { text: "The media" }, { text: "Religious institutions" }, { text: "Peer groups" }], correctIndex: 0, explanation: "The family is the primary agent of socialisation — it provides the first and most influential setting for learning language, values, and cultural norms.", xpReward: 15 },
    { id: "he1_02", nodeId: "he1", title: "Role of Media (2023 P1)", questionText: "One negative effect of social media on socialisation is:", options: [{ text: "Exposure to inappropriate content and cyberbullying" }, { text: "Faster communication with family" }, { text: "Access to educational resources" }, { text: "Learning about different cultures" }], correctIndex: 0, explanation: "While social media has benefits, it can expose young people to cyberbullying, misinformation, and inappropriate content that undermines positive socialisation.", xpReward: 15 },
  ],
};

// ─── MOCK EXAM ───────────────────────────────────────────────────────
// Based on actual ZIMSEC 4004 Mathematics Paper 1 format (2024/2023)

export const mockExam: MockExam = {
  id: "exam_math_2024_p1",
  subjectId: "math-o",
  title: "Mathematics Paper 1 — 2024",
  year: 2024,
  paper: 1,
  durationMinutes: 150,
  questions: [
    { id: "eq1", questionNumber: 1, text: "Express 0.000 047 2 in standard form.", options: ["4.72 × 10⁻⁵", "4.72 × 10⁻⁴", "47.2 × 10⁻⁶", "0.472 × 10⁻⁴"], correctIndex: 0, marks: 2 },
    { id: "eq2", questionNumber: 2, text: "Simplify the expression:", latex: "\\frac{2x^2 - 8}{x - 2}", options: ["2(x + 2)", "2x + 4", "2(x - 2)", "x² − 4"], correctIndex: 0, marks: 3 },
    { id: "eq3", questionNumber: 3, text: "Solve the simultaneous equations:", latex: "3x + 2y = 12 \\quad \\text{and} \\quad x - y = 1", options: ["x = 2.8, y = 1.8", "x = 3, y = 2", "x = 4, y = 0", "x = 2, y = 3"], correctIndex: 0, marks: 4 },
    { id: "eq4", questionNumber: 4, text: "A triangle has vertices at A(1,2), B(5,2), and C(3,6). Find the area of triangle ABC.", options: ["8 sq units", "10 sq units", "12 sq units", "6 sq units"], correctIndex: 0, marks: 4, diagramSvg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="30,120 170,120 100,20" fill="none" stroke="currentColor" stroke-width="2"/><text x="20" y="135" fill="currentColor" font-size="12">A(1,2)</text><text x="150" y="135" fill="currentColor" font-size="12">B(5,2)</text><text x="85" y="15" fill="currentColor" font-size="12">C(3,6)</text></svg>` },
    { id: "eq5", questionNumber: 5, text: "The bearing of town B from town A is 065°. What is the bearing of A from B?", options: ["245°", "295°", "115°", "155°"], correctIndex: 0, marks: 2 },
    { id: "eq6", questionNumber: 6, text: "Convert 325 000 ZWL to USD if the exchange rate is 1 USD = 6 500 ZWL.", options: ["$50", "$45", "$55", "$40"], correctIndex: 0, marks: 2 },
    { id: "eq7", questionNumber: 7, text: "In a class of 40 students, 25 study History, 22 study Geography and 8 study both. How many study neither?", options: ["1", "5", "8", "3"], correctIndex: 0, marks: 3 },
    { id: "eq8", questionNumber: 8, text: "Calculate the volume of a cylinder with radius 7 cm and height 10 cm.", latex: "V = \\pi r^2 h", options: ["1 540 cm³", "440 cm³", "154 cm³", "4 400 cm³"], correctIndex: 0, marks: 3 },
    { id: "eq9", questionNumber: 9, text: "Solve:", latex: "x^2 - 5x + 6 = 0", options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"], correctIndex: 0, marks: 3 },
    { id: "eq10", questionNumber: 10, text: "The probability that it rains on any day in Harare in December is 0.7. What is the probability that it does NOT rain on a given day?", options: ["0.3", "0.7", "1.7", "0.07"], correctIndex: 0, marks: 2 },
    { id: "eq11", questionNumber: 11, text: "Find the gradient of the line passing through points (2, 5) and (6, 13).", latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}", options: ["2", "4", "8", "0.5"], correctIndex: 0, marks: 2 },
    { id: "eq12", questionNumber: 12, text: "A car depreciates from $12 000 to $9 000 in one year. What is the percentage depreciation?", options: ["25%", "33.3%", "75%", "30%"], correctIndex: 0, marks: 2 },
  ],
};

// ─── SBP PROJECTS ────────────────────────────────────────────────────

export const mockSBPProjects: SBPProject[] = [
  {
    id: "sbp_001",
    title: "Soil pH and Crop Yield Analysis",
    subject: "Agriculture",
    stage: "data-collection",
    progress: 0.4,
    dueDate: "2026-09-15",
    tasks: [
      { id: "t1", title: "Define research question", stage: "ideation", completed: true },
      { id: "t2", title: "Literature review on soil pH", stage: "ideation", completed: true },
      { id: "t3", title: "Write hypothesis", stage: "drafting", completed: true },
      { id: "t4", title: "Design data collection methodology", stage: "drafting", completed: true },
      { id: "t5", title: "Collect soil samples (5 sites)", stage: "data-collection", completed: false, notes: "3 of 5 sites sampled" },
      { id: "t6", title: "Record crop growth measurements", stage: "data-collection", completed: false },
      { id: "t7", title: "Analyse data and create graphs", stage: "data-collection", completed: false },
      { id: "t8", title: "Write final report", stage: "final-submission", completed: false },
      { id: "t9", title: "Peer review and edit", stage: "final-submission", completed: false },
      { id: "t10", title: "Submit portfolio", stage: "final-submission", completed: false },
    ],
  },
];

// ─── OFFLINE MODULES ─────────────────────────────────────────────────

export const mockOfflineModules: OfflineModule[] = [
  { id: "om1", name: "O-Level Maths — Arithmetic & Sets", sizeMB: 0.8, downloaded: true },
  { id: "om2", name: "O-Level Maths — Algebra & Equations", sizeMB: 1.2, downloaded: true },
  { id: "om3", name: "O-Level Maths — Geometry & Mensuration", sizeMB: 1.5, downloaded: false },
  { id: "om4", name: "O-Level Maths — Trig, Stats & Matrices", sizeMB: 1.4, downloaded: false },
  { id: "om5", name: "O-Level Physics — Full Course", sizeMB: 2.8, downloaded: true },
  { id: "om6", name: "O-Level Chemistry — Full Course", sizeMB: 2.5, downloaded: false },
  { id: "om7", name: "O-Level History — Southern Africa", sizeMB: 1.8, downloaded: false },
  { id: "om8", name: "O-Level Heritage Studies — Full Course", sizeMB: 1.6, downloaded: false },
  { id: "om9", name: "Mock Exams Pack 2024 (All Subjects)", sizeMB: 4.2, downloaded: false },
];
