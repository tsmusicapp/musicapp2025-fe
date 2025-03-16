import { API_URL } from "@/utils/env_var";


// AUTHENTICATION APIS 
export const RESGISTERUSER = `${API_URL}/v1/auth/register`;
export const LOGINUSER = `${API_URL}/v1/auth/login`;
export const LOGOUTUSER = `${API_URL}/v1/auth/logout`;