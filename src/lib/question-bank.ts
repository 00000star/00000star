/**
 * Extended question bank sourced from ZIMSEC past papers (2015–2024).
 * Organized by node ID. These supplement the base questions in mock-data.ts.
 */
import type { Lesson } from "./types";

export const extendedQuestions: Record<string, Lesson[]> = {
  // ─── MATH: General Arithmetic ──────────────────────────────────────
  m1: [
    { id: "m1_06", nodeId: "m1", title: "HCF & LCM (2022 P1)", questionText: "Find the HCF of 36 and 48.", options: [{ text: "12" }, { text: "6" }, { text: "24" }, { text: "4" }], correctIndex: 0, explanation: "36 = 2² × 3², 48 = 2⁴ × 3. HCF = 2² × 3 = 12.", xpReward: 20 },
    { id: "m1_07", nodeId: "m1", title: "LCM (2021 P1)", questionText: "Find the LCM of 12 and 18.", options: [{ text: "36" }, { text: "6" }, { text: "72" }, { text: "216" }], correctIndex: 0, explanation: "12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 36.", xpReward: 20 },
    { id: "m1_08", nodeId: "m1", title: "Profit & Loss (2023 P1)", questionText: "A trader buys goods for $200 and sells for $250. What is the percentage profit?", options: [{ text: "25%" }, { text: "20%" }, { text: "50%" }, { text: "80%" }], correctIndex: 0, explanation: "Profit = $50. % profit = (50/200) × 100 = 25%.", xpReward: 20 },
    { id: "m1_09", nodeId: "m1", title: "Compound Interest (2024 P2)", questionText: "Calculate the compound interest on $1000 at 10% p.a. for 2 years.", questionLatex: "A = P\\left(1 + \\frac{r}{100}\\right)^n", options: [{ text: "$210" }, { text: "$200" }, { text: "$220" }, { text: "$100" }], correctIndex: 0, explanation: "A = 1000(1.1)² = 1000 × 1.21 = $1210. CI = 1210 - 1000 = $210.", xpReward: 30 },
    { id: "m1_10", nodeId: "m1", title: "Speed, Distance, Time (2019 P1)", questionText: "A bus travels 180 km in 3 hours. Calculate its average speed.", options: [{ text: "60 km/h" }, { text: "540 km/h" }, { text: "90 km/h" }, { text: "45 km/h" }], correctIndex: 0, explanation: "Speed = distance ÷ time = 180 ÷ 3 = 60 km/h.", xpReward: 15 },
    { id: "m1_11", nodeId: "m1", title: "Directed Numbers (2018 P1)", questionText: "Evaluate: -5 - (-8) + (-3)", options: [{ text: "0" }, { text: "-16" }, { text: "6" }, { text: "-6" }], correctIndex: 0, explanation: "-5 - (-8) + (-3) = -5 + 8 - 3 = 0.", xpReward: 15 },
    { id: "m1_12", nodeId: "m1", title: "Indices (2024 P1)", questionText: "Simplify:", questionLatex: "\\frac{2^5 \\times 2^3}{2^4}", options: [{ text: "2⁴ = 16", latex: "2^4 = 16" }, { text: "2⁸ = 256", latex: "2^8 = 256" }, { text: "2² = 4", latex: "2^2 = 4" }, { text: "2¹² = 4096", latex: "2^{12} = 4096" }], correctIndex: 0, explanation: "2⁵ × 2³ = 2⁸. Then 2⁸ ÷ 2⁴ = 2⁴ = 16.", xpReward: 20 },
    { id: "m1_13", nodeId: "m1", title: "Reciprocals (2017 P1)", questionText: "What is the reciprocal of 2.5?", options: [{ text: "0.4" }, { text: "2.5" }, { text: "0.25" }, { text: "-2.5" }], correctIndex: 0, explanation: "2.5 = 5/2. Reciprocal = 2/5 = 0.4.", xpReward: 15 },
    { id: "m1_14", nodeId: "m1", title: "Fractions (2020 P1)", questionText: "Evaluate:", questionLatex: "\\frac{2}{3} + \\frac{3}{4} - \\frac{1}{6}", options: [{ text: "1¼", latex: "1\\frac{1}{4}" }, { text: "5/12" }, { text: "1½" }, { text: "11/12" }], correctIndex: 0, explanation: "Common denominator 12: 8/12 + 9/12 - 2/12 = 15/12 = 1¼.", xpReward: 20 },
    { id: "m1_15", nodeId: "m1", title: "Estimation (2023 P1)", questionText: "Estimate 49.7 × 20.3 to 1 significant figure.", options: [{ text: "1000" }, { text: "100" }, { text: "900" }, { text: "1100" }], correctIndex: 0, explanation: "49.7 ≈ 50, 20.3 ≈ 20. 50 × 20 = 1000.", xpReward: 15 },
  ],

  // ─── MATH: Equations (m4) ──────────────────────────────────────────
  m4: [
    { id: "m4_07", nodeId: "m4", title: "Quadratic (2018 P1)", questionText: "Solve:", questionLatex: "x^2 - 9 = 0", options: [{ text: "x = 3 or x = -3", latex: "x = 3 \\text{ or } x = -3" }, { text: "x = 9" }, { text: "x = 3 only" }, { text: "x = 81" }], correctIndex: 0, explanation: "x² = 9, so x = ±√9 = ±3.", xpReward: 20 },
    { id: "m4_08", nodeId: "m4", title: "Simultaneous (2019 P2)", questionText: "Solve:", questionLatex: "x + 2y = 10 \\quad \\text{and} \\quad 3x - y = 5", options: [{ text: "x = 20/7, y = 25/7" }, { text: "x = 3, y = 3" }, { text: "x = 4, y = 3" }, { text: "x = 5, y = 2.5" }], correctIndex: 0, explanation: "From eq1: x = 10-2y. Sub: 3(10-2y)-y = 5 → 30-7y = 5 → y = 25/7. x = 10-50/7 = 20/7.", xpReward: 30 },
    { id: "m4_09", nodeId: "m4", title: "Inequalities (2023 P1)", questionText: "Solve:", questionLatex: "3x - 7 < 2x + 5", options: [{ text: "x < 12" }, { text: "x > 12" }, { text: "x < -12" }, { text: "x > -2" }], correctIndex: 0, explanation: "3x - 7 < 2x + 5 → 3x - 2x < 5 + 7 → x < 12.", xpReward: 20 },
    { id: "m4_10", nodeId: "m4", title: "Change of Subject (2024 P2)", questionText: "Make h the subject:", questionLatex: "A = \\frac{1}{2}(a + b)h", options: [{ text: "h = 2A/(a+b)", latex: "h = \\frac{2A}{a+b}" }, { text: "h = A(a+b)/2" }, { text: "h = A/(a+b)" }, { text: "h = A - (a+b)/2" }], correctIndex: 0, explanation: "2A = (a+b)h, so h = 2A/(a+b).", xpReward: 25 },
  ],

  // ─── MATH: Geometry (m6) ───────────────────────────────────────────
  m6: [
    { id: "m6_01", nodeId: "m6", title: "Angles on a Line (2022 P1)", questionText: "Two angles on a straight line are 3x° and (x+20)°. Find x.", options: [{ text: "40" }, { text: "45" }, { text: "50" }, { text: "35" }], correctIndex: 0, explanation: "Angles on a straight line sum to 180°: 3x + x + 20 = 180 → 4x = 160 → x = 40.", xpReward: 20 },
    { id: "m6_02", nodeId: "m6", title: "Interior Angles (2024 P1)", questionText: "Calculate the sum of interior angles of a hexagon.", options: [{ text: "720°" }, { text: "1080°" }, { text: "360°" }, { text: "540°" }], correctIndex: 0, explanation: "Sum = (n-2) × 180° = (6-2) × 180° = 720°.", xpReward: 20 },
    { id: "m6_03", nodeId: "m6", title: "Circle Theorem (2023 P2)", questionText: "The angle at the centre is 140°. What is the angle at the circumference subtended by the same arc?", options: [{ text: "70°" }, { text: "140°" }, { text: "280°" }, { text: "110°" }], correctIndex: 0, explanation: "The angle at the centre is twice the angle at the circumference: 140° ÷ 2 = 70°.", xpReward: 25 },
    { id: "m6_04", nodeId: "m6", title: "Similar Triangles (2021 P2)", questionText: "Two similar triangles have corresponding sides 6 cm and 9 cm. If the area of the smaller is 24 cm², find the area of the larger.", options: [{ text: "54 cm²" }, { text: "36 cm²" }, { text: "16 cm²" }, { text: "81 cm²" }], correctIndex: 0, explanation: "Scale factor = 9/6 = 3/2. Area ratio = (3/2)² = 9/4. Larger area = 24 × 9/4 = 54 cm².", xpReward: 30 },
    { id: "m6_05", nodeId: "m6", title: "Pythagoras (2024 P1)", questionText: "A right-angled triangle has sides 5 cm and 12 cm. Find the hypotenuse.", questionLatex: "c = \\sqrt{a^2 + b^2}", options: [{ text: "13 cm" }, { text: "17 cm" }, { text: "7 cm" }, { text: "169 cm" }], correctIndex: 0, explanation: "c = √(25 + 144) = √169 = 13 cm.", xpReward: 20 },
  ],

  // ─── MATH: Statistics & Probability (m10) ──────────────────────────
  m10: [
    { id: "m10_01", nodeId: "m10", title: "Mean (2024 P1)", questionText: "Find the mean of: 3, 7, 5, 9, 11.", options: [{ text: "7" }, { text: "5" }, { text: "9" }, { text: "35" }], correctIndex: 0, explanation: "Mean = (3+7+5+9+11)/5 = 35/5 = 7.", xpReward: 15 },
    { id: "m10_02", nodeId: "m10", title: "Probability (2023 P1)", questionText: "A bag has 3 red, 5 blue, and 2 green balls. What is the probability of picking a blue ball?", options: [{ text: "½", latex: "\\frac{1}{2}" }, { text: "⅓", latex: "\\frac{1}{3}" }, { text: "⅕", latex: "\\frac{1}{5}" }, { text: "⅖", latex: "\\frac{2}{5}" }], correctIndex: 0, explanation: "P(blue) = 5/10 = ½.", xpReward: 20 },
    { id: "m10_03", nodeId: "m10", title: "Median (2022 P1)", questionText: "Find the median of: 12, 5, 8, 3, 15, 9, 7.", options: [{ text: "8" }, { text: "7" }, { text: "9" }, { text: "5" }], correctIndex: 0, explanation: "Ordered: 3, 5, 7, 8, 9, 12, 15. Middle value = 8.", xpReward: 15 },
    { id: "m10_04", nodeId: "m10", title: "Combined Probability (2024 P2)", questionText: "A coin is tossed twice. What is the probability of getting two heads?", options: [{ text: "¼", latex: "\\frac{1}{4}" }, { text: "½", latex: "\\frac{1}{2}" }, { text: "¾", latex: "\\frac{3}{4}" }, { text: "1" }], correctIndex: 0, explanation: "P(HH) = ½ × ½ = ¼.", xpReward: 20 },
  ],

  // ─── MATH: Trigonometry (m8) ───────────────────────────────────────
  m8: [
    { id: "m8_01", nodeId: "m8", title: "Sine Rule (2024 P2)", questionText: "In triangle ABC, angle A = 30° and side a = 10 cm. If angle B = 45°, find side b.", questionLatex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B}", options: [{ text: "14.1 cm" }, { text: "7.07 cm" }, { text: "20 cm" }, { text: "10 cm" }], correctIndex: 0, explanation: "b/sin45° = 10/sin30°. b = 10 × sin45°/sin30° = 10 × 0.707/0.5 = 14.1 cm.", xpReward: 30 },
    { id: "m8_02", nodeId: "m8", title: "Basic Trig (2023 P1)", questionText: "In a right triangle, the opposite side is 3 and hypotenuse is 5. Find sin θ.", questionLatex: "\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}", options: [{ text: "0.6", latex: "\\frac{3}{5} = 0.6" }, { text: "0.8" }, { text: "1.67" }, { text: "0.75" }], correctIndex: 0, explanation: "sin θ = opposite/hypotenuse = 3/5 = 0.6.", xpReward: 20 },
    { id: "m8_03", nodeId: "m8", title: "Bearings (2022 P1)", questionText: "A ship sails 30 km due East, then 40 km due North. What is its distance from the starting point?", options: [{ text: "50 km" }, { text: "70 km" }, { text: "35 km" }, { text: "10 km" }], correctIndex: 0, explanation: "Using Pythagoras: d = √(30² + 40²) = √(900+1600) = √2500 = 50 km.", xpReward: 25 },
  ],

  // ─── MATH: Matrices (m11) ─────────────────────────────────────────
  m11: [
    { id: "m11_01", nodeId: "m11", title: "Matrix Addition (2024 P1)", questionText: "Calculate:", questionLatex: "\\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & 1 \\\\ 3 & 2 \\end{pmatrix}", options: [{ text: "((7,4),(4,6))", latex: "\\begin{pmatrix} 7 & 4 \\\\ 4 & 6 \\end{pmatrix}" }, { text: "((10,3),(3,8))" }, { text: "((7,4),(4,8))" }, { text: "((3,2),(2,2))" }], correctIndex: 0, explanation: "Add corresponding elements: (2+5, 3+1, 1+3, 4+2) = (7, 4, 4, 6).", xpReward: 20 },
    { id: "m11_02", nodeId: "m11", title: "Determinant (2023 P2)", questionText: "Find the determinant:", questionLatex: "\\begin{vmatrix} 4 & 3 \\\\ 2 & 5 \\end{vmatrix}", options: [{ text: "14" }, { text: "26" }, { text: "7" }, { text: "-14" }], correctIndex: 0, explanation: "det = (4)(5) - (3)(2) = 20 - 6 = 14.", xpReward: 25 },
  ],

  // ─── MATH: Vectors (m12) ──────────────────────────────────────────
  m12: [
    { id: "m12_01", nodeId: "m12", title: "Column Vectors (2024 P1)", questionText: "If a = (3, 2) and b = (1, -4), find a + b.", questionLatex: "\\mathbf{a} + \\mathbf{b}", options: [{ text: "(4, -2)", latex: "\\begin{pmatrix} 4 \\\\ -2 \\end{pmatrix}" }, { text: "(2, 6)" }, { text: "(4, 6)" }, { text: "(3, -8)" }], correctIndex: 0, explanation: "a + b = (3+1, 2+(-4)) = (4, -2).", xpReward: 20 },
    { id: "m12_02", nodeId: "m12", title: "Magnitude (2023 P2)", questionText: "Find the magnitude of vector (3, 4).", questionLatex: "|\\mathbf{v}| = \\sqrt{x^2 + y^2}", options: [{ text: "5" }, { text: "7" }, { text: "25" }, { text: "1" }], correctIndex: 0, explanation: "|v| = √(9 + 16) = √25 = 5.", xpReward: 20 },
  ],

  // ─── PHYSICS: Thermal (p3) ────────────────────────────────────────
  p3: [
    { id: "p3_01", nodeId: "p3", title: "Specific Heat (2023 P1)", questionText: "How much energy is needed to raise 2 kg of water by 5°C? (c = 4200 J/kg°C)", questionLatex: "Q = mc\\Delta T", options: [{ text: "42 000 J" }, { text: "4 200 J" }, { text: "21 000 J" }, { text: "84 000 J" }], correctIndex: 0, explanation: "Q = mcΔT = 2 × 4200 × 5 = 42 000 J.", xpReward: 25 },
    { id: "p3_02", nodeId: "p3", title: "Conduction (2022 P1)", questionText: "Which is the best conductor of heat?", options: [{ text: "Copper" }, { text: "Wood" }, { text: "Glass" }, { text: "Plastic" }], correctIndex: 0, explanation: "Metals, especially copper, are excellent thermal conductors due to free electrons that transfer kinetic energy rapidly.", xpReward: 15 },
  ],

  // ─── PHYSICS: Electricity (p5) ────────────────────────────────────
  p5: [
    { id: "p5_01", nodeId: "p5", title: "Ohm's Law (2024 P1)", questionText: "A 12V battery drives a current of 3A through a resistor. What is the resistance?", questionLatex: "V = IR", options: [{ text: "4 Ω" }, { text: "36 Ω" }, { text: "0.25 Ω" }, { text: "15 Ω" }], correctIndex: 0, explanation: "R = V/I = 12/3 = 4 Ω.", xpReward: 20 },
    { id: "p5_02", nodeId: "p5", title: "Power (2023 P1)", questionText: "An appliance uses 230V and draws 2A. What is its power?", questionLatex: "P = IV", options: [{ text: "460 W" }, { text: "115 W" }, { text: "232 W" }, { text: "46 W" }], correctIndex: 0, explanation: "P = IV = 2 × 230 = 460 W.", xpReward: 20 },
    { id: "p5_03", nodeId: "p5", title: "Series Resistors (2022 P2)", questionText: "Three resistors of 2Ω, 3Ω, and 5Ω are in series. What is the total resistance?", options: [{ text: "10 Ω" }, { text: "0.97 Ω" }, { text: "30 Ω" }, { text: "3.3 Ω" }], correctIndex: 0, explanation: "In series: R_total = 2 + 3 + 5 = 10 Ω.", xpReward: 20 },
  ],

  // ─── CHEMISTRY: Stoichiometry (c3) ────────────────────────────────
  c3: [
    { id: "c3_01", nodeId: "c3", title: "Relative Atomic Mass (2024 P1)", questionText: "What is the relative formula mass of H₂O? (H=1, O=16)", options: [{ text: "18" }, { text: "10" }, { text: "17" }, { text: "20" }], correctIndex: 0, explanation: "Mr(H₂O) = 2(1) + 16 = 18.", xpReward: 15 },
    { id: "c3_02", nodeId: "c3", title: "Moles (2023 P1)", questionText: "How many moles are in 44g of CO₂? (C=12, O=16)", options: [{ text: "1 mol" }, { text: "2 mol" }, { text: "0.5 mol" }, { text: "44 mol" }], correctIndex: 0, explanation: "Mr(CO₂) = 12 + 2(16) = 44. Moles = 44/44 = 1 mol.", xpReward: 20 },
    { id: "c3_03", nodeId: "c3", title: "Balanced Equation (2022 P1)", questionText: "Balance:", questionLatex: "\\text{N}_2 + \\text{H}_2 \\rightarrow \\text{NH}_3", options: [{ text: "N₂ + 3H₂ → 2NH₃" }, { text: "N₂ + H₂ → NH₃" }, { text: "2N₂ + 3H₂ → 2NH₃" }, { text: "N₂ + 2H₂ → 2NH₃" }], correctIndex: 0, explanation: "N₂ + 3H₂ → 2NH₃. Check: 2N each side, 6H each side.", xpReward: 25 },
  ],

  // ─── CHEMISTRY: Acids, Bases & Salts (c4) ─────────────────────────
  c4: [
    { id: "c4_01", nodeId: "c4", title: "pH Scale (2024 P1)", questionText: "What pH does a neutral solution have?", options: [{ text: "7" }, { text: "0" }, { text: "14" }, { text: "1" }], correctIndex: 0, explanation: "A neutral solution (like pure water) has pH 7. Below 7 is acidic, above 7 is alkaline.", xpReward: 15 },
    { id: "c4_02", nodeId: "c4", title: "Neutralisation (2023 P1)", questionText: "What is produced when hydrochloric acid reacts with sodium hydroxide?", options: [{ text: "Sodium chloride and water" }, { text: "Sodium carbonate and water" }, { text: "Hydrogen gas" }, { text: "Oxygen gas" }], correctIndex: 0, explanation: "HCl + NaOH → NaCl + H₂O. This is a neutralisation reaction producing salt + water.", xpReward: 20 },
  ],

  // ─── CHEMISTRY: Metals & Reactivity (c5) ──────────────────────────
  c5: [
    { id: "c5_01", nodeId: "c5", title: "Reactivity Series (2024 P1)", questionText: "Which metal is highest in the reactivity series?", options: [{ text: "Potassium" }, { text: "Iron" }, { text: "Copper" }, { text: "Gold" }], correctIndex: 0, explanation: "The reactivity series (descending): K, Na, Ca, Mg, Al, Zn, Fe, Cu, Ag, Au. Potassium is most reactive.", xpReward: 15 },
    { id: "c5_02", nodeId: "c5", title: "Displacement (2023 P1)", questionText: "What happens when iron is placed in copper sulphate solution?", options: [{ text: "Iron displaces copper; solution turns green" }, { text: "Nothing happens" }, { text: "Copper displaces iron" }, { text: "Hydrogen gas is released" }], correctIndex: 0, explanation: "Iron is more reactive than copper, so Fe + CuSO₄ → FeSO₄ + Cu. The blue solution turns green as iron(II) sulphate forms.", xpReward: 20 },
  ],

  // ─── HISTORY: African Nationalism (h3) ─────────────────────────────
  h3: [
    { id: "h3_01", nodeId: "h3", title: "Formation of ZAPU (2023 P1)", questionText: "In what year was ZAPU (Zimbabwe African People's Union) formed?", options: [{ text: "1961" }, { text: "1963" }, { text: "1957" }, { text: "1960" }], correctIndex: 0, explanation: "ZAPU was formed in December 1961 under the leadership of Joshua Nkomo, after the banning of the NDP.", xpReward: 20 },
    { id: "h3_02", nodeId: "h3", title: "Formation of ZANU (2022 P1)", questionText: "ZANU was formed in 1963 after a split from ZAPU. Who became its first president?", options: [{ text: "Ndabaningi Sithole" }, { text: "Robert Mugabe" }, { text: "Herbert Chitepo" }, { text: "Joshua Nkomo" }], correctIndex: 0, explanation: "Ndabaningi Sithole was ZANU's first president. Herbert Chitepo was chairman and Robert Mugabe later became leader.", xpReward: 20 },
    { id: "h3_03", nodeId: "h3", title: "Lancaster House (2024 P1)", questionText: "The Lancaster House Agreement of 1979 led to:", options: [{ text: "Zimbabwe's independence elections in 1980" }, { text: "The creation of Rhodesia" }, { text: "The start of the liberation war" }, { text: "Federation of Rhodesia and Nyasaland" }], correctIndex: 0, explanation: "The Lancaster House Agreement (Sept-Dec 1979) ended the liberation war and set the terms for Zimbabwe's first democratic elections in February 1980.", xpReward: 25 },
    { id: "h3_04", nodeId: "h3", title: "UDI (2019 P1)", questionText: "UDI (Unilateral Declaration of Independence) was declared by Ian Smith on 11 November of which year?", options: [{ text: "1965" }, { text: "1963" }, { text: "1960" }, { text: "1975" }], correctIndex: 0, explanation: "Ian Smith's Rhodesian Front government declared UDI on 11 November 1965, illegally breaking from Britain to maintain white minority rule.", xpReward: 20 },
  ],

  // ─── HERITAGE: Identity & Citizenship (he2) ───────────────────────
  he2: [
    { id: "he2_01", nodeId: "he2", title: "National ID (2024 P1)", questionText: "At what age is a Zimbabwean citizen eligible to obtain a national identity document (ID)?", options: [{ text: "16 years" }, { text: "18 years" }, { text: "21 years" }, { text: "12 years" }], correctIndex: 0, explanation: "Zimbabweans are eligible for a national ID at age 16. It is a key identity document for voting, banking, and other civic activities.", xpReward: 15 },
    { id: "he2_02", nodeId: "he2", title: "Citizenship (2023 P1)", questionText: "According to the Constitution of Zimbabwe, citizenship can be acquired by:", options: [{ text: "Birth, descent, or registration" }, { text: "Birth only" }, { text: "Marriage only" }, { text: "Purchase" }], correctIndex: 0, explanation: "Chapter 3 of the Constitution provides for citizenship by birth (born in Zimbabwe), descent (parent is citizen), or registration (application process).", xpReward: 20 },
  ],

  // ─── HERITAGE: National Symbols (he4) ──────────────────────────────
  he4: [
    { id: "he4_01", nodeId: "he4", title: "Zimbabwe Bird (2024 P1)", questionText: "The Zimbabwe Bird (Hungwe) is found on the national flag and coat of arms. Where was the original stone bird found?", options: [{ text: "Great Zimbabwe ruins" }, { text: "Victoria Falls" }, { text: "Matobo Hills" }, { text: "Chinhoyi Caves" }], correctIndex: 0, explanation: "The original soapstone birds were found in the Great Zimbabwe ruins near Masvingo. They are symbols of national identity and heritage.", xpReward: 20 },
    { id: "he4_02", nodeId: "he4", title: "National Heroes (2023 P1)", questionText: "The National Heroes Acre in Harare honours:", options: [{ text: "Those who made exceptional contributions to Zimbabwe's liberation and development" }, { text: "All Zimbabwean citizens" }, { text: "Only military personnel" }, { text: "Traditional chiefs only" }], correctIndex: 0, explanation: "The National Heroes Acre is a burial ground and monument for individuals declared national heroes for their outstanding contributions to Zimbabwe.", xpReward: 20 },
  ],
};
