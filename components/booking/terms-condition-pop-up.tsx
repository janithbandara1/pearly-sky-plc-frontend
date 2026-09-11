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
interface TermsAndConditionsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}
export default function TermsAndConditions({
  open,
  onClose,
  onAccept,
}: TermsAndConditionsModalProps) {
  const { translate } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(2);
  const [accepted, setAccepted] = useState(false);

  if (!open) return null;

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleAccept = () => {
    if (!accepted) return;
    onAccept();
    onClose();
    // reset for next open
    setAccepted(false);
    setOpenId(2);
  };

  return (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  {/* Modal */}
  <div className="bg-[#FFFDF4] w-[90%] md:w-[60%] max-w-2xl mx-auto rounded-xl shadow-lg border border-[#A98B4B] overflow-hidden">
    
    {/* Header */}
    <div className="bg-[#0B1B34] py-4 text-center">
      <h2 className="text-xl font-bold text-white">
        {translate("popUpConditionsTitleMain")}
      </h2>
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

      {sectionsL.map((section) => {
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
          onChange={(e) => setAccepted(e.target.checked)}
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

    <div className="flex justify-end px-6 pb-5 pt-2">
      <button
        type="button"
        disabled={!accepted}
        onClick={handleAccept}
        className={`text-white w-[139px] h-[33px] rounded-[10px] font-medium text-[17px] flex items-center justify-center transition-opacity ${
          accepted
            ? "bg-[#A98B4B] cursor-pointer hover:opacity-90"
            : "bg-[#A98B4B]/60 cursor-not-allowed"
        }`}
      >
        {translate("popUpConditionBtnAccept")}
      </button>
    </div>

  </div>
</div>
  );
}