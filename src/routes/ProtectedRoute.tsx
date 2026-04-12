import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/shared/Loading";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
