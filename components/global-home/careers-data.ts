import { Brush, ClipboardList, Headset, Laptop, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import type { GlobalKey } from "@/lib/i18n/global/en";

export type CareerRegion = "sri-lanka" | "france";
export type CareerCategory = "administration" | "operations" | "sales" | "cleaning" | "it";
export type CareerFilter = "all" | CareerRegion | CareerCategory;

/**
 * `title` and `location` are the English wording that goes into the enquiry the
 * team reads; visitors see `titleKey` / `locationKey` in their own language.
 */
export interface CareerJob {
  id: string;
  region: CareerRegion;
  category: CareerCategory;
  title: string;
  titleKey: GlobalKey;
  /** Shown as a "(Male / Female)" note after the title. */
  genderNote?: boolean;
  amount: string;
  unit: "month" | "hour";
  Icon: typeof Users;
}

export const CAREER_JOBS: CareerJob[] = [
  { id: "hr-administration", region: "sri-lanka", category: "administration", title: "HR Administration", titleKey: "careers.job.hrAdmin", amount: "LKR 60,000", unit: "month", Icon: Users },
  { id: "sales-coordinator", region: "sri-lanka", category: "sales", title: "Sales Coordinator", titleKey: "careers.job.salesCoordinator", amount: "LKR 50,000", unit: "month", Icon: TrendingUp },
  { id: "operation-supervisor", region: "sri-lanka", category: "operations", title: "Operation Supervisor", titleKey: "careers.job.operationSupervisor", amount: "LKR 45,000", unit: "month", Icon: ClipboardList },
  { id: "it-administrator", region: "sri-lanka", category: "it", title: "IT Administrator", titleKey: "careers.job.itAdmin", amount: "LKR 55,000", unit: "month", Icon: Laptop },
  { id: "order-processing-operator", region: "sri-lanka", category: "operations", title: "Order Processing Operator", titleKey: "careers.job.orderOperator", amount: "LKR 35,000", unit: "month", Icon: Headset },
  { id: "cleaning-supervisor", region: "sri-lanka", category: "cleaning", title: "Cleaning Supervisor", titleKey: "careers.job.cleaningSupervisor", amount: "LKR 45,000", unit: "month", Icon: ShieldCheck },
  { id: "cleaning-professional-lk", region: "sri-lanka", category: "cleaning", title: "Cleaning Professional (Male / Female)", titleKey: "careers.job.cleaningProfessional", genderNote: true, amount: "LKR 500", unit: "hour", Icon: Brush },
  { id: "cleaning-professional-fr", region: "france", category: "cleaning", title: "Cleaning Professional (Male / Female)", titleKey: "careers.job.cleaningProfessional", genderNote: true, amount: "€12.00", unit: "hour", Icon: Sparkles },
];

export const REGION_LOCATIONS: Record<CareerRegion, { title: string; titleKey: GlobalKey }> = {
  "sri-lanka": { title: "Sri Lanka", titleKey: "careers.location.srilanka" },
  france: { title: "France", titleKey: "careers.location.france" },
};

export const FILTERS: { id: CareerFilter; labelKey: GlobalKey }[] = [
  { id: "all", labelKey: "careers.filter.all" },
  { id: "sri-lanka", labelKey: "careers.filter.srilanka" },
  { id: "france", labelKey: "careers.filter.france" },
  { id: "administration", labelKey: "careers.filter.administration" },
  { id: "operations", labelKey: "careers.filter.operations" },
  { id: "sales", labelKey: "careers.filter.sales" },
  { id: "cleaning", labelKey: "careers.filter.cleaning" },
  { id: "it", labelKey: "careers.filter.it" },
];

/** Applicant picked "Other Positions" / the page-level Apply button rather than a listing. */
export const GENERAL_APPLICATION = "general";

/** Each question is worth 10 marks; the answer keys are the `careers.quiz.q{n}.{a-d}` suffixes. */
export const QUIZ_CORRECT: ("a" | "b" | "c" | "d")[] = ["b", "b", "a", "b", "b", "c", "b", "c", "c", "b"];
export const QUIZ_OPTIONS = ["a", "b", "c", "d"] as const;
export const QUIZ_QUESTION_COUNT = QUIZ_CORRECT.length;
export const QUIZ_MARKS_PER_QUESTION = 10;
export const QUIZ_PASS_MARKS = 90;
export const QUIZ_SECONDS = 15 * 60;
