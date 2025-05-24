"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", newPatients: 14, sessions: 52 },
  { month: "February", newPatients: 18, sessions: 60 },
  { month: "March", newPatients: 11, sessions: 45 },
  { month: "April", newPatients: 16, sessions: 58 },
  { month: "May", newPatients: 20, sessions: 65 },
  { month: "June", newPatients: 15, sessions: 54 },
]

const chartConfig = {
  newPatients: {
    label: "New Patients",
    color: "hsl(var(--chart-1))",
  },
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChart() {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Monthly Patients & Sessions</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="newPatients" fill="var(--color-newPatients)" radius={4} />
            <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing new patients and sessions for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
