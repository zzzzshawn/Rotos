"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dark } from "@clerk/themes";


interface ThemeContextType {
  // will have mode and setmode(which is a function and it returns void)
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function Themeprovider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState(""); // useState to handle theme

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-colors-scheme: dark)").matches) // checks if "localStorage.theme" exists which we set up in theme.tsx, OR NO theme in localstorage AND matchmedia is dark
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark"); // add dark to classlist of browser, therefore it will render in darkmode
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ClerkProvider
        appearance={{
          baseTheme: mode === "light" ? dark : dark,
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be uused within ThemeProvider");
  }

  return context;
}
