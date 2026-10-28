import React from "react";
import {
  PersonStanding, Heart, Baby, Stethoscope, BookOpen, Brain,
  Utensils, Pill, Accessibility, MessageCircle, Palette, Moon,
  HandHeart, Languages, Home, Building2,
} from "lucide-react";

export type GenderPref = "no-preference" | "female" | "male";
export type CareMode = "home" | "centre";

export interface CareChipTag {
  label: string;
  icon: React.ReactNode;
}

export interface CareModeOption {
  icon: React.ReactNode;
  title: string;
  sub: string;
}

export interface CareServiceConfig {
  isElder: boolean;
  gender1Label: string;
  gender1Sub: string;
  gender1Icon: React.ReactNode;
  gender2Label: string;
  gender2Sub: string;
  gender2Icon: React.ReactNode;
  totalLabel: string;
  homeMode: CareModeOption;
  centreMode: CareModeOption;
  chipTags: CareChipTag[];
  ageGroups?: string[];
  notesPlaceholder: string;
  profileSectionTitle: string;
  durationLabel: string;
  caregiversLabel: string;
  caregiversSub: string;
}

export function getCareServiceConfig(isElder: boolean): CareServiceConfig {
  if (isElder) {
    return {
      isElder: true,
      gender1Label: "Male Elderly",
      gender1Sub: "Gentlemen care recipient(s)",
      gender1Icon: <PersonStanding className="w-5 h-5" />,
      gender2Label: "Female Elderly",
      gender2Sub: "Ladies care recipient(s)",
      gender2Icon: <Heart className="w-5 h-5" />,
      totalLabel: "Total Elders",
      homeMode: { icon: <Home className="w-6 h-6" />, title: "Private Home Care", sub: "Hourly Rate \u2022 Personalised Visit" },
      centreMode: { icon: <Building2 className="w-6 h-6" />, title: "Care Centres Residence", sub: "Luxury Residence Suites \u2022 Nightly" },
      chipTags: [
        { label: "Mobility Assistance", icon: <Accessibility className="w-3.5 h-3.5" /> },
        { label: "Medication Management", icon: <Pill className="w-3.5 h-3.5" /> },
        { label: "Companionship", icon: <MessageCircle className="w-3.5 h-3.5" /> },
        { label: "Culinary & Meal Prep", icon: <Utensils className="w-3.5 h-3.5" /> },
        { label: "Specialized Memory Care", icon: <Brain className="w-3.5 h-3.5" /> },
        { label: "Post-Op Care", icon: <Stethoscope className="w-3.5 h-3.5" /> },
      ],
      notesPlaceholder: "Describe specific care preferences or health conditions\u2026",
      profileSectionTitle: "Elder Profile",
      durationLabel: "Duration (Hours per Visit)",
      caregiversLabel: "Care Professionals Needed",
      caregiversSub: "Dedicated private medical staff",
    };
  }
  return {
    isElder: false,
    gender1Label: "Boys (Male)",
    gender1Sub: "Male child recipient(s)",
    gender1Icon: <Baby className="w-5 h-5" />,
    gender2Label: "Girls (Female)",
    gender2Sub: "Female child recipient(s)",
    gender2Icon: <Heart className="w-5 h-5" />,
    totalLabel: "Total Children",
    homeMode: { icon: <Home className="w-6 h-6" />, title: "Private Home Nanny & Care", sub: "Hourly Rate \u2022 Per Nanny" },
    centreMode: { icon: <Building2 className="w-6 h-6" />, title: "Eco-Luxury Kids Club", sub: "Resort Day Care \u2022 Per Day" },
    chipTags: [
      { label: "Bilingual Nanny (EN/FR)", icon: <Languages className="w-3.5 h-3.5" /> },
      { label: "Pediatric CPR Certified", icon: <Stethoscope className="w-3.5 h-3.5" /> },
      { label: "Homework Assistance", icon: <BookOpen className="w-3.5 h-3.5" /> },
      { label: "Creative Arts & Music", icon: <Palette className="w-3.5 h-3.5" /> },
      { label: "Bedtime & Night Routine", icon: <Moon className="w-3.5 h-3.5" /> },
      { label: "Special Needs Care", icon: <HandHeart className="w-3.5 h-3.5" /> },
    ],
    ageGroups: ["\uD83C\uDF7C Infant (0-2 yrs)", "\uD83E\uDDF8 Toddler (2-5 yrs)", "\uD83C\uDFA8 Child (6-12 yrs)", "\uD83D\uDCDA Teen (13+ yrs)"],
    notesPlaceholder: "Describe specific instructions, dietary requirements, or routine preferences\u2026",
    profileSectionTitle: "Child's Profile",
    durationLabel: "Duration (Hours per Session)",
    caregiversLabel: "Nannies Needed",
    caregiversSub: "Certified VIP private educators",
  };
}

/** Shared inline styles for the dark glassmorphism theme */
export const glassCard: React.CSSProperties = {
  background: "rgba(28,45,66,0.65)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(201,168,88,0.22)",
  boxShadow: "0 12px 32px 0 rgba(0,0,0,0.37)",
};

export const glassInput: React.CSSProperties = {
  background: "rgba(12, 21, 34, 0.85)",
  border: "1px solid rgba(201, 168, 88, 0.28)",
  color: "#fffdf4",
};

export const glowingInput: React.CSSProperties = {
  background: "rgba(12, 21, 34, 0.85)",
  border: "1px solid rgba(201, 168, 88, 0.28)",
  color: "#fffdf4",
};


/** Wizard step meta */
export interface WizardStep {
  number: number;
  title: string;
}

export function getWizardSteps(isElder: boolean): WizardStep[] {
  return [
    { number: 1, title: isElder ? "Care Requirements & Elder Demographics" : "Care Requirements & Children Demographics" },
    { number: 2, title: "Date & Time Schedule" },
    { number: 3, title: isElder ? "Primary Contact Profile" : "Parent / Guardian Profile" },
    { number: 4, title: "Location & Residence Details" },
    { number: 5, title: "Required Deposit Payment" },
  ];
}

