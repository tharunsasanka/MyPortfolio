import { api } from "@/services/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  role: "admin";
};

export type LoginResponse = {
  message: string;
  token: string;
  admin: Admin;
};

export async function loginAdmin(payload: LoginPayload) {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}

export async function getCurrentAdmin() {
  const response = await api.get<{ admin: Admin }>("/auth/me");
  return response.data.admin;
}