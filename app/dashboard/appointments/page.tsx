"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppointmentsCalendar } from "@/components/ui/AppointmentsCalendar";
import { AppointmentEventData } from "@/components/ui/AppointmentEvent";

interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  date: string;
  hour: string;
  created_at: string;
}

interface Patient {
  id: number;
  fullName: string;
}

const types: AppointmentEventData["type"][] = [
  "emergency",
  "examination",
  "consultation",
  "routine",
  "sick",
];

function getRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}

export default function AppointmentsPage() {
  const [events, setEvents] = useState<AppointmentEventData[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.appointments) {
          const mapped = data.appointments.map((a: Appointment) => ({
            title: "Appointment",
            date: a.date,
            time: a.hour?.slice(0, 5),
            type: getRandomType(),
            patient_id: a.patient_id,
          }));
          setEvents(mapped);
        }
      } catch (error) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPatients() {
      try {
        const res = await fetch("/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.patients) {
          setPatients(data.patients);
        }
      } catch (err) {
        console.error("Failed to load patients", err);
      }
    }

    fetchAppointments();
    fetchPatients();
  }, []);

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    if (!patientId || !date || !hour) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patient_id: Number(patientId),
          date,
          hour,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to create appointment");
        return;
      }

      alert("Appointment created!");
      setOpen(false);
      window.location.reload(); // Or refetch appointments instead of reload
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="w-full p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full">Add Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Appointment</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1">
              <Label>Patient</Label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="border border-gray-300 p-2 rounded-md bg-primary"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Hour</Label>
              <Input
                type="time"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
            </div>

            <Button onClick={handleCreate}>Create Appointment</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AppointmentsCalendar events={events} />
    </div>
  );
}
