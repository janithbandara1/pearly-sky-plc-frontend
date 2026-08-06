"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError, setUnauthorizedHandler } from "./api";
import {
  CustomerMe,
  getCustomerMe,
  loginCustomer,
  logoutCustomer,
  refreshCustomer,
  signupCustomer,
  SignupPayload,
} from "./auth-api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  status: AuthStatus;
  customer: CustomerMe | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerMe | null>(null);

  const applySession = useCallback(async (token: string) => {
    setAccessToken(token);
    const me = await getCustomerMe(token);
    setCustomer(me);
    setStatus("authenticated");
  }, []);

  // On first load, try to silently restore the session from the httpOnly
  // refresh-token cookie (set on the backend's own origin).
  useEffect(() => {
    refreshCustomer()
      .then(({ accessToken: token }) => applySession(token))
      .catch(() => setStatus("unauthenticated"));
  }, [applySession]);

  // Access tokens are short-lived and can expire while the user lingers on a
  // page — e.g. browsing a service, then landing on checkout well after the
  // token issued at initial load has gone stale. Without this, a 401 there
  // just leaves the page stuck (see apiFetch's retry-on-401 in ./api).
  useEffect(() => {
    setUnauthorizedHandler(async () => {
      try {
        const { accessToken: token } = await refreshCustomer();
        setAccessToken(token);
        return token;
      } catch {
        setAccessToken(null);
        setCustomer(null);
        setStatus("unauthenticated");
        return null;
      }
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken: token } = await loginCustomer({ email, password });
      await applySession(token);
    },
    [applySession],
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const { accessToken: token } = await signupCustomer(payload);
      await applySession(token);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    await logoutCustomer().catch(() => undefined);
    setAccessToken(null);
    setCustomer(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ status, customer, accessToken, login, signup, logout }),
    [status, customer, accessToken, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export { ApiError };
