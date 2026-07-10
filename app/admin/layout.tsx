import { StaffAuthProvider } from "@/lib/staff-auth-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <StaffAuthProvider>{children}</StaffAuthProvider>;
}
