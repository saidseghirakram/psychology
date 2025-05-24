import Donut from "@/components/ui/donut"
import { BarChart } from "@/components/ui/barChart"
import { browserData, browserConfig, socialMediaData, socialMediaConfig } from "@/lib/data"

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mt-2">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 col-span-2">
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
      <BarChart />
    </div>
  )
} 