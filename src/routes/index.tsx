import MainLayout from "@/layouts"
import Home from "@/pages/Home"
import { Route, Routes } from "react-router"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  )
}
