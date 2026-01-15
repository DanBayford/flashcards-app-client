import { NavLink } from "react-router";
import api from "@/lib/api";
import { Button } from "./ui/button";
import LargeIcon from "@/assets/img/logo-large.svg?react";
import SmallIcon from "@/assets/img/logo-small.svg?react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const logoutHandler = async () => {
    await api.User.logout();
  };
  return (
    <header className="max-w-[1000px] mx-auto mb-4 flex justify-between items-center">
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
