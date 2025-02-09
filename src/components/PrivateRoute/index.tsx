import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
