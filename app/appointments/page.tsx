import { AppointmentsCalendar } from "@/components/ui/AppointmentsCalendar";
import { AppointmentEventData } from "@/components/ui/AppointmentEvent";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; 
const pad = (n: number) => n.toString().padStart(2, "0");

const mockEvents: AppointmentEventData[] = [
  { title: "ANXIETY DISORDER CONSULTATION", date: `${year}-${pad(month)}-04`, time: "12:30", type: "emergency", patient: "Ahmed Bensalem" },
  { title: "MONTHLY THERAPY SESSION", date: `${year}-${pad(month)}-06`, time: "11:30", type: "routine", patient: "Nour Elhouda Amrani" },
  { title: "COGNITIVE BEHAVIORAL THERAPY", date: `${year}-${pad(month)}-06`, time: "14:00", type: "examination", patient: "Sofiane Mokrani" },
  { title: "FAMILY COUNSELING", date: `${year}-${pad(month)}-06`, time: "16:00", type: "consultation", patient: "Hana Belkacem" },
  { title: "FINAL PSYCHOLOGICAL EVALUATION", date: `${year}-${pad(month)}-01`, time: "9:00", type: "examination", patient: "Imane Bouzid" },
  { title: "MEDICATION FOLLOW-UP", date: `${year}-${pad(month)}-09`, time: "2:00", type: "consultation", patient: "Yacine Ziani" },
  { title: "DEPRESSION THERAPY", date: `${year}-${pad(month)}-12`, time: "9:30", type: "sick", patient: "Amel Rahmani" },
  { title: "DEPRESSION THERAPY", date: `${year}-${pad(month)}-13`, time: "9:30", type: "sick", patient: "Amel Rahmani" },
  { title: "DEPRESSION THERAPY", date: `${year}-${pad(month)}-14`, time: "9:30", type: "sick", patient: "Amel Rahmani" },
  { title: "SARA'S THERAPY SESSION", date: `${year}-${pad(month)}-15`, time: "4:00", type: "routine", patient: "Sara Mahrez" },
  { title: "BIPOLAR DISORDER CHECKUP", date: `${year}-${pad(month)}-15`, time: "10:00", type: "consultation", patient: "Karim Lounes" },
  { title: "POST-TRAUMATIC STRESS THERAPY", date: `${year}-${pad(month)}-15`, time: "13:00", type: "examination", patient: "Lina Haddad" },
  { title: "FOLLOW-UP FOR OCD", date: `${year}-${pad(month)}-19`, time: "1:00", type: "examination", patient: "Walid Boudiaf" },
  { title: "STRESS MANAGEMENT", date: `${year}-${pad(month)}-21`, time: "9:30", type: "consultation", patient: "Malek Zerguine" },
  { title: "SARA'S THERAPY SESSION", date: `${year}-${pad(month)}-25`, time: "11:00", type: "routine", patient: "Sara Mahrez" },
  { title: "ROUTINE PSYCHOTHERAPY", date: `${year}-${pad(month)}-16`, time: "9:00", type: "routine", patient: "Rania Cherif" },
  { title: "PANIC ATTACK EMERGENCY", date: `${year}-${pad(month)}-16`, time: "11:00", type: "emergency", patient: "Yasmine Dali" },
  { title: "ANGER MANAGEMENT COUNSELING", date: `${year}-${pad(month)}-16`, time: "13:00", type: "consultation", patient: "Adel Messaoudi" },
  { title: "THERAPY SESSION", date: `${year}-${pad(month)}-05`, time: "10:00", type: "routine", patient: "Sara Mahrez" },
  { title: "THERAPY SESSION", date: `${year}-${pad(month)}-15`, time: "15:00", type: "routine", patient: "Sara Mahrez" },
];


export default function AppointmentsPage() {
  return (
    <div className="p-6  ">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <AppointmentsCalendar events={mockEvents} />
    </div>
  );
} 