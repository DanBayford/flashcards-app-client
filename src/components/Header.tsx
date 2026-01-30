import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/hooks";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import LargeIcon from "@/assets/img/logo-large.svg?react";
import SmallIcon from "@/assets/img/logo-small.svg?react";

export const Header = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const logoutHandler = async () => {
    // Clear BE state
    await api.User.logout();
    // Clear FE state
    logoutUser();
    // Redirect to login
    navigate("/login");
  };

  return (
    <header className="max-w-250 mx-auto mb-4 flex justify-between items-center">
      <LargeIcon className="hidden sm:block" />
      <SmallIcon className="sm:hidden" />
      <nav className="brutal-shadow bg-white rounded-4xl">
        <ul className="flex gap-1 px-1 py-4 font-semibold">
          <li>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                cn("px-3 py-3 rounded-4xl", isActive ? "bg-yellow-400" : "")
              }
            >
              Study Mode
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/questions"
              className={({ isActive }) =>
                cn("px-3 py-3 rounded-4xl", isActive ? "bg-yellow-400" : "")
              }
            >
              All Cards
            </NavLink>
          </li>
        </ul>
      </nav>
      <Button onClick={logoutHandler}>Log out</Button>
    </header>
  );
};
