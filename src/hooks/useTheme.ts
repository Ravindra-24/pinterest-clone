import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("curiofold-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("curiofold-theme", theme);
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((value) => (value === "dark" ? "light" : "dark")) };
};
