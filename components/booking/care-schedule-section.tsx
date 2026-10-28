/**
 * care-schedule-section.tsx
 *
 * Entry point for the care booking wizard.
 * Implementation is split into individual step components under:
 *   components/booking/care/
 *     - care-wizard-config.tsx   (shared types + service config)
 *     - CareWizardContainer.tsx  (step orchestrator + progress bar)
 *     - Step1Demographics.tsx    (care mode, counters, chips, preferences, duration)
 *     - Step2Schedule.tsx        (DateTimeSection wrapper)
 *     - Step3CareProfiles.tsx    (per-person profile cards)
 *     - Step4ReviewSummary.tsx   (review + QA notice + submit)
 */
export { CareWizardContainer as CareScheduleSection } from "@/components/booking/care/CareWizardContainer";
export type { CareWizardContainerProps as CareScheduleSectionProps } from "@/components/booking/care/CareWizardContainer";
