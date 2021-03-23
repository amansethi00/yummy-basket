import {createContext, useContext, useState} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    console.log("toggle");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}