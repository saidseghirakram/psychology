import { Mood, moodEmojiMap } from "./patientUtils";

export default function MoodHistory({ moodHistory }: { moodHistory: Mood[] }) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-end justify-center gap-2 min-w-[340px]">
        {moodHistory.map((mood, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-background text-foreground shadow p-2 min-w-[48px] min-h-[60px]"
          >
            <span className="text-xs font-medium leading-none mt-1">{mood.day}</span>
            <span className="text-xs leading-none"></span>
            <span className="text-xl leading-none mt-1">
              {moodEmojiMap[mood.overall_mood?.toLowerCase()] || "❓"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 