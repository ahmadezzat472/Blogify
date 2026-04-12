import { ThemeProvider } from "@/components/theme-provider.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <App />
    </ThemeProvider>
  </StrictMode>
);
