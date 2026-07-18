import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

export const ProtectedRoute = () => {
  const { user, initialized } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!initialized) return <div className="page container"><div className="feed-status">Checking your session…</div></div>;
  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />;
  return <Outlet />;
};
