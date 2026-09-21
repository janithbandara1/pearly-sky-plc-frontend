"use client";

import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";
import { useState } from "react";

//
const sectionsL = [
  {
    id: 1,
    titleKey: "popUpConditionSectionOneTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionOneOneTitle",
        bodyKey: "popUpConditionSectionOneOneBody"
      },
      {
        titleKey: "popUpConditionSectionOneTwoTitle",
        bodyKey: "popUpConditionSectionOneTwoBody"
      },
      {
        titleKey: "popUpConditionSectionOneThreeTitle",
        bodyKey: "popUpConditionSectionOneThreeBody"
      }
    ]
  },
  {
    id: 2,
    titleKey: "popUpConditionSectionTwoTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionTwoOneTitle",
        bodyKey: "popUpConditionSectionTwoOneBody"
      },
      {
        titleKey: "popUpConditionSectionTwoTwoTitle",
        bodyKey: "popUpConditionSectionTwoTwoBody"
      },
      {
        titleKey: "popUpConditionSectionTwoThreeTitle",
        bodyKey: "popUpConditionSectionTwoThreeBody"
      }
    ]
  },
  {
    id: 3,
    titleKey: "popUpConditionSectionThreeTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionThreeOneTitle",
        bodyKey: "popUpConditionSectionThreeOneBody"
      },
      {
        titleKey: "popUpConditionSectionThreeTwoTitle",
        bodyKey: "popUpConditionSectionThreeTwoBody"
      },
      {
        titleKey: "popUpConditionSectionThreeThreeTitle",
        bodyKey: "popUpConditionSectionThreeThreeBody"
      }
    ]
  },
  {
    id: 4,
    titleKey: "popUpConditionSectionFourTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionFourOneTitle",
        bodyKey: "popUpConditionSectionFourOneBody"
      }
    ]
  },
  {
    id: 5,
    titleKey: "popUpConditionSectionFiveTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionFiveOneTitle",
        bodyKey: "popUpConditionSectionFiveOneBody"
      },
      {
        titleKey: "popUpConditionSectionFiveTwoTitle",
        bodyKey: "popUpConditionSectionFiveTwoBody"
      },
      {
        titleKey: "popUpConditionSectionFiveThreeTitle",
        bodyKey: "popUpConditionSectionFiveThreeBody"
      }
    ]
  },
  {
    id: 6,
    titleKey: "popUpConditionSectionSixTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionSixOneTitle",
        bodyKey: "popUpConditionSectionSixOneBody"
      },
      {
        titleKey: "popUpConditionSectionSixTwoTitle",
        bodyKey: "popUpConditionSectionSixTwoBody"
      },
      {
        titleKey: "popUpConditionSectionSixThreeTitle",
        bodyKey: "popUpConditionSectionSixThreeBody"
      }
    ]
  },
  {
    id: 7,
    titleKey: "popUpConditionSectionSevenTitle",
    subsections: [
      {
        titleKey: "popUpConditionSectionSevenOneTitle",
        bodyKey: "popUpConditionSectionSevenOneBody"
      },
      {
        titleKey: "popUpConditionSectionSevenTwoTitle",
        bodyKey: "popUpConditionSectionSevenTwoBody"
      }
    ]
  }
];

