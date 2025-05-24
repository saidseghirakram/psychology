import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const doctors = [
  { name: "haithem Attab", specialty: "Family Doctor" },
  { name: "HATOUMI BENYLS", specialty: "Heart Surgeon" },
  { name: "TAKTONI AMINE", specialty: "Health Specialist" },
  { name: "TAYEB TT", specialty: "Heart Surgeon" },
  { name: "TIBERKAK", specialty: "Health Specialist" },
  { name: "RAHIM MESAOUD", specialty: "Health Counsellor" },
  { name: "Dr. Banabas Paul", specialty: "General Care" },
  { name: "Dr. Ayo Jones", specialty: "Family Practioner" },
];

export default function PatientsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <Card key={index} className="flex flex-col items-center p-6">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name.split(' ').join('+')}`} alt={doctor.name} />
                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
            <div className="text-center mb-4">
              <p className="font-semibold text-lg">{doctor.name}</p>
              <p className="text-sm text-red-500">{doctor.specialty}</p>
            </div>
            <CardFooter className="flex flex-col space-y-2 w-full p-0">
              <Button variant="outline" className="w-full">CHAT</Button>
              <Button className="w-full">BOOK</Button>
            </CardFooter>
          </Card>
        ))}
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
            <PaginationItem>
              ...
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
} 