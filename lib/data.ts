export type ChartDataItem = {
  browser: string
  visitors: number
  fill: string
}

export type ChartConfigItem = {
  label: string
  color: string
}

export const browserData = [
  { name: "Stress", value: 110 },
  { name: "Mood", value: 90 },
  { name: "Behavior", value: 70 },
  { name: "Sleep", value: 50 },
  { name: "Other", value: 25 }
];

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
export const socialMediaData = [
  { name: "Male", value: 120 },
  { name: "Female", value: 140 },
  { name: "Children", value: 35 }
];

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

// Data for bar chart
export const barChartData = [
  {
    name: "Jan",
    patients: 80,
    sessions: 120
  },
  {
    name: "Feb",
    patients: 90,
    sessions: 140
  },
  {
    name: "Mar",
    patients: 70,
    sessions: 110
  },
  {
    name: "Apr",
    patients: 85,
    sessions: 130
  },
  {
    name: "May",
    patients: 95,
    sessions: 150
  },
  {
    name: "Jun",
    patients: 75,
    sessions: 115
  }
]; 