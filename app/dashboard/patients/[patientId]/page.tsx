"use client";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, History, HeartPulse, Smile } from "lucide-react";
import { useEffect, useState } from "react";

const conditions = [
  "Depression", "Anxiety", "Stress", "Bipolar Disorder", "Panic Attacks",
  "Adolescent Behavioral Issues", "OCD", "PTSD", "Eating Disorder", "Phobia"
];
const emojis = ["😊", "😣", "😁", "😡", "🙂", "😐", "😴", "😭", "😃", "😔"];

function getRandomCondition() {
  return conditions[Math.floor(Math.random() * conditions.length)];
}
function getRandomDateInFuture() {
  const now = new Date();
  const daysToAdd = Math.floor(Math.random() * 30) + 1;
  now.setDate(now.getDate() + daysToAdd);
  const hour = (8 + Math.floor(Math.random() * 8)).toString().padStart(2, "0");
  const minute = (Math.floor(Math.random() * 2) * 30).toString().padStart(2, "0");
  return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${hour}:${minute}`;
}
function getRandomReports() {
  const files = ["session1.pdf", "session2.txt", "report3.pdf", "notes4.txt"];
  return Array.from({length: Math.floor(Math.random()*2)+2}, (_, i) => ({
    file: files[Math.floor(Math.random()*files.length)],
    date: `2024-06-${(Math.floor(Math.random()*15)+1).toString().padStart(2, "0")}`,
    summary: `Session ${i+1} summary and recommendations.`
  }));
}
function getRandomSessions() {
  return Array.from({length: 3}, (_, i) => ({
    date: `2024-06-${(i+1).toString().padStart(2, "0")}`,
    summary: [
      "Discussed anxiety triggers and coping strategies.",
      "Reviewed progress, introduced journaling.",
      "Explored family dynamics, set new goals."
    ][i] || "General session notes.",
  }));
}
function getRandomMoodHistory() {
  const moods = ["😊 Happy", "😣 Anxious", "😐 Neutral", "😡 Irritable", "😁 Excited", "😔 Sad"];
  return Array.from({length: 4}, (_, i) => ({
    date: `2024-06-${(15-i).toString().padStart(2, "0")}`,
    mood: moods[Math.floor(Math.random()*moods.length)]
  }));
}
function getRandomDiagnosis() {
  const diagnoses = [
    "Generalized Anxiety Disorder", "Major Depressive Disorder", "Bipolar Disorder", "PTSD", "OCD"
  ];
  return diagnoses[Math.floor(Math.random()*diagnoses.length)];
}
function getRandomTherapyType() {
  const types = ["CBT", "Depression", "Family Therapy", "Group Therapy", "Mindfulness"];
  return types[Math.floor(Math.random()*types.length)];
}
function getRandomTreatmentPlan() {
  const plans = [
    "weekly sessions, daily journaling.",
    "bi-weekly therapy, mindfulness exercises.",
    "monthly check-ins, medication review.",
    "daily mood tracking, support group participation."
  ];
  return plans[Math.floor(Math.random()*plans.length)];
}
function getRandomEmotionData() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  return Array.from({length: 7}, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6-i));
    return {
      day: days[d.getDay()],
      date: d.getDate().toString().padStart(2, "0"),
      emoji: emojis[Math.floor(Math.random()*emojis.length)],
      active: i === 6
    };
  });
}

function getFileIcon(file: string) {
  if (file.endsWith(".pdf")) return <FileText className="w-5 h-5 text-red-500" />;
  return <FileText className="w-5 h-5 text-blue-500" />;
}

function getFileBadge(file: string) {
  if (file.endsWith(".pdf")) return <span className="ml-2 px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-semibold">PDF</span>;
  if (file.endsWith(".txt")) return <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-semibold">TXT</span>;
  return null;
}

interface Patient {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  password: string;
  doctor_id: number;
  condition: string;
  nextAppointment: string;
}
interface EmotionData {
  day: string;
  date: string;
  emoji: string;
  active?: boolean;
}
interface Report {
  file: string;
  date: string;
  summary: string;
}
interface Session {
  date: string;
  summary: string;
  therapist?: string;
}
interface MoodHistory {
  date: string;
  mood: string;
}

export default function PatientDetailsPage() {
  const params = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodHistory[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [therapyType, setTherapyType] = useState("");

  useEffect(() => {
    async function fetchPatient() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.patients && params && params.patientId) {
          const patientName = decodeURIComponent(params.patientId as string);
          const found = data.patients.find((p: Patient) => p.fullName === patientName);
          if (found) {
            setPatient({
              ...found,
              condition: getRandomCondition(),
              nextAppointment: getRandomDateInFuture(),
            });
            setEmotionData(getRandomEmotionData());
            setReports(getRandomReports());
            setSessions(getRandomSessions());
            setMoodHistory(getRandomMoodHistory());
            setDiagnosis(getRandomDiagnosis());
            setTreatmentPlan(getRandomTreatmentPlan());
            setTherapyType(getRandomTherapyType());
          } else {
            setPatient(null);
          }
        } else {
          setPatient(null);
        }
      } catch {
        setPatient(null);
      }
      setLoading(false);
    }
    fetchPatient();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-8 text-center text-lg font-semibold text-primary">Loading...</Card>
      </div>
    );
  }
  if (!params || !params.patientId) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-8 text-center text-lg font-semibold text-red-500">
          Invalid patient URL.
        </Card>
      </div>
    );
  }
  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-8 text-center text-lg font-semibold text-red-500">Patient not found.</Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-8xl flex flex-col gap-8">
      <Card className="flex flex-col items-center p-8 rounded-xl shadow bg-background border w-full">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.fullName)}`} alt={patient.fullName} />
            <AvatarFallback className="text-2xl">{patient.fullName.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-400 border-2 border-white shadow"></span>
        </div>
        <span className="font-bold text-xl text-foreground mb-1 text-center">{patient.fullName}</span>
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">{patient.condition}</span>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="text-xs">Next appointment:</span>
          <span className="font-semibold text-primary text-sm">{patient.nextAppointment}</span>
        </div>
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex items-end justify-center gap-2 min-w-[340px]">
            {emotionData.map((emo, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center transition-all duration-200
                  ${emo.active ? "bg-primary text-white shadow-lg scale-110" : "border border-primary/30 bg-background text-foreground hover:bg-primary/10"}
                  rounded-2xl shadow p-2 cursor-pointer min-w-[48px] min-h-[60px] mx-1
                `}
              >
                <span className="text-xs font-medium leading-none mt-1">{emo.day}</span>
                <span className="text-xs leading-none">{emo.date}</span>
                <span className="text-xl leading-none mt-1">{emo.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="p-6 rounded-xl shadow bg-background border flex flex-col w-full">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-6 h-6 text-blue-500" />
          <h3 className="text-base font-bold text-primary">Reports</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {reports.map((report, idx) => (
            <Card key={idx} className="flex flex-col p-4 gap-2 bg-background border shadow rounded-lg hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-1">
                {getFileIcon(report.file)}
                <span className="font-semibold text-foreground">{report.file}</span>
                {getFileBadge(report.file)}
              </div>
              <span className="text-xs text-muted-foreground mb-1">{report.date}</span>
              <span className="text-sm text-foreground mb-2">{report.summary}</span>
              <CardFooter className="p-0 mt-2">
                <a
                  href={`/reports/${encodeURIComponent(patient.fullName)}/${report.file}`}
                  download
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">Download</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
          {reports.length === 0 && (
            <span className="text-muted-foreground">No reports available.</span>
          )}
        </div>
      </Card>
      <Card className="p-6 rounded-xl shadow bg-background border flex flex-col w-full gap-8">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2"><History className="w-5 h-5" /> Patient History</h3>
        <div className="pb-4 border-b border-muted-foreground/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Session Timeline</h4>
          <ol className="relative border-l border-primary/30 ml-2">
            {sessions.map((s, i) => (
              <li key={i} className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-background"></div>
                <time className="block mb-1 text-xs font-semibold text-primary">{s.date}</time>
                <div className="text-sm text-foreground mb-1">{s.summary}</div>
                <div className="text-xs text-muted-foreground">{s.therapist}</div>
              </li>
            ))}
          </ol>
        </div>
        <div className="pb-4 border-b border-muted-foreground/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Smile className="w-4 h-4 text-yellow-400" /> Recent Mood Entries</h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {moodHistory.map((m, i) => (
              <div key={i} className="flex flex-col items-center min-w-[60px]">
                <span className="text-2xl">{m.mood.split(' ')[0]}</span>
                <span className="text-xs text-muted-foreground mt-1">{m.date}</span>
                <span className="text-xs text-muted-foreground">{m.mood.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-4 border-b border-muted-foreground/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><HeartPulse className="w-4 h-4 text-pink-500" /> Diagnosis & Treatment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded p-3">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Diagnosis</div>
              <div className="text-sm text-foreground font-semibold">{diagnosis}</div>
            </div>
            <div className="bg-muted rounded p-3">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Therapy Type</div>
              <div className="text-sm text-foreground font-semibold">{therapyType}</div>
            </div>
            <div className="bg-muted rounded p-3 md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Treatment Plan</div>
              <div className="text-sm text-foreground font-semibold">{treatmentPlan}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 