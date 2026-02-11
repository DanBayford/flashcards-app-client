import { useEffect } from "react";
import { useAuth } from "@/hooks";
import LargeLogo from "@/assets/img/logo-large.svg?react";
import SmallLogo from "@/assets/img/logo-small.svg?react";
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
    <div className="w-[90%] md:w-100 mx-auto flex flex-col gap-4 items-center mt-20">
      <div className="flex w-[90%] md:w-full justify-center p-3 bg-white brutal-shadow rounded-md">
        <LargeLogo className="hidden sm:block" />
        <SmallLogo className="sm:hidden" />
      </div>
      <main className="w-[90%] md:w-full p-3 bg-white brutal-shadow rounded-md">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
