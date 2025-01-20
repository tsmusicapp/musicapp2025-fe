import { jwtDecode } from "jwt-decode"
import { useLocalStorage } from "./context/LocalStorageContext";
import { useState } from "react";

interface DecodedToken {
  exp?: number;
}

export const isAuthenticated = (): boolean => {
  try{
    const { getItem, setItem } = useLocalStorage();
    const [auth, setAuth] = useState<any>(getItem("auth", null));
    
    if( !auth.user ) return false;
    else if(auth.user) {
      return true;
    }
  }catch(e) {
    return false;
  }
  return false;
}