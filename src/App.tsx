import "./App.css";
import RoutesConfig from "./routes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RoutesConfig />
    </ThemeProvider>
  );
}

export default App;
