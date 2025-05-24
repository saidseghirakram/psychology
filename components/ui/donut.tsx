"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"
import type { LabelProps } from "recharts"

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
import { ChartDataItem } from "@/lib/data"

interface DonutProps {
  data: ChartDataItem[]
  config: ChartConfig
  title: string
  description?: string
  trendingValue?: string
  trendingText?: string
  footerText?: string
}

export function Donut({
  data,
  config,
  title,
  description = "January - June 2024",
  trendingValue = "5.2%",
  trendingText = "this month",
  footerText = "Showing total visitors for the last 6 months"
}: DonutProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [data])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center py-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex items-center justify-center content-center ">
        <div className="flex-1 flex items-center justify-center ">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius="65%"
                  outerRadius="95%"
                  cx="50%"
                  cy="50%"
                  startAngle={20}
                  endAngle={450}
                >
                  <Label
                    content={(props: LabelProps) => {
                      const { viewBox } = props;
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-semibold md:text-4xl sm:text-2xl"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              {config.visitors.label}
                            </tspan>
                          </text>
                        );
                      }
                      return undefined;
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>




      <CardFooter className="flex-col gap-2 text-sm pb-8">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by {trendingValue} {trendingText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {footerText}
        </div>
      </CardFooter>
    </Card>
  )
}
