"use client";
import { useEffect, useState } from "react";
import { AppointmentsCalendar } from "@/components/ui/AppointmentsCalendar";
import { AppointmentEventData } from "@/components/ui/AppointmentEvent";

const types: AppointmentEventData["type"][] = [
  "emergency", "examination", "consultation", "routine", "sick"
];

function getRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}

interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  date: string;
  hour: string;
  created_at: string;
}

export default function AppointmentsPage() {
  const [events, setEvents] = useState<AppointmentEventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.appointments) {
          const mapped: AppointmentEventData[] = data.appointments.map((a: Appointment) => ({
            title: `Appointment`,
            date: a.date,
            time: a.hour ? a.hour.slice(0, 5) : undefined,
            type: getRandomType(),
            patient_id: a.patient_id,
          }));
          setEvents(mapped);
        }
      } catch {
        setEvents([]);
      }
      setLoading(false);
    }
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      <AppointmentsCalendar events={events} />
    </div>
  );
}