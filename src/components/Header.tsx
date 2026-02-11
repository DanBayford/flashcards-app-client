import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/hooks";
import { Button } from "./ui/button";
import {
  CategoryIcon,
  LogoutIcon,
  QuestionIcon,
  StudyIcon,
} from "@/components/icons";
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
    <header className="w-[90%] max-w-250 mx-auto mb-4 flex flex-wrap justify-between items-center">
      <div className="w-full mb-4 sm:w-40 sm:mb-0 flex justify-between">
        <LargeIcon />
        <Button className="w-12 sm:hidden" onClick={logoutHandler}>
          <LogoutIcon size={40} />
        </Button>
      </div>

      <nav className="ml-auto sm:ml-0 brutal-shadow bg-white rounded-4xl">
        <ul className="flex gap-1 px-1 pt-2 pb-1 sm:py-4 font-semibold">
          <li>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                cn(
                  "rounded-4xl",
                  isActive
                    ? "bg-yellow-400 px-3 pt-7 pb-0 sm:py-3"
                    : "px-3 py-3",
                )
              }
            >
              <span className="hidden sm:inline-block">Study</span>
              <span className="inline-block sm:hidden">
                <StudyIcon size={40} />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/questions"
              className={({ isActive }) =>
                cn(
                  "rounded-4xl",
                  isActive
                    ? "bg-yellow-400 px-3 pt-7 pb-0 sm:py-3"
                    : "px-3 py-3",
                )
              }
            >
              <span className="hidden sm:inline-block">Cards</span>
              <span className="inline-block sm:hidden">
                <QuestionIcon size={40} />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                cn(
                  "rounded-4xl",
                  isActive
                    ? "bg-yellow-400 px-3 pt-7 pb-0 sm:py-3"
                    : "px-3 py-3",
                )
              }
            >
              <span className="hidden sm:inline-block">Categories</span>
              <span className="inline-block sm:hidden">
                <CategoryIcon size={40} />
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Button className="hidden sm:inline-block" onClick={logoutHandler}>
        Logout
      </Button>
    </header>
  );
};
