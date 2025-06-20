"use client";

import { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFullName(localStorage.getItem("fullName") || "");
    setEmail(localStorage.getItem("email") || "");
    setAccountType(localStorage.getItem("accountType") || "Doctor");
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!id || !token) {
      toast.error("Authentication missing.");
      setLoading(false);
      return;
    }

    const updatedData = { fullName, email };

    try {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update");
      }

      localStorage.setItem("fullName", result.doctor.fullName);
      localStorage.setItem("email", result.doctor.email);
      toast.success("Doctor info updated successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType" className="text-sm font-medium text-gray-700">Account Type</Label>
                  <Input
                    id="accountType"
                    value={accountType || "Doctor"}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="pt-4">
                  <Button
                    onClick={handleSaveChanges}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "SAVE NEW CHANGES"
                    )}
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
                <p className="text-gray-600">Manage your password and account security settings.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
