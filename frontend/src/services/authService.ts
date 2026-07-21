import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};