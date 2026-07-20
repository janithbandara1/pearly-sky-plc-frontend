import { apiFetch } from "./api";

export interface AccessTokenResponse {
  accessToken: string;
}

export interface CustomerMe {
  id: number;
  type: "customer";
}

export interface SignupPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contact?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function signupCustomer(payload: SignupPayload) {
  return apiFetch<AccessTokenResponse>("/auth/customer/signup", {
    method: "POST",
    body: payload,
  });
}

export function loginCustomer(payload: LoginPayload) {
  return apiFetch<AccessTokenResponse>("/auth/customer/login", {
    method: "POST",
    body: payload,
  });
}

export function refreshCustomer() {
  return apiFetch<AccessTokenResponse>("/auth/customer/refresh", {
    method: "POST",
  });
}

export function logoutCustomer() {
  return apiFetch<{ success: boolean }>("/auth/customer/logout", {
    method: "POST",
  });
}

export function getCustomerMe(accessToken: string) {
  return apiFetch<CustomerMe>("/auth/customer/me", { accessToken });
}

export function forgotPassword(email: string) {
  return apiFetch<{ otpForDev?: string }>("/auth/forgot-password", {
    method: "POST",
    body: { email, subjectType: "customer" },
  });
}

export function resetPassword(payload: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  return apiFetch<{ success: boolean }>("/auth/reset-password", {
    method: "POST",
    body: { ...payload, subjectType: "customer" },
  });
}
