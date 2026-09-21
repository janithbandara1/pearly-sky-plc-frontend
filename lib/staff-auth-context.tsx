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
import {
  STAFF_SESSION_HINT_COOKIE,
  clearSessionHintCookie,
  hasSessionHintCookie,
  setSessionHintCookie,
} from "./session-hint";

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
    setSessionHintCookie(STAFF_SESSION_HINT_COOKIE);
  }, []);

  // Skipped when the hint cookie is absent — see auth-context.tsx's identical
  // check for why (avoids a guaranteed 401 for every anonymous visit).
  useEffect(() => {
    if (!hasSessionHintCookie(STAFF_SESSION_HINT_COOKIE)) {
      setStatus("unauthenticated");
      return;
    }
    refreshStaff()
      .then(({ accessToken: token }) => applySession(token))
      .catch(() => {
        clearSessionHintCookie(STAFF_SESSION_HINT_COOKIE);
        setStatus("unauthenticated");
      });
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
    clearSessionHintCookie(STAFF_SESSION_HINT_COOKIE);
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
