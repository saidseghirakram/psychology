'use client';

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/navbar";
import { AuthGuard } from "@/app/components/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthGuard>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-y-auto px-6">
            <Navbar />
            <main className="flex-1 p-3">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </ThemeProvider>
  );
}

