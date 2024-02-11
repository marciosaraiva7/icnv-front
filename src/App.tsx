import "./App.css";
// import { Toaster } from "./components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import RoutesConfig from "./routes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster position="top-center" richColors />
      <RoutesConfig />
    </ThemeProvider>
  );
}

export default App;
