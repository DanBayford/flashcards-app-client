import { useState, useEffect, type ReactNode } from "react";
import api from "@/lib/api";
import AccessToken from "@/lib/accessToken";
import type { TUser } from "@/types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    /*
    Request new access/refresh tokens on browser reload
    */
    const loadAuthOnMount = async () => {
      try {
        const res = await api.User.refresh({ failSilently: true });
        if (res?.accessToken && res?.userInfo) {
          setAccessToken(res.accessToken);
          AccessToken.set(res.accessToken);
          setUser(res.userInfo);
        } else {
          // Rethrow to catch
          throw Error();
        }
      } catch (e) {
        console.log("Error refreshing tokens", e);
      } finally {
        setAuthReady(true);
      }
    };
    loadAuthOnMount();
  }, []);

  // Keep external token variable (for axios interceptors) fresh
  useEffect(() => {
    if (accessToken) {
      AccessToken.set(accessToken);
    }
  }, [accessToken]);

  const logoutUser = () => {
    setAccessToken(null);
    setUser(null);
    setAuthReady(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        authReady,
        user,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
