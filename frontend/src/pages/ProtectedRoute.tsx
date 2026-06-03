import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "store/store";

const ProtectedRoute = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  //   not logged in user
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