/* const sections = [

  {
    id: 1,
    title: "1. Booking Confirmation & Service Scope",
    content: (
      <>
        <p>
          <strong>1.1 Service Basis:</strong> The final service price and
          duration are based strictly on the property details and service
          options selected at the time of booking.
        </p>
        <p>
          <strong>1.2 On-Site Adjustments:</strong> If the property size or
          condition significantly deviates from the booking details, the
          Cleaner must obtain client approval for any required additional hours
          or costs before proceeding.
        </p>
        <p>
          <strong>1.3 Client Access:</strong> You must ensure access (keys,
          codes, etc.) is available to the Cleaner at the scheduled time.
          Failure to provide access will result in a Lock-Out Fee (see Section
          3.3).
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "2. Payment Terms",
    content: (
      <>
        <p>
          <strong>2.1 Booking Fee/Authorization:</strong> You authorize Pearly
          Sky Company Private Ltd to pre-authorize your provided payment method
          upon booking to secure the service with a Non-Refundable 1-Hour
          Payment (Booking Fee). This fee will be deducted from the total
          service price upon processing.
        </p>
        <p>
          <strong>2.2 Processing:</strong> The remaining balance of the service
          fee will be processed 24 hours prior to the scheduled appointment or
          immediately upon service completion, as specified during checkout.
        </p>
        <p>
          <strong>2.3 Outstanding Balances:</strong> Services will not commence
          if a valid payment method cannot be successfully charged for the full
          amount prior to the appointment.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "3. Cancellation and Lock-Out Policy",
    content: (
      <>
        <p>
          <strong>3.1 Full Refund/Free Reschedule:</strong> Cancellation or
          rescheduling request received with more than 24 hours notice before
          the scheduled start time. [$0.00 (Full refund of the 1-Hour Booking
          Fee)]
        </p>
        <p>
          <strong>3.2 Late Cancellation Fee:</strong> Cancellation or
          rescheduling request received with less than 24 hours notice before
          the scheduled start time. [Forfeiture of the 1 Hour Payment (Booking
          Fee)]
        </p>
        <p>
          <strong>3.3 Lock-Out Fee (No Access):</strong> Cleaner arrives but is
          unable to gain access to the property at the scheduled time.
          [Forfeiture of the 1 Hour Payment (Booking Fee)]
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "4. Continuous Working Hours",
    content: (
      <p>
        <strong>4.1 Efficiency:</strong> A Cleaner’s standard continuous working
        limit is 5 hours. Bookings requiring longer periods will be scheduled
        with additional staff or appropriate breaks to ensure adherence to work
        limitations and efficiency.
      </p>
    ),
  },
  {
    id: 5,
    title: "5. Service Guarantee and Liability",
    content: (
      <>
        <p>
          <strong>5.1 Service Guarantee:</strong> If you are dissatisfied with
          the quality of the cleaning service, you must notify Pearly Sky
          Company Private Ltd within 48 hours of service completion. Upon
          verification, we will arrange a free re-clean of the specific disputed
          area(s).
        </p>
        <p>
          <strong>5.2 Damage Claims:</strong> Any claim for property damage
          caused by the Cleaner must be reported within 48 hours of service
          completion, along with photographic evidence.
        </p>
        <p>
          <strong>5.3 Exclusions:</strong> Pearly Sky and its Cleaners are not
          liable for: (a) damage resulting from pre-existing conditions; (b)
          damage to unsecured valuables or fragile items; or (c) failure to
          remove pre-existing stubborn stains.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "6. Supplies, Equipment, and Pets",
    content: (
      <>
        <p>
          <strong>6.1 Supplies Requirement:</strong> Clients may order required
          cleaning materials (vacuum, mop, bio-chemical cleaning materials,
          etc.) through the Pearly Sky Company Private Ltd website.
        </p>
        <p>
          <strong>6.2 Client-Provided Supplies:</strong> If supplies are not
          ordered via our website, the client is responsible for providing all
          necessary working equipment, including a vacuum, mop, and approved
          bio-chemical cleaning materials.
        </p>
        <p>
          <strong>6.3 Pet Policy:</strong> All pets must be secured or confined
          away from the service area for the entire duration of the cleaning
          appointment. Pearly Sky Company Private Ltd and its Cleaners are not
          responsible for supervising, controlling, or managing household pets.
        </p>
      </>
    ),
  },
  {
    id: 7,
    title: "7. Key Handling and Service Verification",
    content: (
      <>
        <p>
          <strong>7.1 Supervision Requirement:</strong> A responsible adult must
          be present on the premises during the entire cleaning service
          duration.
        </p>
        <p>
          <strong>7.2 Service Sign-Off:</strong> Upon completion of the service,
          the responsible person must check the cleaned area(s) and sign the
          Cleaning Services Report provided by the Cleaner. This signature
          confirms that the client is satisfied that the cleaning has been done
          properly according to the agreed-upon scope of work.
        </p>
      </>
    ),
  },
]; */
/**
 * Child-care-service / elder-care-service have their own Terms & Conditions
 * (caregiver scope, deposit, safeguarding, etc.) — distinct enough from the
 * cleaning-service terms above that it's kept as fixed English copy rather
 * than added to every locale dictionary alongside the ~40 cleaning-terms
 * keys; legal copy like this is usually maintained as one canonical text
 * rather than machine-translated per UI locale.
 */
