import { createContext, useState, ReactNode } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("olena-theme") ?? "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("olena-theme", theme === "light" ? "dark" : "light");
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
