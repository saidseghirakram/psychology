'use client';
import React, { useEffect, useState } from "react";
import Algeria from "@react-map/algeria";
import wilayasData from "@/data/wilayasData.json";

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

  useEffect(() => {
    setWilayas(wilayasData as Wilaya[]);
  }, []);

  const cityColors = wilayas.reduce((acc, w) => {
    acc[w.name] = w.color || "#E5E7EB";
    return acc;
  }, {} as Record<string, string>);

  const analytics = wilayas.map(w => ({
    name: w.name,
    color: w.color || "#E5E7EB",
    count: w.count,
  }));

  return (
    <div className="w-full mt-4 bg-secondary rounded-lg px-4 py-4 shadow-lg">
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
      {/* Map Section */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <div className="w-full max-w-[500px]">
          <Algeria
            type="select-single"
            size={"100%" as any}
            hoverColor="#E9F7F6"
            selectColor="#4CB3A5"
            cityColors={cityColors}
            strokeColor="#22223B"
            hints
          />
        </div>
      </div>
  
      {/* Stats Section */}
      <div className="flex flex-wrap gap-3 w-full md:w-1/2 max-h-full overflow-y-auto px-1 ">
        {analytics.map(a => (
          <div
            key={a.name}
            className="flex items-center justify-between px-3 py-2 rounded-lg shadow-md sm:w-[48%] md:w-full"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: a.color }}></span>
              <span className="font-semibold text-xs text-gray-700">{a.name}</span>
            </div>
            <span className="font-bold text-xs" style={{ color: a.color }}>{a.count} patients</span>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default MapAlgeria;
