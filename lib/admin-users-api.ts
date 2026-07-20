import { apiFetch } from "./api";

export type AdminUserType = "admin" | "cleaner";

export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  age: number | null;
  address: string | null;
  salary: string | null;
  status: "active" | "inactive";
  type: AdminUserType;
}

export interface CreateAdminUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  address?: string;
  salary?: string;
  type: AdminUserType;
}

export interface UpdateAdminUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  address?: string;
  salary?: string;
  status?: "active" | "inactive";
  type?: AdminUserType;
}

export function listUsers(accessToken: string) {
  return apiFetch<AdminUser[]>("/admin/users", { accessToken });
}

export function getUser(accessToken: string, id: number) {
  return apiFetch<AdminUser>(`/admin/users/${id}`, { accessToken });
}

export function createUser(accessToken: string, payload: CreateAdminUserPayload) {
  return apiFetch<AdminUser>("/admin/users", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateUser(
  accessToken: string,
  id: number,
  payload: UpdateAdminUserPayload,
) {
  return apiFetch<AdminUser>(`/admin/users/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deactivateUser(accessToken: string, id: number) {
  return apiFetch<AdminUser>(`/admin/users/${id}`, {
    method: "DELETE",
    accessToken,
  });
}
