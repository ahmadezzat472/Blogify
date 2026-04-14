import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="custom-container min-h-screen mt-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
