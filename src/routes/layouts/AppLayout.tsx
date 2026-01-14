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
      <main className="grid w-full max-w-[1000px] mx-auto grid-cols-[repeat(9,minmax(60px,1fr))] gap-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
