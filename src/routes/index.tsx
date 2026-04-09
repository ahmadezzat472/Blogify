import AuthLayout from "@/features/auth/layout"
import LoginPage from "@/features/auth/pages/Login"
import RegisterPage from "@/features/auth/pages/Register"
import HomePage from "@/features/home/HomePage"
import MainLayout from "@/layouts"
import { Route, Routes } from "react-router"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
