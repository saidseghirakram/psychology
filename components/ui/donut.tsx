"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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

  const [innerRadius, setInnerRadius] = React.useState(60);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
    
      if (width < 480) {
        setInnerRadius(70); 
      } else if (width < 768) {
        setInnerRadius(70); 
      } else if (width < 1024) {
        setInnerRadius(70); 
      } else if (width < 1440) {
        setInnerRadius(80); 
      } else {
      }
    };
    

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>


      
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-auto w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={innerRadius}
              strokeWidth={115}
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
                          className="fill-foreground text-3xl font-normal md:font-bold  "
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm md:text-base"
                        >
                          {config.visitors.label}
                        </tspan>
                      </text>
                    )
                  }

                  
                  return undefined;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        
      </CardContent>




      <CardFooter className="flex-col gap-2 text-sm ">
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
