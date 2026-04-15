import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../ui/button";
import NavLinks from "./NavLinks";
import Logo from "../Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <nav className="custom-container sticky top-0 right-0 left-0 z-50 py-4 backdrop-blur-xs">
      <div className="relative">
        <div className="flex items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg transition-shadow duration-300">
          <Logo />

          <NavLinks />

          <div className="flex items-center gap-3">
            {!loading && user ? (
              <>
                <span className="hidden text-sm font-semibold md:block">
                  Hi,{" "}
                  <span className="text-primary-700">
                    {user.email?.split("@")[0]}
                  </span>
                </span>

                <Button onClick={handleLogout} variant={"destructive"}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="secondary"
              className={`transition-all duration-300 md:hidden ${
                menuOpen ? "rotate-90" : "rotate-0"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              ☰
            </Button>
          </div>
        </div>

        <div
          className={`absolute top-full right-0 z-50 w-full max-w-xs origin-top-right transform transition-all duration-300 ease-out md:hidden ${
            menuOpen
              ? "visible scale-100 opacity-100"
              : "invisible scale-95 opacity-0"
          }`}
          style={{
            marginTop: menuOpen ? "0.5rem" : "0",
          }}
        >
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <NavLinks className="flex flex-col items-center justify-center gap-3" />
            {!loading && user && (
              <div className="mt-4 border-t pt-4">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full transition-transform duration-200 hover:scale-105"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
