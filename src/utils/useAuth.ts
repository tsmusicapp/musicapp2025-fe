import { jwtDecode } from "jwt-decode"
import { useLocalStorage } from "../context/LocalStorageContext";
import { useState } from "react";

interface DecodedToken {
  exp?: number;
}

interface AuthUser {
  user?: {
    role: string;
    id: string;
    name: string;
    email: string;
  };
}

export const useAuth = () => {
  const { getItem, setItem } = useLocalStorage();
  const [auth, setAuth] = useState<AuthUser>(getItem("auth", {}));

  const isAuthenticated = (): boolean => {
    try {
      if (!auth?.user) return false;
      setItem("auth", auth);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getUserRole = (): string | null => {
    try {
      if (!auth?.user) return null;
      return auth.user.role;
    } catch (e) {
      return null;
    }
  };

  const getCurrentUser = () => {
    try {
      if (!auth?.user) return null;
      return auth.user;
    } catch (e) {
      return null;
    }
  };

  return {
    isAuthenticated,
    getUserRole,
    getCurrentUser
  };
};
