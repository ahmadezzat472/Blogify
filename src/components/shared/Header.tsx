import { useState } from "react";
import { Link, NavLink } from "react-router";
type User = {
  name: string;
};
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 simulate auth (replace with context later)
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    setUser({ name: "Ahmed" });
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/70 px-6 py-3 shadow-lg backdrop-blur-xl">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link to={"/"} className="text-2xl font-black text-blue-700">
            Prism
          </Link>

          {/* Desktop Links */}
          <div className="hidden gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold ${
                  isActive
                    ? "border-b-2 border-blue-600 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink to="/posts" className="text-gray-600 hover:text-blue-600">
              Explore
            </NavLink>

            <NavLink to="/news" className="text-gray-600 hover:text-blue-600">
              Trending
            </NavLink>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Search (desktop only) */}
          <div className="hidden items-center rounded-full bg-gray-100 px-3 py-1 md:flex">
            <input
              placeholder="Search..."
              className="w-32 bg-transparent px-2 text-sm outline-none"
            />
          </div>

          {/* Auth */}
          {user ? (
            <>
              <span className="hidden text-sm font-semibold md:block">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full bg-gray-200 px-4 py-1 text-sm hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="hidden rounded-full px-4 py-1 hover:bg-gray-100 md:block"
              >
                Login
              </button>

              <button className="hidden rounded-full bg-blue-600 px-4 py-1 text-white md:block">
                Register
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Menu */}
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
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={handleLogin}>Login</button>
                  <button className="rounded bg-blue-600 px-3 py-1 text-white">
                    Register
                  </button>
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
