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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

export const browserConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

// Example data for other pages/charts
export const socialMediaData: ChartDataItem[] = [
  { browser: "facebook", visitors: 320, fill: "var(--color-facebook)" },
  { browser: "twitter", visitors: 245, fill: "var(--color-twitter)" },
  { browser: "instagram", visitors: 410, fill: "var(--color-instagram)" },
  { browser: "linkedin", visitors: 198, fill: "var(--color-linkedin)" },
  { browser: "other", visitors: 156, fill: "var(--color-other)" },
]

export const socialMediaConfig = {
  visitors: {
    label: "Followers",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-1))",
  },
  twitter: {
    label: "Twitter",
    color: "hsl(var(--chart-2))",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-3))",
  },
  linkedin: {
    label: "LinkedIn",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} 