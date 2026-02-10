import { useState, useEffect, type ReactNode } from "react";
import api from "@/lib/api";
import AccessToken from "@/lib/accessToken";
import { registerLogoutHandler } from "@/lib/auth";
import type { TUser } from "@/types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);

  const logoutUser = () => {
    setAccessToken(null);
    setUser(null);
    setAuthReady(false);
  };

  useEffect(() => {
    /*
    Request new access/refresh tokens on browser reload
    */
    const loadAuthOnMount = async () => {
      try {
        const res = await api.User.refresh({ failSilently: true });
        if (res?.accessToken && res?.userInfo) {
          // Set React state
          setAccessToken(res.accessToken);
          setUser(res.userInfo);
          // Set token in global scope so axios can access for authenticated requests
          AccessToken.set(res.accessToken);
          // Register logout fn with auth event bridge so axios can call if required
          registerLogoutHandler(logoutUser);
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
