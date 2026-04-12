import { NAV_LINKS } from "@/constants/navLinks";
import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <div className="hidden gap-4 md:flex">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            ` ${
              isActive
                ? "border-b-2 border-primary-600 font-semibold text-primary-700"
                : "font-medium text-gray-600 hover:text-primary-600"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
