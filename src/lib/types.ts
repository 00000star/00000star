export type Level = "O-Level" | "A-Level";

export type NodeStatus = "locked" | "active" | "completed";

export interface User {
  id: string;
  phone: string;
  name: string;
  level: Level;
  avatar: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  premium: boolean;
  deviceProfile: DeviceProfile;
  createdAt: string;
}

export interface DeviceProfile {
  ramGB: number;
  batteryPct: number;
  lowEnd: boolean;
  darkMode: boolean;
}

export interface Subject {
  id: string;
  name: string;
  level: Level;
  icon: string;
  color: string;
  nodes: ProgressionNode[];
  progress: number;
}

export interface ProgressionNode {
  id: string;
  title: string;
  description: string;
  status: NodeStatus;
  xpReward: number;
  stars: number;
  order: number;
  lessonCount: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  nodeId: string;
  title: string;
  questionText: string;
  questionLatex?: string;
  diagramSvg?: string;
  options: LessonOption[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface LessonOption {
  text: string;
  latex?: string;
}

export interface MockExam {
  id: string;
  subjectId: string;
  title: string;
  year: number;
  paper: number;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  text: string;
  latex?: string;
  diagramSvg?: string;
  options: string[];
  correctIndex: number;
  marks: number;
  flagged?: boolean;
  answered?: number;
}

export interface SBPProject {
  id: string;
  title: string;
  subject: string;
  stage: SBPStage;
  progress: number;
  tasks: SBPTask[];
  dueDate: string;
}

export type SBPStage = "ideation" | "drafting" | "data-collection" | "final-submission";

export interface SBPTask {
  id: string;
  title: string;
  stage: SBPStage;
  completed: boolean;
  notes?: string;
}

export interface EssaySubmission {
  id: string;
  subject: string;
  topic: string;
  content: string;
  feedback?: EssayFeedback;
}

export interface EssayFeedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  highlights: FeedbackHighlight[];
}

export interface FeedbackHighlight {
  startIndex: number;
  endIndex: number;
  text: string;
  comment: string;
  type: "strength" | "improvement";
}

export interface OfflineModule {
  id: string;
  name: string;
  sizeMB: number;
  downloaded: boolean;
  downloading?: boolean;
  progress?: number;
}

export interface SyncEvent {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
  synced: boolean;
}

export interface PaymentRequest {
  id: string;
  studentId: string;
  studentName: string;
  plan: "monthly" | "termly" | "yearly";
  amountUSD: number;
  amountZWL: number;
  status: "pending" | "paid" | "expired";
  whatsappLink: string;
  paymentUrl: string;
  createdAt: string;
}
