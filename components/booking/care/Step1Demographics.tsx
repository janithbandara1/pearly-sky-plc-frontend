"use client";

import { Minus, Plus, Users, UserCheck, PersonStanding, Heart } from "lucide-react";
import { CareServiceConfig, CareMode, GenderPref, glassCard, glassInput } from "./care-wizard-config";

interface CounterRowProps {
  icon: React.ReactNode;
  iconColor: string; iconBg: string; iconBorder: string;
  label: string; sub: string; value: number;
  onDecrement: () => void; onIncrement: () => void;
  valueColor?: string;
}
function CounterRow({ icon, iconColor, iconBg, iconBorder, label, sub, value, onDecrement, onIncrement, valueColor = "text-[#c9a858]" }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl" style={glassInput}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconBorder} ${iconColor}`}>{icon}</div>
        <div>
          <div className="text-xs font-bold text-[#fffdf4] uppercase tracking-wider">{label}</div>
          <div className="text-[10px] text-gray-400">{sub}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-1 rounded-xl" style={{ background: "#0a111a", border: "1px solid rgba(201,168,88,0.2)" }}>
        <button type="button" onClick={onDecrement} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c9a858] hover:bg-[#c9a858] hover:text-[#0a111a] transition-all cursor-pointer" style={{ background: "#1c2d42" }}>
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className={`w-7 text-center font-bold text-base ${valueColor}`}>{value}</span>
        <button type="button" onClick={onIncrement} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c9a858] hover:bg-[#c9a858] hover:text-[#0a111a] transition-all cursor-pointer" style={{ background: "#1c2d42" }}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export interface Step1DemographicsProps {
  config: CareServiceConfig;
  careMode: CareMode;
  onCareModeChange: (mode: CareMode) => void;
  gender1Count: number;
  gender2Count: number;
  onGender1Change: (delta: number) => void;
  onGender2Change: (delta: number) => void;
  selectedAgeGroups: string[];
  onAgeGroupToggle: (group: string) => void;
  selectedChips: string[];
  onChipToggle: (label: string) => void;
  careNotes: string;
  onCareNotesChange: (val: string) => void;
  genderPref: GenderPref;
  onGenderPrefChange: (pref: GenderPref) => void;
  durationHours: number;
  onDurationChange: (delta: number) => void;
  caregiverCount: number;
  onCaregiverChange: (delta: number) => void;
}

