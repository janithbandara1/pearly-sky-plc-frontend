export interface CareProfile {
  id: string;
  name: string;
  age: string;
  gender: string;
  medicalNotes: string;
  behavioralNotes: string;
}

export function makeEmptyCareProfile(): CareProfile {
  return {
    id: crypto.randomUUID(),
    name: "",
    age: "",
    gender: "",
    medicalNotes: "",
    behavioralNotes: "",
  };
}

/**
 * Renders one profile for the generic quoteItems list (same mechanism as pool/carpet/pressure-washing quotes).
 * Simplified profiles (child care, single profile) render as separate "Label: value" lines so the
 * summary views can split them into label/value rows instead of one long joined line with "Child 1:" numbering.
 */
export function formatCareProfile(
  profile: CareProfile,
  index: number,
  personLabel: string,
  simplified = false,
): string[] {
  if (simplified) {
    const lines: string[] = [];
    if (profile.name.trim()) lines.push(`Name: ${profile.name.trim()}`);
    if (profile.age.trim()) lines.push(`Age: ${profile.age.trim()}`);
    if (profile.gender) lines.push(`Gender: ${profile.gender}`);
    if (profile.medicalNotes.trim()) lines.push(`Notes: ${profile.medicalNotes.trim()}`);
    return lines;
  }

  const parts = [`${personLabel} ${index + 1}: ${profile.name.trim() || "Unnamed"}`];
  if (profile.age.trim()) parts.push(`Age ${profile.age.trim()}`);
  if (profile.gender) parts.push(profile.gender);
  if (profile.medicalNotes.trim()) parts.push(`Medical/Special Needs: ${profile.medicalNotes.trim()}`);
  if (profile.behavioralNotes.trim()) parts.push(`Behavioral Notes: ${profile.behavioralNotes.trim()}`);
  return [parts.join(" — ")];
}
