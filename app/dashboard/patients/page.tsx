import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Link from "next/link";

const patients = [
	{ name: "Abdelkader Bensalem", condition: "Depression" },
	{ name: "Yasmine Bouzid", condition: "Anxiety" },
	{ name: "Karim Belkacem", condition: "Stress" },
	{ name: "Nassima Haddad", condition: "Bipolar Disorder" },
	{ name: "Samir Tlemceni", condition: "Anxiety" },
	{ name: "Rania Mekhloufi", condition: "Stress" },
	{ name: "Walid Chikhi", condition: "Adolescent Behavioral Issues" },
	{ name: "Amina Cheriet", condition: "Panic Attacks" },
];

export default function PatientsPage() {
	return (
		<div className="container mx-auto p-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{patients.map((patients, index) => (
					<Card key={index} className="flex flex-col items-center p-6">
						<div className="relative mb-4">
							<Avatar className="w-24 h-24">
								<AvatarImage
									src={`https://api.dicebear.com/7.x/initials/svg?seed=${patients.name.split(" ").join("+")}`}
									alt={patients.name}
								/>
								<AvatarFallback>
									{patients.name.split(" ").map((n) => n[0]).join("")}
								</AvatarFallback>
							</Avatar>
							<span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></span>
						</div>
						<div className="text-center mb-4">
							<p className="font-semibold text-lg">{patients.name}</p>
							<p className="text-sm text-primary">{patients.condition}</p>
						</div>
						<CardFooter className="flex flex-col space-y-2 w-full p-0">
							<Button
								asChild
								variant="outline"
								className="w-full"
							>
								<Link
									href={`/dashboard/patients/${encodeURIComponent(
										patients.name
									)}/chat`}
								>
									CHAT
								</Link>
							</Button>
							<Button className="w-full">Details</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<div className="mt-8 flex justify-center">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
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