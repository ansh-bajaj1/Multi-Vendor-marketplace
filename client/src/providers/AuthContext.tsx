"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  accessToken: string | null;
  user: { id: string; email: string; name: string } | null;
  setAuth: (token: string, user: { id: string; email: string; name: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const setAuth = (token: string, userData: { id: string; email: string; name: string }) => {
    setAccessToken(token);
    setUser(userData);
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
