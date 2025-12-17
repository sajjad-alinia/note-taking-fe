import React from "react";
import { MoonIcon, SunIcon } from "../../icons";
import { useTheme } from "../../store/theme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="px-2 py-1 rounded-md border border-text cursor-pointer transition-time flex items-center gap-2"
    >
      {theme === "dark" ? (
        <>
          <MoonIcon className="h-4 w-4 text-text" />
          <span className="text-sm text-text">روشن</span>
        </>
      ) : (
        <>
          <SunIcon className="h-4 w-4 text-text" />
          <span className="text-sm text-text">تاریک</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
