import { Link } from "react-router";

interface LogoProps {
  size?: "small" | "medium" | "large";
  type?: "link" | "text";
}

const Logo = ({ size = "medium", type = "link" }: LogoProps) => {
  const className = `font-black text-primary-700 ${
    size === "small" ? "text-lg" : size === "large" ? "text-3xl" : "text-2xl"
  }`;

  if (type === "text") {
    return <span className={className}>Prisma</span>;
  }

  return (
    <Link to={"/"} className={className}>
      Prisma
    </Link>
  );
};

export default Logo;
