import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading/Loading";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading fullPage text="Checking authentication..." />;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
