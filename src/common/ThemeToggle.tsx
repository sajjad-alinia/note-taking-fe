import React from "react";
import { useTheme } from "../store/theme";

const SunIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" strokeWidth="2" />
    <path d="M12 2v2" strokeWidth="2" />
    <path d="M12 20v2" strokeWidth="2" />
    <path d="M4.93 4.93l1.41 1.41" strokeWidth="2" />
    <path d="M17.66 17.66l1.41 1.41" strokeWidth="2" />
    <path d="M2 12h2" strokeWidth="2" />
    <path d="M20 12h2" strokeWidth="2" />
    <path d="M4.93 19.07l1.41-1.41" strokeWidth="2" />
    <path d="M17.66 6.34l1.41-1.41" strokeWidth="2" />
  </svg>
);

const MoonIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="px-2 py-1 rounded-md border transition-time flex items-center gap-2"
    >
      {theme === "dark" ? (
        <>
          <MoonIcon className="h-4 w-4 text-current" />
          <span className="text-sm">روشن</span>
        </>
      ) : (
        <>
          <SunIcon className="h-4 w-4 text-current" />
          <span className="text-sm">تاریک</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
