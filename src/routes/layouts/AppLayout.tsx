import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { LogoutButton } from "@/components/auth";
import { useNavigate, Outlet } from "react-router";

const AppLayout = () => {
  const navigate = useNavigate();
  const { accessToken, authReady } = useAuth();

  // Redirect to /login if unauthenticated
  useEffect(() => {
    if (!accessToken && authReady) {
      navigate("/login");
    }
  }, [accessToken, authReady, navigate]);

  return (
    <>
      <div>
        App layout <LogoutButton />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
