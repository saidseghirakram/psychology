"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import MoodHistory from "./MoodHistory";
import ReportsList from "./ReportsList";
import PatientHistory from "./PatientHistory";
import ChatWithAIModal from "./ChatWithAIModal";
import {
  Patient,
  Mood,
  Session,
  getRandomCondition,
  getRandomDateInFuture,
  getRandomSessions,
  getRandomDiagnosis,
  getRandomTherapyType,
  getRandomTreatmentPlan,
} from "./patientUtils";

interface Message {
  date: string;
  text: string;
}
interface HistoryReport {
  id: number;
  doctor_id: number;
  patient_id: number;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export default function PatientDetailsPage() {
  const params = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [moodHistory, setMoodHistory] = useState<Mood[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [therapyType, setTherapyType] = useState("");
  const [historyReports, setHistoryReports] = useState<HistoryReport[]>([]);
  const [showChatModal, setShowChatModal] = useState(false);

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

            const moods = await fetchPatientMoods(found.id, token || "");
            setMoodHistory(moods);

            setSessions(getRandomSessions());
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

  useEffect(() => {
    async function fetchHistory() {
      if (!patient) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.history) {
          setHistoryReports(
            data.history.filter((h: HistoryReport) => h.patient_id === patient.id)
          );
        } else {
          setHistoryReports([]);
        }
      } catch {
        setHistoryReports([]);
      }
    }
    fetchHistory();
  }, [patient]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-8 text-center text-lg font-semibold text-primary border rounded-xl shadow bg-background">Loading...</div>
      </div>
    );
  }

  if (!params || !params.patientId) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-8 text-center text-lg font-semibold text-red-500 border rounded-xl shadow bg-background">
          Invalid patient URL.
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-8 text-center text-lg font-semibold text-red-500 border rounded-xl shadow bg-background">Patient not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-8xl flex flex-col gap-8">
      <button
        className="mb-4 px-4 py-2 bg-primary text-white rounded"
        onClick={() => setShowChatModal(true)}
      >
        Chat with AI about this patient
      </button>
      <PatientCard patient={patient} />
      <MoodHistory moodHistory={moodHistory} />
      <ReportsList patientName={patient.fullName} historyReports={historyReports} />
      <PatientHistory
        sessions={sessions}
        moodHistory={moodHistory}
        diagnosis={diagnosis}
        therapyType={therapyType}
        treatmentPlan={treatmentPlan}
      />
      <ChatWithAIModal
        open={showChatModal}
        onClose={() => setShowChatModal(false)}
        reports={historyReports}
        patientName={patient.fullName}
      />
    </div>
  );
}
