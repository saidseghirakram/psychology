export type ChartDataItem = {
  browser: string
  visitors: number
  fill: string
}

export type ChartConfigItem = {
  label: string
  color: string
}

export const browserData: ChartDataItem[] = [
  { browser: "Stress", visitors: 110, fill: "hsl(var(--chart-1))" },
  { browser: "Mood", visitors: 90, fill: "hsl(var(--chart-2))" },
  { browser: "Behavior", visitors: 70, fill: "hsl(var(--chart-3))" },
  { browser: "Sleep", visitors: 50, fill: "hsl(var(--chart-4))" },
  { browser: "Other", visitors: 25, fill: "hsl(var(--chart-5))" },
]

export const browserConfig = {
  visitors: {
    label: "Patients",
  },
  Stress: {
    label: "Stress",
    color: "hsl(var(--chart-1))",
  },
  Mood: {
    label: "Mood",
    color: "hsl(var(--chart-2))",
  },
  Behavior: {
    label: "Behavior",
    color: "hsl(var(--chart-3))",
  },
  Sleep: {
    label: "Sleep",
    color: "hsl(var(--chart-4))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

// Example data for other pages/charts
export const socialMediaData: ChartDataItem[] = [
  { browser: "Male", visitors: 120, fill: "hsl(var(--chart-1))" },
  { browser: "Female", visitors: 140, fill: "hsl(var(--chart-2))" },
  { browser: "Children", visitors: 35, fill: "hsl(var(--chart-3))" },
]

export const socialMediaConfig = {
  visitors: {
    label: "Patients",
  },
  Male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  Female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
  Children: {
    label: "Children",
    color: "hsl(var(--chart-3))",
  },
} 