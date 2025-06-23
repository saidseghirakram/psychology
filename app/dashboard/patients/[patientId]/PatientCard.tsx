import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { Patient } from "./patientUtils";

export default function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="flex flex-col items-center p-8 rounded-xl shadow bg-background border w-full">
      <div className="relative mb-4">
        <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.fullName)}`} alt={patient.fullName} />
          <AvatarFallback className="text-2xl">{patient.fullName.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-400 border-2 border-white shadow"></span>
      </div>
      <span className="font-bold text-xl text-foreground mb-1 text-center">{patient.fullName}</span>
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">{patient.condition}</span>
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        <span className="text-xs">Next appointment:</span>
        <span className="font-semibold text-primary text-sm">{patient.nextAppointment}</span>
      </div>
    </div>
  );
} 