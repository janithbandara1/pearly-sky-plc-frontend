"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "dark" | "light";

interface PoolThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const PoolThemeContext = createContext<PoolThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function PoolThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // Sync with document element or localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pool-theme-mode") as ThemeMode | null;
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("pool-theme-mode", newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    handleSetTheme(nextTheme);
  };

  return (
    <PoolThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </PoolThemeContext.Provider>
  );
}

export function usePoolTheme() {
  return useContext(PoolThemeContext);
}
