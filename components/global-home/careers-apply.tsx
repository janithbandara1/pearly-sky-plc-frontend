"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { CareerApplyDialog } from "./career-apply-dialog";
import { GENERAL_APPLICATION } from "./careers-data";

const ApplyContext = createContext<(jobId: string) => void>(() => {});

/** Opens the application dialog for a job id (or GENERAL_APPLICATION). */
export const useCareerApply = () => useContext(ApplyContext);

/**
 * Wraps the careers page so any button on it can open the one application
 * dialog. The server-rendered sections are passed in as children.
 */
export function CareersApplyProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ id: number; jobId: string } | null>(null);
  const open = useCallback((jobId: string) => setSession((current) => ({ id: (current?.id ?? 0) + 1, jobId })), []);

  return (
    <ApplyContext.Provider value={open}>
      {children}
      {/* Keyed per opening so every application starts from the IQ test again. */}
      {session && <CareerApplyDialog key={session.id} jobId={session.jobId} onClose={() => setSession(null)} />}
    </ApplyContext.Provider>
  );
}

export function ApplyButton({
  jobId = GENERAL_APPLICATION,
  className,
  children,
}: {
  jobId?: string;
  className?: string;
  children?: ReactNode;
}) {
  const apply = useCareerApply();
  const { translateGlobal: t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => apply(jobId)}
      className={cn(
        "gold-gradient-bg inline-flex items-center justify-center gap-2 text-xs font-bold text-navy-900 shadow-md transition-all hover:-translate-y-px hover:brightness-110",
        className,
      )}
    >
      <span>{children ?? t("careers.apply")}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}
