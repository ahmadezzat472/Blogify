import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
