import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

const GuestRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default GuestRoute;
