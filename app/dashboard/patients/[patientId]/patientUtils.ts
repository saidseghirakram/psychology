export const moodEmojiMap: Record<string, string> = {
  happy: "😊",
  sad: "😔",
  angry: "😡",
  neutral: "😐",
  excited: "😃",
  tired: "😴",
  shy: "😣",
  preservative: "🙂",
};

export const conditions = [
  "Depression", "Anxiety", "Stress", "Bipolar Disorder", "Panic Attacks",
  "Adolescent Behavioral Issues", "OCD", "PTSD", "Eating Disorder", "Phobia"
];

export function getRandomCondition() {
  return conditions[Math.floor(Math.random() * conditions.length)];
}
export function getRandomDateInFuture() {
  const now = new Date();
  const daysToAdd = Math.floor(Math.random() * 30) + 1;
  now.setDate(now.getDate() + daysToAdd);
  const hour = (8 + Math.floor(Math.random() * 8)).toString().padStart(2, "0");
  const minute = (Math.floor(Math.random() * 2) * 30).toString().padStart(2, "0");
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${hour}:${minute}`;
}
export function getRandomReports() {
  const files = ["session1.pdf", "session2.txt", "report3.pdf", "notes4.txt"];
  return Array.from({ length: Math.floor(Math.random() * 2) + 2 }, (_, i) => ({
    file: files[Math.floor(Math.random() * files.length)],
    date: `2024-06-${(Math.floor(Math.random() * 15) + 1).toString().padStart(2, "0")}`,
    summary: `Session ${i + 1} summary and recommendations.`,
  }));
}
export function getRandomSessions() {
  return Array.from({ length: 3 }, (_, i) => ({
    date: `2024-06-${(i + 1).toString().padStart(2, "0")}`,
    summary: [
      "Discussed anxiety triggers and coping strategies.",
      "Reviewed progress, introduced journaling.",
      "Explored family dynamics, set new goals.",
    ][i] || "General session notes.",
  }));
}
export function getRandomDiagnosis() {
  const diagnoses = [
    "Generalized Anxiety Disorder", "Major Depressive Disorder", "Bipolar Disorder", "PTSD", "OCD"
  ];
  return diagnoses[Math.floor(Math.random() * diagnoses.length)];
}
export function getRandomTherapyType() {
  const types = ["CBT", "Depression", "Family Therapy", "Group Therapy", "Mindfulness"];
  return types[Math.floor(Math.random() * types.length)];
}
export function getRandomTreatmentPlan() {
  const plans = [
    "weekly sessions, daily journaling.",
    "bi-weekly therapy, mindfulness exercises.",
    "monthly check-ins, medication review.",
    "daily mood tracking, support group participation.",
  ];
  return plans[Math.floor(Math.random() * plans.length)];
}
export function getFileIcon() {
  // This is a UI function, should be reimplemented in the component
  return null;
}
export function getFileBadge() {
  // This is a UI function, should be reimplemented in the component
  return null;
}

export interface Patient {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  password: string;
  doctor_id: number;
  condition: string;
  nextAppointment: string;
}

export interface Mood {
  day: string;
  overall_mood: string;
}

export interface Report {
  file: string;
  date: string;
  summary: string;
}

export interface Session {
  date: string;
  summary: string;
  therapist?: string;
} 