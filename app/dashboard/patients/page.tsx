"use client";
import { useEffect, useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Link from "next/link";

const conditions = [
  "Depression", "Anxiety", "Stress", "Bipolar Disorder", "Panic Attacks",
  "Adolescent Behavioral Issues", "OCD", "PTSD", "Eating Disorder", "Phobia"
];

const moodEmojiMap: Record<string, string> = {
  happy: "😊",
  sad: "😔",
  angry: "😡",
  neutral: "😐",
  excited: "😃",
  tired: "😴",
  shy: "😣",
  preservative: "🙂",
};

function getLast7Days() {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      day: dayNames[d.getDay()],
      date: d.getDate().toString().padStart(2, "0"),
      full: d.toISOString().split("T")[0],
    });
  }
  return days;
}

interface Mood {
  day: string;
  overall_mood: string;
}

interface Patient {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  password: string;
  doctor_id: number;
  moodHistory?: Mood[];
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const last7Days = getLast7Days();

  async function fetchPatientMoods(patientId: number, token: string) {
    try {
      const res = await fetch(`/api/moods/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data?.moods || [];
    } catch {
      return [];
    }
  }

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      try {
        const res = await fetch("/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const enrichedPatients = await Promise.all(data.patients.map(async (p: Patient) => {
          const moods = await fetchPatientMoods(p.id, token);
          return { ...p, moodHistory: moods };
        }));

        setPatients(enrichedPatients);
      } catch {
        // handle error
      }
      setLoading(false);
    }
    fetchPatients();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {patients.map((patient) => {
          const patientCondition = conditions[Math.floor(Math.random() * conditions.length)];
          const patientEmojis = last7Days.map(({ full }) => {
            const mood = patient.moodHistory?.find(m => m.day === full);
            return mood ? (moodEmojiMap[mood.overall_mood.toLowerCase()] || "❓") : "–";
          });

          return (
            <Card
              key={patient.id}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-background/90 w-full max-w-md mx-auto"
            >
              <div className="flex w-full items-center gap-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.fullName)}`}
                      alt={patient.fullName}
                    />
                    <AvatarFallback>
                      {patient.fullName.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></span>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-semibold text-lg leading-tight">{patient.fullName}</span>
                  <span className="text-sm text-primary mt-1">{patientCondition}</span>
                </div>
              </div>
              <div className="flex items-end justify-center gap-1 mb-4 mt-1 w-full max-w-[340px] mx-auto">
                {last7Days.map((d, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center
                      ${i === 6
                        ? "bg-primary text-white"
                        : "border border-primary/30 bg-background text-foreground"}
                      rounded-full shadow
                    `}
                    style={{ width: 36, height: 48, minWidth: 36, minHeight: 48 }}
                  >
                    <span className="text-[10px] font-medium leading-none mt-1">{d.day}</span>
                    <span className="text-[10px] leading-none">{d.date}</span>
                    <span className="text-base leading-none mt-1">{patientEmojis[i]}</span>
                  </div>
                ))}
              </div>
              <CardFooter className="flex flex-row w-full p-0 gap-2 mt-2">
                <Button asChild variant="outline" className="w-1/2">
                  <Link href={`/dashboard/patients/${patient.id}/chat`}>
                    CHAT
                  </Link>
                </Button>
                <Button asChild className="w-1/2">
                  <Link href={`/dashboard/patients/${encodeURIComponent(patient.fullName)}`}>
                    Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>...</PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
