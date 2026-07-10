"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "./api";

type StaffAuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface StaffMe {
  id: number;
  type: "staff";
  roles: string[];
}

interface AccessTokenResponse {
  accessToken: string;
}

interface StaffAuthContextValue {
  status: StaffAuthStatus;
  staff: StaffMe | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const StaffAuthContext = createContext<StaffAuthContextValue | null>(null);

function loginStaff(email: string, password: string) {
  return apiFetch<AccessTokenResponse>("/auth/staff/login", {
    method: "POST",
    body: { email, password },
  });
}

function refreshStaff() {
  return apiFetch<AccessTokenResponse>("/auth/staff/refresh", { method: "POST" });
}

function logoutStaff() {
  return apiFetch<{ success: boolean }>("/auth/staff/logout", { method: "POST" });
}

function getStaffMe(accessToken: string) {
  return apiFetch<StaffMe>("/auth/staff/me", { accessToken });
}

export function StaffAuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StaffAuthStatus>("loading");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [staff, setStaff] = useState<StaffMe | null>(null);

  const applySession = useCallback(async (token: string) => {
    setAccessToken(token);
    const me = await getStaffMe(token);
    setStaff(me);
    setStatus("authenticated");
  }, []);

  useEffect(() => {
    refreshStaff()
      .then(({ accessToken: token }) => applySession(token))
      .catch(() => setStatus("unauthenticated"));
  }, [applySession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken: token } = await loginStaff(email, password);
      await applySession(token);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    await logoutStaff().catch(() => undefined);
    setAccessToken(null);
    setStaff(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ status, staff, accessToken, login, logout }),
    [status, staff, accessToken, login, logout],
  );

  return (
    <StaffAuthContext.Provider value={value}>{children}</StaffAuthContext.Provider>
  );
}

export function useStaffAuth() {
  const ctx = useContext(StaffAuthContext);
  if (!ctx) throw new Error("useStaffAuth must be used within a StaffAuthProvider");
  return ctx;
}
