import api from "../api/api";
import { LoginResponse, SignupResponse } from "../types";


export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};



export const signupUser = async (
  full_name: string,
  email: string,
  password: string
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup", {
    full_name,
    email,
    password,
  });

  return response.data;
};