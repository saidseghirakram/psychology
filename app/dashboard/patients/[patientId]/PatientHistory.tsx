import { History, CalendarDays, Smile, HeartPulse } from "lucide-react";
import { Session, Mood, moodEmojiMap } from "./patientUtils";

export default function PatientHistory({
  sessions,
  moodHistory,
  diagnosis,
  therapyType,
  treatmentPlan,
}: {
  sessions: Session[];
  moodHistory: Mood[];
  diagnosis: string;
  therapyType: string;
  treatmentPlan: string;
}) {
  return (
    <div className="p-6 rounded-xl shadow bg-background border flex flex-col w-full gap-8">
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
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Smile className="w-4 h-4 text-yellow-400" /> Mood Data</h4>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {moodHistory.map((m, i) => (
            <div key={i} className="flex flex-col items-center min-w-[60px]">
              <span className="text-2xl">{moodEmojiMap[m.overall_mood?.toLowerCase()] || "❓"}</span>
              <span className="text-xs text-muted-foreground mt-1">{m.day}</span>
              <span className="text-xs text-muted-foreground">{m.overall_mood}</span>
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
    </div>
  );
} 