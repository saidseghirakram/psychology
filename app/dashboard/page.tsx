import { redirect } from "next/navigation"

export default function DashboardPage() {
  redirect("/dashboard/overview")
  return null
} 