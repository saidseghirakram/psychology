'use client';
import React, { useEffect, useState } from "react";
import Algeria from "@react-map/algeria";
import wilayasData from "@/data/wilayasData.json";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface Wilaya {
  name: string;
  code: string;
  lat: number;
  lng: number;
  zone: string;
  count: number;
  color: string;
}

const MapAlgeria: React.FC = () => {
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setWilayas(wilayasData as Wilaya[]);
  }, []);

  const cityColors = wilayas.reduce((acc, w) => {
    // If no specific color is set, use a light gray in light mode and darker gray in dark mode
    acc[w.name] = w.color || (isDarkMode ? "hsl(var(--secondary))" : "hsl(var(--muted))");
    return acc;
  }, {} as Record<string, string>);

  const analytics = wilayas.map(w => ({
    name: w.name,
    color: w.color || (isDarkMode ? "hsl(var(--secondary))" : "hsl(var(--muted))"),
    count: w.count,
  }));

  return (
    <Card className="w-full bg-secondary dark:bg-gray-800 border-0 shadow-md">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-4">
        {/* Map Section */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <div className="w-full max-w-[500px] bg-secondary dark:bg-gray-800 rounded-lg overflow-hidden">
            <Algeria
              type="select-single"
              size="100%"
              hoverColor="hsl(var(--primary))"
              selectColor="hsl(var(--primary))"
              cityColors={cityColors}
              strokeColor={isDarkMode ? "hsl(var(--border))" : "hsl(var(--foreground))"}
              hints
            />
          </div>
        </div>
    
        {/* Stats Section */}
        <div className="flex flex-wrap gap-3 w-full md:w-1/2 max-h-full overflow-y-auto px-1">
          {analytics.map(a => (
            <div
              key={a.name}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-background dark:bg-gray-700 shadow-sm w-full"
            >
              <div className="flex items-center gap-2">
                <span 
                  className="inline-block w-3 h-3 rounded-full" 
                  style={{ background: a.color }}
                />
                <span className="font-semibold text-xs text-foreground dark:text-gray-200">
                  {a.name}
                </span>
              </div>
              <span 
                className="font-bold text-xs" 
                style={{ color: a.color }}
              >
                {a.count} patients
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapAlgeria;