const careSections: {
  id: number;
  title: string;
  subsections: { title: string; body: string; bullets?: string[] }[];
}[] = [
  {
    id: 1,
    title: "1. Services & Scope",
    subsections: [
      {
        title: "Children Care",
        body: "",
        bullets: [
          "Supervision and companionship",
          "Play, reading & activities",
          "Meal and snack preparation",
          "Homework & school collection",
          "Bedtime & daily routines",
        ],
      },
      {
        title: "Elder Care",
        body: "",
        bullets: [
          "Companionship & conversation",
          "Light housekeeping & laundry",
          "Meal prep & grocery support",
          "Appointment accompaniment",
          "Mobility & safety support",
          "Permitted medication reminders",
        ],
      },
      {
        title: "Exclusions & Refusal",
        body: "Medical diagnosis, nursing, financial management, physical restraint, unsafe lifting, and overnight care are excluded unless agreed. Services exceeding caregiver qualifications may be refused.",
      },
    ],
  },
  {
    id: 2,
    title: "2. Booking & Requirements",
    subsections: [
      {
        title: "Booking Process",
        body: "Requests require country, address, service type, time, client/child details, emergency contacts, and medical/safety info. Availability is confirmed only after review and deposit payment.",
      },
      {
        title: "Children Care Duties",
        body: "Parents must provide accurate details, emergency contacts, dietary needs, authorized collectors, and remain reachable during booking.",
      },
      {
        title: "Elder Care Duties",
        body: "Clients/representatives must disclose mobility limits, routines, consent status, access instructions, and equipment needs. Complex nursing may require specialist staff.",
      },
    ],
  },
  {
    id: 3,
    title: "3. Pricing & Payments",
    subsections: [
      {
        title: "Standard Deposit",
        body: "A standard deposit of €32.00 is payable during checkout to reserve the requested date and time.",
      },
      {
        title: "Final Price Components",
        body: "",
        bullets: [
          "Care service charges",
          "Additional hours & overtime",
          "Travel & transport costs",
          "Public holiday / late-hour fees",
          "Applicable taxes & approved extras",
        ],
      },
      {
        title: "Refunds & Balance",
        body: "Remaining balance is confirmed before service. Deposit refund rules vary by country policy and mandatory consumer law.",
      },
    ],
  },
  {
    id: 4,
    title: "4. Duties & Allocation",
    subsections: [
      {
        title: "Caregiver Allocation",
        body: "Assigned based on needs, location, language, and qualifications. Specific caregivers are not guaranteed unless confirmed in writing.",
      },
      {
        title: "Client Responsibilities",
        body: "Clients must provide a safe, respectful environment, accurate booking information, safe access, and timely payment.",
      },
      {
        title: "Arrival & Access",
        body: "Additional charges or cancellations apply if access codes are incorrect, the location is unsafe, or caregivers face unreasonable waiting times.",
      },
    ],
  },
  {
    id: 5,
    title: "5. Safety & Privacy",
    subsections: [
      {
        title: "Safeguarding & Incidents",
        body: "Accidents, injuries, or health concerns must be reported immediately to emergency contacts or services. Caregivers cannot diagnose medical issues or handle criminal matters.",
      },
      {
        title: "Privacy & Data",
        body: "Personal and health information is processed securely for bookings, payments, and legal/safety obligations under applicable privacy laws (including EU GDPR rules).",
      },
      {
        title: "Communications",
        body: "Pearly Sky Company may contact clients regarding bookings, payments, safety updates, and feedback.",
      },
    ],
  },
  {
    id: 6,
    title: "6. Changes & Law",
    subsections: [
      {
        title: "Changes & Rescheduling",
        body: "Requests should be made early. Changes depend on availability and may incur extra charges. Mandatory statutory cancellation rights remain unaffected.",
      },
      {
        title: "Complaints Procedure",
        body: "Submit issues promptly with booking references, dates, and descriptions. Responses will be provided within legally required timeframes.",
      },
      {
        title: "Governing Law",
        body: "Subject to mandatory local laws, consumer protection rules, and local safeguarding/tax requirements of the service country.",
      },
    ],
  },
];

