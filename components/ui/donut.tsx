"use client"

import * as React from "react"
import { ResponsivePie } from "@nivo/pie"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DonutProps {
  title: string
  description: string
  trendingValue: string
  trendingText: string
  footerText: string
  data: { name: string; value: number }[]
  config: {
    [key: string]: {
      label: string
      color?: string
    }
  }
}

export function Donut({
  title,
  description,
  trendingValue,
  trendingText,
  footerText,
  data,
  config
}: DonutProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const isPositive = !trendingValue.startsWith("-")

  // Transform data for Nivo
  const chartData = data.map(item => ({
    id: item.name,
    label: config[item.name]?.label || item.name,
    value: item.value,
    color: config[item.name]?.color || undefined
  }))

  return (
    <Card className="w-full p-4 bg-secondary">
      <div className="flex flex-col gap-2 mb-4">
        <h4 className="text-sm text-muted-foreground">{title}</h4>
        <p className="text-xl font-semibold">{description}</p>
        <div className={cn("flex items-center text-sm", isPositive ? "text-green-600" : "text-red-600")}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span>{trendingValue}</span>
          <span className="ml-1 text-muted-foreground"> {trendingText}</span>
        </div>
      </div>

      <div className="relative h-[200px]">
        <ResponsivePie
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerRadius={0.6}
          padAngle={0.5}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
          }}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          theme={{
            tooltip: {
              container: {
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '12px',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                padding: '12px',
              },
            },
          }}
          tooltip={({ datum }) => (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: datum.color }}
                />
                <span className="font-medium">{datum.label}</span>
              </div>
              <div className="text-black text-sm">
                Value: {datum.value}
              </div>
              <div className="text-black text-xs">
                {Math.round((datum.value / total) * 100)}% of total
              </div>
            </div>
          )}
          transitionMode="startAngle"
          motionConfig="gentle"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="text-xl font-bold text-foreground">{total}</span>
            <p className="text-xs text-muted-foreground">{config.visitors?.label || 'Total'}</p>
          </div>
        </div>
      </div>

      <CardContent className="mt-4 text-sm text-muted-foreground text-center">
        {footerText}
      </CardContent>
    </Card>
  )
}

export default Donut
