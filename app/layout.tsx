'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}>
        <div className="flex h-screen">
          {/* Fixed Sidebar */}
          <div className="fixed top-0 left-0 z-40">
            <Sidebar />
          </div>

          {/* Main content with left margin matching sidebar width */}
          <main className="flex-1 overflow-y-auto ml-0 md:ml-[70px] transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
