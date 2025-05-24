"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Camera, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <div className="relative group">
          <Avatar className="w-32 h-32 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="text-white w-8 h-8" />
            <span className="text-white text-xs mt-1">Click to change photo</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                Account Details
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input id="firstName" defaultValue="Ola" className="bg-gray-50 border-gray-300 text-primary rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input id="lastName" defaultValue="Boluwatife" className="bg-gray-50 border-gray-300 text-primary rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input id="email" type="email" defaultValue="Olaboluwatofezzy@ymail.com" className="bg-gray-50 border-gray-300 text-primary rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType" className="text-sm font-medium text-gray-700">Account Type</Label>
                  <Input id="accountType" defaultValue="Patient" disabled className="bg-gray-100 border-gray-300 text-primary rounded-lg cursor-not-allowed" />
                </div>
                <div className="pt-4">
                  <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-base">
                    SAVE NEW CHANGES
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-t mt-4">
              <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline py-4">
                <div className="flex justify-between items-center w-full">
                  <span>Security</span>
                  <ChevronRight className="h-5 w-5 text-primary transition-transform duration-200 accordion-chevron" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                {/* Security content will go here */}
                <p className="text-gray-600">Manage your password and account security settings.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
} 