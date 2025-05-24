import React from "react";

export type AppointmentEventData = {
  title: string;
  date: string; 
  time?: string;
  type: "emergency" | "examination" | "consultation" | "routine" | "sick";
  patient?: string;
  doctor?: string;
  description?: string;
};

const typeColors: Record<AppointmentEventData["type"], string> = {
  emergency: "bg-blue-800 text-white",
  examination: "bg-green-200 text-black",
  consultation: "bg-purple-500 text-white",
  routine: "bg-red-300 text-white",
  sick: "bg-blue-400 text-white",
};

export const AppointmentEvent: React.FC<{ event: AppointmentEventData; onClick?: () => void }> = ({ event, onClick }) => (
  <div
    className={`rounded px-2 py-1 text-xs font-semibold cursor-pointer truncate ${typeColors[event.type]}`}
    title={event.title}
    onClick={onClick}
  >
    {event.title} {event.time && <span className="ml-1 font-normal">{event.time}</span>}
  </div>
); 