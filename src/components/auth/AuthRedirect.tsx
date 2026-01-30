import { Navigate } from "react-router";
import { useAuth } from "@/hooks";

export const AuthRedirect = () => {
  const { accessToken } = useAuth();

  return accessToken ? <Navigate to="/quiz" /> : <Navigate to="/login" />;
};
