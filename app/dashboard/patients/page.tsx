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

const emotionData = [
	{ day: "Sat", date: "07", emoji: "😊" },
	{ day: "Fri", date: "06", emoji: "😣" },
	{ day: "Thu", date: "05", emoji: "😁" },
	{ day: "Wed", date: "04", emoji: "😡", active: true },
	{ day: "Tue", date: "03", emoji: "🙂" },
	{ day: "Mon", date: "02", emoji: "😐" },
	{ day: "Sun", date: "01", emoji: "😴" },
];

export default function PatientsPage() {
	return (
		<div className="container mx-auto p-2">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{patients.map((patient, index) => (
					<Card
						key={index}
						className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-background/90 w-full max-w-md mx-auto"
					>
						{/* Top row: Avatar + Info */}
						<div className="flex w-full items-center gap-4 mb-4">
							<div className="relative">
								<Avatar className="w-16 h-16">
									<AvatarImage
										src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name.split(" ").join("+")}`}
										alt={patient.name}
									/>
									<AvatarFallback>
										{patient.name.split(" ").map((n) => n[0]).join("")}
									</AvatarFallback>
								</Avatar>
								<span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></span>
							</div>
							<div className="flex flex-col justify-center flex-1">
								<span className="font-semibold text-lg leading-tight">{patient.name}</span>
								<span className="text-sm text-primary mt-1">{patient.condition}</span>
							</div>
						</div>
						{/* Emotion tracker */}
						<div className="flex items-end justify-center gap-1 mb-4 mt-1 w-full max-w-[340px] mx-auto">
							{emotionData.map((emo, i) => (
								<div
									key={i}
									className={`flex flex-col items-center justify-center
										${emo.active
											? "bg-primary text-white"
											: "border border-primary/30 bg-background text-foreground"}
										rounded-full shadow
									`}
									style={{
										width: 36,
										height: 48,
										minWidth: 36,
										minHeight: 48,
									}}
								>
									<span className="text-[10px] font-medium leading-none mt-1">{emo.day}</span>
									<span className="text-[10px] leading-none">{emo.date}</span>
									<span className="text-base leading-none mt-1">{emo.emoji}</span>
								</div>
							))}
						</div>
						{/* Buttons */}
						<CardFooter className="flex flex-row w-full p-0 gap-2 mt-2">
							<Button
								asChild
								variant="outline"
								className="w-1/2"
							>
								<Link
									href={`/dashboard/patients/${encodeURIComponent(
										patient.name
									)}/chat`}
								>
									CHAT
								</Link>
							</Button>
							<Button className="w-1/2">Details</Button>
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