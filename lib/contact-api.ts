import { apiFetch } from "./api";

export interface SendContactMessagePayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  turnstileToken: string;
}

export function sendContactMessage(payload: SendContactMessagePayload) {
  return apiFetch<{ success: boolean }>("/contact", { method: "POST", body: payload });
}
