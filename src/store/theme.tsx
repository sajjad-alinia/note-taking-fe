import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Keep both a class and data attribute so Tailwind dark mode and CSS vars stay in sync
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const toggleTheme = () =>
    setThemeState((s) => (s === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeProvider;
