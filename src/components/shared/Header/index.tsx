import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../ui/button";
import NavLinks from "./NavLinks";
import Logo from "../Logo";
import { Input } from "@/components/ui/input";

type User = {
  name: string;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    setUser({ name: "Ahmed" });
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <nav className="custom-container sticky top-0 right-0 left-0 z-50 py-4 backdrop-blur-xs">
      <div className="flex items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Search (desktop only) */}
          <Input
            placeholder="Search..."
            className="hidden bg-background/50 md:block md:w-32 lg:w-40"
          />

          {/* Auth */}
          {user ? (
            <>
              <span className="hidden text-sm font-semibold md:block">
                Hi, {user.name}
              </span>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-gray-200 px-4 py-1 text-sm hover:bg-gray-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin}>Login</Button>
              <Button variant={"outline"}>Register</Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-xl bg-white p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/posts" onClick={() => setMenuOpen(false)}>
              Explore
            </Link>

            <Link to="/news" onClick={() => setMenuOpen(false)}>
              Trending
            </Link>

            <div className="flex flex-col gap-3 border-t pt-4">
              {user ? (
                <>
                  <span>Hi, {user.name}</span>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button onClick={handleLogin}>Login</Button>
                  <Button className="rounded bg-primary-600 px-3 py-1 text-white">
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
