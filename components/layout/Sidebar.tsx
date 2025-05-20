"use client";

import Link from "next/link";
import { SidebarIcon } from "../icons/SidebarIcons";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/data";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const ToggleButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
    <button
      className={cn(
        "h-6 w-6 flex items-center justify-center rounded-md text-primary hover:bg-primary/10",
        className
      )}
      {...props}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <path
          d="M3.5 2.5L8.5 7.5L3.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center justify-between px-4 border-b border-primary/20">
        <div className={cn("flex items-center gap-2", !isOpen && "md:hidden")}>
          <span className="text-xl font-bold tracking-tight text-primary">Psychology</span>
        </div>
        <ToggleButton
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        />
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-base font-medium",
                "hover:bg-primary/10 focus:bg-primary/20 outline-none",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-primary",
                !isOpen && "md:justify-center md:px-2"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <SidebarIcon
                iconName={item.icon}
                width={22}
                height={22}
                className={cn(
                  "shrink-0",
                  isActive ? "text-white" : "text-primary"
                )}
              />
              <span className={cn(
                "truncate",
                !isOpen && "md:hidden",
                isActive ? "text-white" : "text-primary"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Sheet */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open sidebar"
              className="inline-flex items-center justify-center rounded-md p-2 bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-secondary border-r border-primary/20">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex h-screen bg-secondary flex-col border-r border-primary/20 transition-all duration-300",
          isOpen ? "w-64" : "w-[70px]"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
} 