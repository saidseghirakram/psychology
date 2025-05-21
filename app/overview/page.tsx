import { Donut } from "@/components/ui/donut"
import { BarChart } from "@/components/ui/barChart"
import { browserConfig, browserData, socialMediaConfig, socialMediaData } from "@/lib/data"

export default function OverviewPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Donut 
          data={browserData}
          config={browserConfig}
          title="DIAGNOSTICS"
          description="January - June 2024"
          trendingValue="5.2%"
          trendingText="this month"
          footerText="Showing browser distribution for the last 6 months"
        />
        <Donut 
          data={socialMediaData}
          config={socialMediaConfig}
          title="GENDERS"
          description="Current Month"
          trendingValue="8.7%"
          trendingText="this week"
          footerText="Showing follower distribution across platforms"
        />
      </div>
      <BarChart />
    </div>
  )
} 