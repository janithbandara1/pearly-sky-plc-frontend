import { apiFetch } from "./api";

export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface StaffUser {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  age: number | null;
  address: string | null;
  salary: string | null;
  status: "active" | "inactive";
  roles: Role[];
}

export interface CreateStaffUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  address?: string;
  salary?: string;
  roleIds?: number[];
}

export interface UpdateStaffUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  address?: string;
  salary?: string;
  status?: "active" | "inactive";
}

// ---------- Staff ----------

export function listStaff(accessToken: string) {
  return apiFetch<StaffUser[]>("/admin/staff", { accessToken });
}

export function getStaffMember(accessToken: string, id: number) {
  return apiFetch<StaffUser>(`/admin/staff/${id}`, { accessToken });
}

export function createStaffMember(accessToken: string, payload: CreateStaffUserPayload) {
  return apiFetch<StaffUser>("/admin/staff", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateStaffMember(
  accessToken: string,
  id: number,
  payload: UpdateStaffUserPayload,
) {
  return apiFetch<StaffUser>(`/admin/staff/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deactivateStaffMember(accessToken: string, id: number) {
  return apiFetch<StaffUser>(`/admin/staff/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

export function setStaffRoles(accessToken: string, id: number, roleIds: number[]) {
  return apiFetch<StaffUser>(`/admin/staff/${id}/roles`, {
    method: "PATCH",
    accessToken,
    body: { roleIds },
  });
}

// ---------- Roles ----------

export function listRoles(accessToken: string) {
  return apiFetch<Role[]>("/admin/roles", { accessToken });
}

export function createRole(accessToken: string, name: string) {
  return apiFetch<Role>("/admin/roles", {
    method: "POST",
    accessToken,
    body: { name },
  });
}

export function updateRole(accessToken: string, id: number, name: string) {
  return apiFetch<Role>(`/admin/roles/${id}`, {
    method: "PATCH",
    accessToken,
    body: { name },
  });
}

export function deleteRole(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/roles/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

export function setRolePermissions(accessToken: string, id: number, permissionIds: number[]) {
  return apiFetch<Role>(`/admin/roles/${id}/permissions`, {
    method: "PATCH",
    accessToken,
    body: { permissionIds },
  });
}

// ---------- Permissions ----------

export function listPermissions(accessToken: string) {
  return apiFetch<Permission[]>("/admin/permissions", { accessToken });
}

export function createPermission(accessToken: string, name: string) {
  return apiFetch<Permission>("/admin/permissions", {
    method: "POST",
    accessToken,
    body: { name },
  });
}

export function deletePermission(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/permissions/${id}`, {
    method: "DELETE",
    accessToken,
  });
}