export function Step1Demographics({
  config, careMode, onCareModeChange,
  gender1Count, gender2Count, onGender1Change, onGender2Change,
  selectedAgeGroups, onAgeGroupToggle,
  selectedChips, onChipToggle,
  careNotes, onCareNotesChange,
  genderPref, onGenderPrefChange,
  durationHours, onDurationChange,
  caregiverCount, onCaregiverChange,
}: Step1DemographicsProps) {
  const totalPersonCount = gender1Count + gender2Count;
  const totalBadge = config.isElder
    ? `${totalPersonCount} ${totalPersonCount === 1 ? "Elder" : "Elders"}`
    : `${totalPersonCount} ${totalPersonCount === 1 ? "Child" : "Children"}`;

  return (
    <div className="space-y-6">
      {/* CARE MODE SWITCHER */}
      <div className="p-2 rounded-2xl flex flex-col sm:flex-row gap-2" style={{ ...glassCard, border: "1px solid rgba(201,168,88,0.3)" }}>
        {([["home", config.homeMode], ["centre", config.centreMode]] as [CareMode, typeof config.homeMode][]).map(([mode, cfg]) => (
          <button key={mode} type="button" onClick={() => onCareModeChange(mode)}
            className={`flex-1 py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-semibold cursor-pointer ${careMode === mode ? "bg-[#c9a858] text-[#0a111a] shadow-lg" : "text-gray-300 hover:text-[#c9a858]"}`}
            style={careMode !== mode ? { background: "rgba(28,45,66,0.4)" } : {}}>
            {cfg.icon}
            <div className="text-left">
              <div className="text-sm font-bold leading-tight">{cfg.title}</div>
              <div className="text-[10px] opacity-80 font-normal">{cfg.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* REQUIREMENTS CARD */}
      <div className="rounded-2xl p-6 sm:p-8 space-y-8" style={glassCard}>


          {/* Demographics Header + Counters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
              <div>
                <h2 className="text-xl font-serif font-bold text-[#fffdf4] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#c9a858]" />
                  {config.isElder ? "How Many Elderly Care Required?" : "How Many Children Require Care?"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {config.isElder
                    ? "Specify male and female elder care recipients for custom staffing."
                    : "Specify boys and girls for customized nanny placement & activities."}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl text-right" style={{ background: "rgba(201,168,88,0.1)", border: "1px solid rgba(201,168,88,0.4)" }}>
                <span className="text-[10px] uppercase text-gray-400 block tracking-wider font-semibold">{config.totalLabel}</span>
                <span className="text-lg font-bold font-serif text-[#c9a858]">{totalBadge}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CounterRow
                icon={config.gender1Icon} iconBg="bg-[#c9a858]/10" iconBorder="border border-[#c9a858]/30" iconColor="text-[#c9a858]"
                label={config.gender1Label} sub={config.gender1Sub} value={gender1Count}
                onDecrement={() => onGender1Change(-1)} onIncrement={() => onGender1Change(1)} />
              <CounterRow
                icon={config.gender2Icon} iconBg="bg-[#e2877a]/10" iconBorder="border border-[#e2877a]/30" iconColor="text-[#e2877a]"
                label={config.gender2Label} sub={config.gender2Sub} value={gender2Count} valueColor="text-[#e2877a]"
                onDecrement={() => onGender2Change(-1)} onIncrement={() => onGender2Change(1)} />
            </div>

            {/* Age groups — multi-selectable pill chips  */}
            {config.ageGroups && (
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs uppercase tracking-wider text-[#c9a858] font-bold">
                  Select Age Group(s)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {config.ageGroups.map(group => {
                    const isSelected = selectedAgeGroups.includes(group);
                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => onAgeGroupToggle(group)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? "border-2 border-[#c9a858] bg-[#122234] text-[#fffdf4] shadow-[0_0_15px_rgba(201,168,88,0.25)]"
                            : "border border-[#c9a858]/40 bg-[#0f1925]/60 text-[#d1c7b0] hover:border-[#c9a858] hover:text-[#fffdf4]"
                        }`}
                      >
                        {group}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Visual Demographics Roster Breakdown Bar  */}
            <div
              className="flex flex-wrap items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl"
              style={{ background: "#0a111a", border: "1px solid rgba(201,168,88,0.25)" }}
            >
              <span className="text-xs text-[#c9a858] font-bold uppercase tracking-wider mr-1">
                ROSTER BREAKDOWN:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: gender1Count }, (_, i) => (
                  <div
                    key={`boy-${i}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#131d2a] border border-[#c9a858]/40 text-[#e2b86b]"
                  >
                    <PersonStanding className="w-3.5 h-3.5 text-[#e2b86b]" />
                    <span>{config.isElder ? `Gentleman #${i + 1}` : `Boy #${i + 1}`}</span>
                  </div>
                ))}
                {Array.from({ length: gender2Count }, (_, i) => (
                  <div
                    key={`girl-${i}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#23151b] border border-[#e2877a]/40 text-[#f48a90]"
                  >
                    <PersonStanding className="w-3.5 h-3.5 text-[#f48a90]" />
                    <span>{config.isElder ? `Lady #${i + 1}` : `Girl #${i + 1}`}</span>
                  </div>
                ))}
                {totalPersonCount === 0 && (
                  <span className="text-gray-500 text-xs italic">No recipients selected yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Specialized Nanny Qualifications & Requirements  */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-[#c9a858] font-bold">
              {config.isElder ? "Care Needs & Quick Requirements Tags" : "Specialized Nanny Qualifications & Requirements"}
            </label>
            <div className="flex flex-wrap gap-2.5">
              {config.chipTags.map(({ label, icon }) => {
                const isSelected = selectedChips.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onChipToggle(label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "border-2 border-[#c9a858] bg-[#142234] text-[#fffdf4] shadow-[0_0_12px_rgba(201,168,88,0.25)] font-semibold"
                        : "border border-[#c9a858]/40 bg-[#0f1925]/60 text-[#d1c7b0] hover:border-[#c9a858] hover:text-[#fffdf4] font-medium"
                    }`}
                  >
                    <span className="text-[#c9a858]">{icon}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
            <textarea
              rows={2}
              value={careNotes}
              onChange={e => onCareNotesChange(e.target.value)}
              placeholder={config.notesPlaceholder}
              className="w-full p-3.5 rounded-xl text-xs resize-none care-glow-input mt-2"
              style={{ lineHeight: "1.6" }}
            />
          </div>

          {/* Personnel preference */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-[#c9a858] font-semibold">
              {config.isElder ? "Care Personnel Preference" : "Nanny Caregiver Preference"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([
                { value: "no-preference" as GenderPref, label: "No Preference", icon: <UserCheck className="w-4 h-4" /> },
                { value: "female" as GenderPref, label: "Female Professional", icon: <Heart className="w-4 h-4" /> },
                { value: "male" as GenderPref, label: "Male Professional", icon: <PersonStanding className="w-4 h-4" /> },
              ]).map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onGenderPrefChange(value)}
                  className={`p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all ${genderPref === value ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                  style={{ ...glassInput, border: genderPref === value ? "2px solid #c9a858" : "1px solid rgba(201,168,88,0.3)" }}
                >
                  <span className="text-[#c9a858]">{icon}</span>{label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Caregivers */}
          <div className="space-y-4 pt-4 border-t" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-gray-300">{config.durationLabel}</label>
                <div className="flex items-center rounded-xl overflow-hidden p-1" style={glassInput}>
                  <button type="button" onClick={() => onDurationChange(-1)} className="w-10 h-10 flex items-center justify-center text-[#c9a858] rounded-lg hover:bg-[#c9a858]/10 transition-all cursor-pointer"><Minus className="w-4 h-4" /></button>
                  <span className="flex-1 text-center text-[#c9a858] font-bold text-lg">{durationHours}h</span>
                  <button type="button" onClick={() => onDurationChange(1)} className="w-10 h-10 flex items-center justify-center text-[#c9a858] rounded-lg hover:bg-[#c9a858]/10 transition-all cursor-pointer"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-gray-300">{config.caregiversLabel}</label>
                <div className="flex items-center rounded-xl overflow-hidden p-1" style={glassInput}>
                  <button type="button" onClick={() => onCaregiverChange(-1)} className="w-10 h-10 flex items-center justify-center text-[#c9a858] rounded-lg hover:bg-[#c9a858]/10 transition-all cursor-pointer"><Minus className="w-4 h-4" /></button>
                  <span className="flex-1 text-center text-[#c9a858] font-bold text-lg">{caregiverCount}</span>
                  <button type="button" onClick={() => onCaregiverChange(1)} className="w-10 h-10 flex items-center justify-center text-[#c9a858] rounded-lg hover:bg-[#c9a858]/10 transition-all cursor-pointer"><Plus className="w-4 h-4" /></button>
                </div>
                <p className="text-[11px] text-gray-400">{config.caregiversSub}</p>
              </div>
            </div>
          </div>
        </div>
    </div>

  );
}
