import { ThemeProvider } from "@/components/theme-provider.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
