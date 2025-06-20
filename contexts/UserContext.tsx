'use client';
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  accountType?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (fields: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const id = localStorage.getItem("id");
    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");
    const accountType = localStorage.getItem("accountType") || "Doctor";
    if (id && fullName && email) {
      setUser({ id, fullName, email, accountType });
    }
  }, []);

  // Helper to update only some fields
  const updateUser = (fields: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      // Also update localStorage for persistence
      if (fields.fullName) localStorage.setItem("fullName", fields.fullName);
      if (fields.email) localStorage.setItem("email", fields.email);
      if (fields.accountType) localStorage.setItem("accountType", fields.accountType);
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}