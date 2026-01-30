import { createContext } from "react";
import { type TUser } from "@/types";

export type TAuthContext = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  authReady: boolean;
  user: { id: string; email: string } | null;
  setUser: (user: TUser | null) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);
