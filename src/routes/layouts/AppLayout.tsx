import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { Header } from "@/components";
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
    <div className="p-4">
      <Header />
      <main className="w-full grid max-w-250 mx-auto grid-cols-4 md:grid-cols-[repeat(9,minmax(60px,1fr))] gap-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
