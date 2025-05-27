'use client'; 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BellIcon, SearchIcon, SunIcon, MoonIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation"; 
import React from "react"; 
import { useTheme } from "@/contexts/ThemeContext";

const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/') {
    return "Overview"; 
  }
  const segments = pathname.split('/').filter(Boolean); 
  const lastSegment = segments.pop();

  if (!lastSegment) {
    return "Overview"; 
  }

  const title = lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  if (title.toLowerCase() === 'chat-ai') {
    return "Chat AI";
  }

  return title;
};

export function Navbar() {
  const pathname = usePathname();
  const pageTitle = getTitleFromPathname(pathname ?? '');
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="w-full shadow-sm bg-secondary p-4 my-4 rounded-lg dark:bg-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
         
        </div>

        <div className="flex flex-1 items-center justify-start mr-10 ">
          <div className="w-full">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="w-full rounded-lg bg-background pl-9 border-1 border-primary h-12 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="dark:hover:bg-gray-700">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="h-6 w-px bg-border dark:bg-gray-600" />
          <div className="flex items-center space-x-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>OB</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none dark:text-white">Ola Boluwatife</p>
              <p className="text-xs text-muted-foreground dark:text-gray-400">PATIENT</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
             
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-between py-2">
        <h1 className="text-xl font-semibold text-primary dark:text-white">{pageTitle}</h1>
        <div className="flex items-center space-x-2">
          {isDarkMode ? (
            <MoonIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          )}
          <Switch 
            id="dark-mode-toggle" 
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
          />
          <Label 
            htmlFor="dark-mode-toggle" 
            className="text-sm text-muted-foreground dark:text-gray-400"
          >
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Label>
        </div>
      </div>
    </header>
  );
} 