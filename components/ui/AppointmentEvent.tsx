import React from "react";
import { cn } from "@/lib/utils";

export type AppointmentEventData = {
  title: string;
  date: string; 
  time?: string;
  type: "emergency" | "examination" | "consultation" | "routine" | "sick";
  patient?: string;
  doctor?: string;
  description?: string;
  patient_id?: number;
};

const typeColors: Record<AppointmentEventData["type"], { light: string; dark: string }> = {
  emergency: {
    light: "bg-blue-600 text-white",
    dark: "bg-blue-800 text-white"
  },
  examination: {
    light: "bg-green-100 text-green-900",
    dark: "bg-red-500 text-white"
  },
  consultation: {
    light: "bg-purple-500 text-white",
    dark: "bg-purple-700 text-white"
  },
  routine: {
    light: "bg-rose-300 text-rose-900",
    dark: "bg-rose-700 text-white"
  },
  sick: {
    light: "bg-blue-400 text-white",
    dark: "bg-blue-600 text-white"
  }
};

export const AppointmentEvent: React.FC<{ event: AppointmentEventData; onClick?: () => void }> = ({ event, onClick }) => (
  <div
    className={cn(
      "rounded px-2 py-1 text-xs font-semibold cursor-pointer truncate transition-colors",
      typeColors[event.type].light,
      "dark:" + typeColors[event.type].dark,
      "hover:opacity-90"
    )}
    title={event.title}
    onClick={onClick}
  >
    {event.title} {event.time && <span className="ml-1 font-normal opacity-90">{event.time}</span>}
  </div>
); 