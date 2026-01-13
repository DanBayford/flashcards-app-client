import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { useNavigate, Outlet } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { accessToken, authReady } = useAuth();

  // Redirect to /quiz if already authenticated
  useEffect(() => {
    if (accessToken && authReady) {
      navigate("/quiz");
    }
  }, [accessToken, authReady, navigate]);

  return (
    <>
      <div>Auth layout</div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