interface TermsAndConditionsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  /** child-care-service / elder-care-service show their own terms instead of the cleaning-service ones. */
  variant?: "cleaning" | "care";
}
export default function TermsAndConditions({
  open,
  onClose,
  onAccept,
  variant = "cleaning",
}: TermsAndConditionsModalProps) {
  const { translate } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(2);
  const [accepted, setAccepted] = useState(false);
  const [showAcceptWarning, setShowAcceptWarning] = useState(false);

  if (!open) return null;

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleAccept = () => {
    if (!accepted) {
      setShowAcceptWarning(true);
      return;
    }
    onAccept();
    onClose();
    // reset for next open
    setAccepted(false);
    setShowAcceptWarning(false);
    setOpenId(2);
  };

  return (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  {/* Modal */}
  <div className="bg-[#FFFDF4] w-[90%] md:w-[60%] max-w-2xl mx-auto rounded-xl shadow-lg border border-[#A98B4B] overflow-hidden">
    
    {/* Header */}
    <div className="relative bg-[#0B1B34] py-4 px-6 text-center">
      <h2 className="text-xl font-bold text-white">
        {translate("popUpConditionsTitleMain")}
      </h2>
      {variant === "care" && (
        <p className="mt-1 text-xs text-white/70">
          Pearly Sky Company Private Ltd — Terms &amp; Conditions (Effective 11 Sept 2026)
        </p>
      )}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Scrollable body */}
    <div
      className="px-6 py-4 max-h-[60vh] overflow-y-auto text-[#121212] leading-relaxed text-sm space-y-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#0B1B34 #DDDDDD",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #0b1b34;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-track {
          background-color: #ddd;
        }
      `}</style>

      {variant === "care"
        ? careSections.map((section) => {
            const isOpen = openId === section.id;
            return (
              <div key={section.id}>
                <button
                  type="button"
                  onClick={() => toggle(section.id)}
                  className="w-full border border-gray-300 rounded-md cursor-pointer font-semibold py-2.5 px-3 bg-[#F7F7F7] flex justify-between items-center text-left text-[#121212] hover:bg-[#F0F0F0] transition-colors"
                >
                  <span>{section.title}</span>
                  <span className="text-sm ml-2">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <div className="p-5 mt-1 bg-[#FFFDF4] rounded-md shadow-sm border border-[#EAEAEA] text-[12px] leading-relaxed max-w-[95%] mx-auto space-y-2">
                    {section.subsections.map((subsec) => (
                      <div key={subsec.title}>
                        <p>
                          <strong>{subsec.title}</strong>
                          {subsec.body ? ` ${subsec.body}` : ""}
                        </p>
                        {subsec.bullets && (
                          <ul className="mt-1 list-disc space-y-0.5 pl-5">
                            {subsec.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        : sectionsL.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="w-full border border-gray-300 rounded-md cursor-pointer font-semibold py-2.5 px-3 bg-[#F7F7F7] flex justify-between items-center text-left text-[#121212] hover:bg-[#F0F0F0] transition-colors"
            >
              <span>{translate(section.titleKey as TranslationKey)}</span>
              <span className="text-sm ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="p-5 mt-1 bg-[#FFFDF4] rounded-md shadow-sm border border-[#EAEAEA] text-[12px] leading-relaxed max-w-[95%] mx-auto space-y-2">
                {section.subsections.map((subsec) => (
                  <p key={subsec.titleKey}>
                    <strong>
                      {translate(subsec.titleKey as TranslationKey)}{" "}
                    </strong>
                    {translate(subsec.bodyKey as TranslationKey)}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Checkbox + Accept */}
    <label className="flex items-center gap-3 px-6 pt-2 pb-1 cursor-pointer select-none">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked);
            if (e.target.checked) setShowAcceptWarning(false);
          }}
          className="peer sr-only"
        />
        <div
          className={`w-5 h-5 border-2 border-[#A98B4B] rounded-md flex items-center justify-center transition-colors ${
            accepted ? "bg-[#A98B4B]" : "bg-transparent"
          }`}
        >
          {accepted && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      <span className="text-[#121E2D] font-bold text-[15px]">
        {translate("popUpConditionCheckboxLabel")}
      </span>
    </label>

    {showAcceptWarning && !accepted && (
      <p className="px-6 pb-1 text-xs font-medium text-destructive">
        {translate("popUpConditionAcceptWarning")}
      </p>
    )}

    <div className="flex justify-end px-6 pb-5 pt-2">
      <button
        type="button"
        onClick={handleAccept}
        className={`text-white w-[139px] h-[33px] rounded-[10px] font-medium text-[17px] flex items-center justify-center transition-opacity cursor-pointer ${
          accepted ? "bg-[#A98B4B] hover:opacity-90" : "bg-[#A98B4B]/60 hover:opacity-90"
        }`}
      >
        {translate("popUpConditionBtnAccept")}
      </button>
    </div>

  </div>
</div>
  );
}