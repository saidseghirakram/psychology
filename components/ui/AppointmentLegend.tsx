import React from "react";

const legend = [
  { label: "EMERGENCY", color: "bg-blue-800" },
  { label: "EXAMINATION", color: "bg-yellow-400" },
  { label: "CONSULTATION", color: "bg-purple-500" },
  { label: "ROUTINE CHECKUP", color: "bg-red-500" },
  { label: "SICK VISIT", color: "bg-blue-400" },
];

export const AppointmentLegend: React.FC = () => (
  <div className="flex flex-wrap gap-4 mt-6 justify-center">
    {legend.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <span className={`inline-block w-4 h-4 rounded ${item.color}`}></span>
        <span className="text-xs font-semibold text-muted-foreground">{item.label}</span>
      </div>
    ))}
  </div>
); 