"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Determina il tema in base all'ora locale
// Dark mode: 20:00 - 06:00, Light mode: 06:00 - 20:00
function getThemeByTime(): Theme {
  const hour = new Date().getHours();
  // Notte: dalle 20:00 alle 05:59
  return (hour >= 20 || hour < 6) ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [hasUserPreference, setHasUserPreference] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    const hasPreference = localStorage.getItem("theme-user-set") === "true";

    if (hasPreference && savedTheme) {
      // Utente ha impostato manualmente il tema
      setTheme(savedTheme);
      setHasUserPreference(true);
    } else {
      // Nessuna preferenza utente, usa ora locale
      setTheme(getThemeByTime());
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Quando l'utente cambia manualmente, salva la preferenza
    setHasUserPreference(true);
    localStorage.setItem("theme-user-set", "true");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
