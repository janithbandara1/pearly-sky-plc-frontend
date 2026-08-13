"use client";

import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CareProfile, makeEmptyCareProfile } from "@/lib/content/care-profiles";

export interface CareProfilesSectionProps {
  /** "Child" or "Elder" — drives labels and copy throughout the section. */
  personLabel: string;
  /** Overrides the section heading. Defaults to "{personLabel}'s Profiles". */
  title?: string;
  /** When true, restricts to exactly one profile — hides numbering, Remove, and Add controls. */
  single?: boolean;
  /** When true, uses a plain "Name" label (no personLabel prefix, no asterisk) and a single "Notes" field instead of Medical/Special Needs + Behavioral Notes. */
  simplified?: boolean;
  profiles: CareProfile[];
  onProfilesChange: (profiles: CareProfile[]) => void;
}

export function CareProfilesSection({
  personLabel,
  title,
  single,
  simplified,
  profiles,
  onProfilesChange,
}: CareProfilesSectionProps) {
  useEffect(() => {
    if (single && profiles.length === 0) {
      onProfilesChange([makeEmptyCareProfile()]);
    }
  }, [single, profiles.length, onProfilesChange]);

  function updateProfile(id: string, patch: Partial<CareProfile>) {
    onProfilesChange(profiles.map((profile) => (profile.id === id ? { ...profile, ...patch } : profile)));
  }

  function addProfile() {
    onProfilesChange([...profiles, makeEmptyCareProfile()]);
  }

  function removeProfile(id: string) {
    onProfilesChange(profiles.filter((profile) => profile.id !== id));
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
      <div className="bg-brand-navy px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">{title ?? `${personLabel}’s Profiles`}</h2>
      </div>

      <div className="flex flex-col gap-4 bg-[#F8F9FA] p-4 sm:p-5">
        {profiles.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Add at least one {personLabel.toLowerCase()}&rsquo;s profile so our care team can prepare.
          </p>
        )}

        {profiles.map((profile, index) => (
          <div key={profile.id} className="relative rounded-lg border border-brand-gold-dark/40 bg-white p-4">
            {!single && (
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-brand-navy">
                  {personLabel} {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.id)}
                  className="flex items-center gap-1 text-xs font-medium text-destructive hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`care-name-${profile.id}`}>{simplified ? "Name" : `${personLabel} Name *`}</Label>
                <Input
                  id={`care-name-${profile.id}`}
                  value={profile.name}
                  onChange={(e) => updateProfile(profile.id, { name: e.target.value })}
                  className="bg-brand-cream"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`care-age-${profile.id}`}>Age *</Label>
                <Input
                  id={`care-age-${profile.id}`}
                  type="number"
                  min={0}
                  value={profile.age}
                  onChange={(e) => updateProfile(profile.id, { age: e.target.value })}
                  className="bg-brand-cream"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`care-gender-${profile.id}`}>Gender *</Label>
                <Select value={profile.gender} onValueChange={(value) => updateProfile(profile.id, { gender: value })}>
                  <SelectTrigger id={`care-gender-${profile.id}`} className="w-full bg-brand-cream">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {simplified ? (
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`care-medical-${profile.id}`}>Notes</Label>
                  <Textarea
                    id={`care-medical-${profile.id}`}
                    rows={2}
                    value={profile.medicalNotes}
                    onChange={(e) => updateProfile(profile.id, { medicalNotes: e.target.value })}
                    className="bg-brand-cream"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor={`care-medical-${profile.id}`}>Medical / Special Needs</Label>
                    <Textarea
                      id={`care-medical-${profile.id}`}
                      rows={2}
                      value={profile.medicalNotes}
                      onChange={(e) => updateProfile(profile.id, { medicalNotes: e.target.value })}
                      className="bg-brand-cream"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor={`care-behavioral-${profile.id}`}>Behavioral Notes (Optional)</Label>
                    <Textarea
                      id={`care-behavioral-${profile.id}`}
                      rows={2}
                      value={profile.behavioralNotes}
                      onChange={(e) => updateProfile(profile.id, { behavioralNotes: e.target.value })}
                      className="bg-brand-cream"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {!single && (
          <Button type="button" variant="outline" onClick={addProfile} className="self-start">
            + Add {personLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
