import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number;
}

export const isAuthenticated = (): boolean => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");

    if (!auth || !auth.user) return false;
    return true;
  } catch (e) {
    return false;
  }
};
