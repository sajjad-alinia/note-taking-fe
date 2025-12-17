import React from "react";
import { MoonIcon, SunIcon } from "../../icons";
import { useTheme } from "../../store/theme";

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
