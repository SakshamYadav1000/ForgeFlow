import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  avatar_url: string | null;
  created_at: string;
}

export const login = async (
  data: LoginRequest
) => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (
  data: RegisterRequest
) => {
  const response = await api.post<UserResponse>(
    "/auth/register",
    data
  );

  return response.data;
};