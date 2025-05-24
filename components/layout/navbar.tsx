'use client'; 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BellIcon, SearchIcon, SunIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation"; 
import React from "react"; 

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
  const pageTitle = getTitleFromPathname(pathname);

  // TODO: Implement dark mode toggle properly with ThemeProvider

  return (
    <header className=" w-full shadow-sm bg-secondary p-4 my-4 rounded-lg ">
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
                  className="w-full rounded-lg bg-background pl-9 border-1   border-primary h-12 shadow-sm"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center space-x-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>OB</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Ola Boluwatife</p>
              <p className="text-xs text-muted-foreground">PATIENT</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
             
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-between py-2">
        <h1 className="text-xl font-semibold text-primary">{pageTitle}</h1>
        <div className="flex items-center space-x-2">
          <SunIcon className="h-5 w-5" />
           <Switch id="dark-mode-toggle" />
          <Label htmlFor="dark-mode-toggle" className="text-sm text-muted-foreground">Apply Dark Theme</Label>
        </div>
      </div>
    </header>
  );
} 