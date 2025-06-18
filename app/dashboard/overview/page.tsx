"use client"

import { useEffect, useState } from "react"
import Donut from "@/components/ui/donut"
import { BarChart } from "@/components/ui/barChart"
import MapAlgeria from "@/components/layout/Map"
import {
  browserData as originalBrowserData,
  browserConfig as originalBrowserConfig,
  socialMediaData as originalSocialMediaData,
  socialMediaConfig as originalSocialMediaConfig
} from "@/lib/data"

export default function OverviewPage() {
  const [isDoctor27, setIsDoctor27] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const storedId = localStorage.getItem("id")
      if (storedId && parseInt(storedId) === 27) {
        setIsDoctor27(true)
      } else {
        setIsDoctor27(false)
      }
    } catch (err) {
      console.error("Error reading id from localStorage", err)
      setIsDoctor27(false)
    }
  }, [])

  const browserData = isDoctor27 ? originalBrowserData : []
  const browserConfig = isDoctor27 ? originalBrowserConfig : {}

  const socialMediaData = isDoctor27 ? originalSocialMediaData : []
  const socialMediaConfig = isDoctor27 ? originalSocialMediaConfig : {}

  // Optional: show nothing while checking localStorage
  if (isDoctor27 === null) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mt-2">
      <div className="col-span-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Donut 
            data={browserData}
            config={browserConfig}
            title="DIAGNOSTICS"
            description="January - June 2024"
            trendingValue="5.2%"
            trendingText="this month"
            footerText="Showing diagnostic distribution for the last 6 months"
          />
          <Donut 
            data={socialMediaData}
            config={socialMediaConfig}
            title="GENDERS"
            description="Current Month"
            trendingValue="8.7%"
            trendingText="this week"
            footerText="Showing gender distribution of patients"
          />
        </div>
        <div className="w-full rounded-xl p-4">
          <MapAlgeria />
        </div>
      </div>
      <div className="h-full">
        <BarChart />
      </div>
    </div>
  )
}
