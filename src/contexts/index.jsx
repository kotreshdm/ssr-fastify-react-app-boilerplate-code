import { ThemeProvider } from "./ThemeContext";

export const AppProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
