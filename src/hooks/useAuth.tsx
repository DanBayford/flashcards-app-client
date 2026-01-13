import { useContext } from "react";
import { AuthContext, type TAuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const context = useContext<TAuthContext | undefined>(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }

  return context;
};
