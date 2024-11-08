import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

export function AuthPage() {
  const { isUserLoggedIn } = useContext(AuthContext);
  if (!isUserLoggedIn) return <Navigate to={"/"} replace />;
  return <Outlet />;
}

export default AuthPage;
