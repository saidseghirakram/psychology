"use client"
import React, { useState } from "react";
  import { AppointmentEvent, AppointmentEventData } from "./AppointmentEvent";
import { AppointmentEventModal } from "./AppointmentEventModal";
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format } from "date-fns";
import { Button } from "./button";

interface AppointmentsCalendarProps {
  events: AppointmentEventData[];
}

export const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEventData | null>(null);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const dayEvents = events.filter(
        (event) => isSameDay(new Date(event.date), day)
      );
      days.push(
        <div
          className={`border min-h-[90px] p-1 align-top relative bg-white ${!isSameMonth(day, monthStart) ? "bg-gray-50 text-gray-400" : ""}`}
          key={day.toString()}
        >
          <div className="text-xs font-semibold mb-1">{formattedDate}</div>
          <div className="flex flex-col gap-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <AppointmentEvent key={idx} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-center text-primary cursor-pointer" onClick={() => setSelectedEvent(dayEvents[0])}>
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={handlePrevMonth}>&lt;</Button>
        <div className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</div>
        <Button variant="outline" onClick={handleNextMonth}>&gt;</Button>
      </div>
      <div className="grid grid-cols-7 mb-2 text-xs font-bold text-center text-muted-foreground">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div>{rows}</div>
      {selectedEvent && (
        <AppointmentEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}; 