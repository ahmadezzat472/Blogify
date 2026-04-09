import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
