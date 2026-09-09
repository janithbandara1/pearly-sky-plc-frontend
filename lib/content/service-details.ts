import { HeadLine, ServiceContentHighlightTitles, serviceContenthighlihgtCardFeatures, ServiceContentIntroBody, serviceHighlightCardTitles } from "../types/services-types/serives-content-types";

export interface ServiceHighlightCard {
  title: serviceHighlightCardTitles;
  features: serviceContenthighlihgtCardFeatures;
}

export interface ServiceHighlightGroup {
  /** Falls back to a neutral label in the UI when the source page had no section heading. */
  title?: ServiceContentHighlightTitles;
  cards: ServiceHighlightCard[];
}


export interface ServiceContentEntry {
  introduction?: {
    headline: HeadLine;
    body: ServiceContentIntroBody | ServiceContentIntroBody[];
  };
  highlights?: ServiceHighlightGroup[];
}

export const SERVICE_CONTENT: Partial<Record<string, ServiceContentEntry>> = {
  "regular-home-cleaning": {
    introduction: {
      headline: "serviceRegularCleaningIntroHeadLine",
      body: [
        "serviceRegularCleaningIntroBody"
      ],
    },
    highlights: [
      {
        title: "serviceRegularCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceRegularCleaningHighlightCardTitleOne",
            features: [
              "serviceRegularCleaningTitleOneFeatureOne",
              "serviceRegularCleaningTitleOneFeatureTwo",
              "serviceRegularCleaningTitleOneFeatureThree",
              "serviceRegularCleaningTitleOneFeatureFour",  
            ],
          },
          {
            title: "serviceRegularCleaningHighlightCardTitleTwo",
            features: [
              "serviceRegularCleaningTitleTwoFeatureOne",
            ],
          },
          {
            title: "serviceRegularCleaningHighlightCardTitleThree",
            features: [
              "serviceRegularCleaningTitleThreeFeatureOne",
              "serviceRegularCleaningTitleThreeFeatureTwo",
              "serviceRegularCleaningTitleThreeFeatureThree",
            ],
          },
          {
            title: "serviceRegularCleaningHighlightCardTitleFour",
            features: [
              "serviceRegularCleaningTitleFourFeatureOne",
              "serviceRegularCleaningTitleFourFeatureTwo",
              "serviceRegularCleaningTitleFourFeatureThree",
            ],
          },
        ],
      },
    ],
  },
  "quick-touch-up-cleaning": {
    introduction: {
      headline: "serviceQuickTouchUpCleaningIntroHeadLine",
      body: "serviceQuickTouchUpCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceQuickTouchUpCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceQuickTouchUpCleaningHighlightCardTitleTwo",
            features: [
              "serviceQuickTouchUpCleaningTitleTwoFeatureOne",
              "serviceQuickTouchUpCleaningTitleTwoFeatureTwo",
              "serviceQuickTouchUpCleaningTitleTwoFeatureThree",
              "serviceQuickTouchUpCleaningTitleTwoFeatureFour",
              "serviceQuickTouchUpCleaningTitleTwoFeatureFive",
            ],
          },
          {
            title: "serviceQuickTouchUpCleaningHighlightCardTitleThree",
            features: [
              "serviceQuickTouchUpCleaningTitleThreeFeatureOne",
              "serviceQuickTouchUpCleaningTitleThreeFeatureTwo",
              "serviceQuickTouchUpCleaningTitleThreeFeatureThree",
              "serviceQuickTouchUpCleaningTitleThreeFeatureFour",
            ],
          },
          {
            title: "serviceQuickTouchUpCleaningHighlightCardTitleFour",
            features: [
              "serviceQuickTouchUpCleaningTitleFourFeatureOne",
              "serviceQuickTouchUpCleaningTitleFourFeatureTwo",
              "serviceQuickTouchUpCleaningTitleFourFeatureThree",
            ],
          },
          {
            title: "serviceQuickTouchUpCleaningHighlightCardTitleFive",
            features: [
              "serviceQuickTouchUpCleaningTitleFiveFeatureOne",
              "serviceQuickTouchUpCleaningTitleFiveFeatureTwo",
              "serviceQuickTouchUpCleaningTitleFiveFeatureThree",
            ],
          },
        ],
      },
    ],
  },

  "same-day-priority-cleaning": {
    introduction: {
      headline: "serviceSameDayPriorityCleaningIntroHeadLine",
      body: "serviceSameDayPriorityCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceSameDayPriorityCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceSameDayPriorityCleaningHighlightCardTitleTwo",
            features: [
              "serviceSameDayPriorityCleaningTitleTwoFeatureOne",
              "serviceSameDayPriorityCleaningTitleTwoFeatureTwo",
            ],
          },
          {
            title: "serviceSameDayPriorityCleaningHighlightCardTitleThree",
            features: [
              "serviceSameDayPriorityCleaningTitleThreeFeatureOne",
              "serviceSameDayPriorityCleaningTitleThreeFeatureTwo",
              "serviceSameDayPriorityCleaningTitleThreeFeatureThree",
              "serviceSameDayPriorityCleaningTitleThreeFeatureFour",
            ],
          },
          {
            title: "serviceSameDayPriorityCleaningHighlightCardTitleFour",
            features: [
              "serviceSameDayPriorityCleaningTitleFourFeatureOne",
              "serviceSameDayPriorityCleaningTitleFourFeatureTwo",
              "serviceSameDayPriorityCleaningTitleFourFeatureThree",
              "serviceSameDayPriorityCleaningTitleFourFeatureFour",
            ],
          },
        ],
      },
      {
        title: "serviceSameDayPriorityCleaningHighlightTitleTwo",
        cards: [
          {
            title: "serviceSameDayPriorityCleaningHighlightCardTitleSix",
            features: [
              "serviceSameDayPriorityCleaningTitleSixFeatureOne",
              "serviceSameDayPriorityCleaningTitleSixFeatureTwo",
              "serviceSameDayPriorityCleaningTitleSixFeatureThree",
              "serviceSameDayPriorityCleaningTitleSixFeatureFour",
              "serviceSameDayPriorityCleaningTitleSixFeatureFive",
            ],
          },
          {
            title: "serviceSameDayPriorityCleaningHighlightCardTitleSeven",
            features: [
              "serviceSameDayPriorityCleaningTitleSevenFeatureOne",
              "serviceSameDayPriorityCleaningTitleSevenFeatureTwo",
              "serviceSameDayPriorityCleaningTitleSevenFeatureThree",
              "serviceSameDayPriorityCleaningTitleSevenFeatureFour",
              "serviceSameDayPriorityCleaningTitleSevenFeatureFive",
              "serviceSameDayPriorityCleaningTitleSevenFeatureSix",
            ],
          },
        ],
      },
    ],
  },

  "deep-cleaning": {
    introduction: {
      headline: "serviceDeepCleaningIntroHeadLine",
      body: "serviceDeepCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceDeepCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceDeepCleaningHighlightCardTitleTwo",
            features: [
              "serviceDeepCleaningTitleTwoFeatureOne",
              "serviceDeepCleaningTitleTwoFeatureTwo",
              "serviceDeepCleaningTitleTwoFeatureThree",
            ],
          },
          {
            title: "serviceDeepCleaningHighlightCardTitleThree",
            features: [
              "serviceDeepCleaningTitleThreeFeatureOne",
              "serviceDeepCleaningTitleThreeFeatureTwo",
              "serviceDeepCleaningTitleThreeFeatureThree",
            ],
          },
          {
            title: "serviceDeepCleaningHighlightCardTitleFour",
            features: [
              "serviceDeepCleaningTitleFourFeatureOne",
              "serviceDeepCleaningTitleFourFeatureTwo",
              "serviceDeepCleaningTitleFourFeatureThree",
            ],
          },
          {
            title: "serviceDeepCleaningHighlightCardTitleFive",
            features: [
              "serviceDeepCleaningTitleFiveFeatureOne",
              "serviceDeepCleaningTitleFiveFeatureTwo",
              "serviceDeepCleaningTitleFiveFeatureThree",
            ],
          },
        ],
      },
    ],
  },

  "end-of-tenancy-cleaning": {
    introduction: {
      headline: "serviceEndOfTenancyCleaningIntroHeadLine",
      body: "serviceEndOfTenancyCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceEndOfTenancyCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceEndOfTenancyCleaningHighlightCardTitleTwo",
            features: [
              "serviceEndOfTenancyCleaningTitleTwoFeatureOne",
              "serviceEndOfTenancyCleaningTitleTwoFeatureTwo",
              "serviceEndOfTenancyCleaningTitleTwoFeatureThree",
            ],
          },
          {
            title: "serviceEndOfTenancyCleaningHighlightCardTitleThree",
            features: [
              "serviceEndOfTenancyCleaningTitleThreeFeatureOne",
              "serviceEndOfTenancyCleaningTitleThreeFeatureTwo",
            ],
          },
          {
            title: "serviceEndOfTenancyCleaningHighlightCardTitleFour",
            features: [
              "serviceEndOfTenancyCleaningTitleFourFeatureOne",
              "serviceEndOfTenancyCleaningTitleFourFeatureTwo",
              "serviceEndOfTenancyCleaningTitleFourFeatureThree",
            ],
          },
          {
            title: "serviceEndOfTenancyCleaningHighlightCardTitleFive",
            features: [
              "serviceEndOfTenancyCleaningTitleFiveFeatureOne",
              "serviceEndOfTenancyCleaningTitleFiveFeatureTwo",
            ],
          },
        ],
      },
    ],
  },

  "post-construction-renovation-cleaning": {
    introduction: {
      headline: "servicePostConstructionRenovationCleaningIntroHeadLine",
      body: "servicePostConstructionRenovationCleaningIntroBody",
    },
    highlights: [
      {
        title: "servicePostConstructionRenovationCleaningHighlightTitleOne",
        cards: [
          {
            title: "servicePostConstructionRenovationCleaningHighlightCardTitleTwo",
            features: [
              "servicePostConstructionRenovationCleaningTitleTwoFeatureOne",
              "servicePostConstructionRenovationCleaningTitleTwoFeatureTwo",
              "servicePostConstructionRenovationCleaningTitleTwoFeatureThree",
            ],
          },
          {
            title: "servicePostConstructionRenovationCleaningHighlightCardTitleThree",
            features: [
              "servicePostConstructionRenovationCleaningTitleThreeFeatureOne",
              "servicePostConstructionRenovationCleaningTitleThreeFeatureTwo",
            ],
          },
          {
            title: "servicePostConstructionRenovationCleaningHighlightCardTitleFour",
            features: [
              "servicePostConstructionRenovationCleaningTitleFourFeatureOne",
              "servicePostConstructionRenovationCleaningTitleFourFeatureTwo",
              "servicePostConstructionRenovationCleaningTitleFourFeatureThree",
            ],
          },
          {
            title: "servicePostConstructionRenovationCleaningHighlightCardTitleFive",
            features: [
              "servicePostConstructionRenovationCleaningTitleFiveFeatureOne",
              "servicePostConstructionRenovationCleaningTitleFiveFeatureTwo",
            ],
          },
        ],
      },
    ],
  },

  "premium-rental-concierge-cleaning": {
    introduction: {
      headline: "servicePremiumRentalConciergeCleaningIntroHeadLine",
      body: "servicePremiumRentalConciergeCleaningIntroBody",
    },
    highlights: [
      {
        title: "servicePremiumRentalConciergeCleaningHighlightTitleOne",
        cards: [
          {
            title: "servicePremiumRentalConciergeCleaningHighlightCardTitleTwo",
            features: [
              "servicePremiumRentalConciergeCleaningTitleTwoFeatureOne",
              "servicePremiumRentalConciergeCleaningTitleTwoFeatureTwo",
              "servicePremiumRentalConciergeCleaningTitleTwoFeatureThree",
              "servicePremiumRentalConciergeCleaningTitleTwoFeatureFour",
              "servicePremiumRentalConciergeCleaningTitleTwoFeatureFive",
            ],
          },
          {
            title: "servicePremiumRentalConciergeCleaningHighlightCardTitleThree",
            features: [
              "servicePremiumRentalConciergeCleaningTitleThreeFeatureOne",
              "servicePremiumRentalConciergeCleaningTitleThreeFeatureTwo",
              "servicePremiumRentalConciergeCleaningTitleThreeFeatureThree",
              "servicePremiumRentalConciergeCleaningTitleThreeFeatureFour",
            ],
          },
          {
            title: "servicePremiumRentalConciergeCleaningHighlightCardTitleFour",
            features: [
              "servicePremiumRentalConciergeCleaningTitleFourFeatureOne",
              "servicePremiumRentalConciergeCleaningTitleFourFeatureTwo",
              "servicePremiumRentalConciergeCleaningTitleFourFeatureThree",
              "servicePremiumRentalConciergeCleaningTitleFourFeatureFour",
            ],
          },
          {
            title: "servicePremiumRentalConciergeCleaningHighlightCardTitleFive",
            features: [
              "servicePremiumRentalConciergeCleaningTitleFiveFeatureOne",
              "servicePremiumRentalConciergeCleaningTitleFiveFeatureTwo",
              "servicePremiumRentalConciergeCleaningTitleFiveFeatureThree",
              "servicePremiumRentalConciergeCleaningTitleFiveFeatureFour",
            ],
          },
        ],
      },
    ],
  },

  "commercial-office-cleaning": {
    introduction: {
      headline: "serviceCommercialOfficeCleaningIntroHeadLine",
      body: "serviceCommercialOfficeCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceCommercialOfficeCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleTwo",
            features: [
              "serviceCommercialOfficeCleaningTitleTwoFeatureOne",
              "serviceCommercialOfficeCleaningTitleTwoFeatureTwo",
              "serviceCommercialOfficeCleaningTitleTwoFeatureThree",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleThree",
            features: [
              "serviceCommercialOfficeCleaningTitleThreeFeatureOne",
              "serviceCommercialOfficeCleaningTitleThreeFeatureTwo",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleFour",
            features: [
              "serviceCommercialOfficeCleaningTitleFourFeatureOne",
              "serviceCommercialOfficeCleaningTitleFourFeatureTwo",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleFive",
            features: [
              "serviceCommercialOfficeCleaningTitleFiveFeatureOne",
              "serviceCommercialOfficeCleaningTitleFiveFeatureTwo",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleSix",
            features: [
              "serviceCommercialOfficeCleaningTitleSixFeatureOne",
              "serviceCommercialOfficeCleaningTitleSixFeatureTwo",
            ],
          },
        ],
      },
      {
        title: "serviceCommercialOfficeCleaningHighlightTitleSeven",
        cards: [
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleEight",
            features: [
              "serviceCommercialOfficeCleaningTitleEightFeatureOne",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleNine",
            features: [
              "serviceCommercialOfficeCleaningTitleNineFeatureOne",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleTen",
            features: [
              "serviceCommercialOfficeCleaningTitleTenFeatureOne",
            ],
          },
          {
            title: "serviceCommercialOfficeCleaningHighlightCardTitleEleven",
            features: [
              "serviceCommercialOfficeCleaningTitleElevenFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "healthguard-sanitization": {
    introduction: {
      headline: "serviceHealthguardSanitizationIntroHeadLine",
      body: "serviceHealthguardSanitizationIntroBody",
    },
    highlights: [
      {
        title: "serviceHealthguardSanitizationHighlightTitleOne",
        cards: [
          {
            title: "serviceHealthguardSanitizationHighlightCardTitleTwo",
            features: [
              "serviceHealthguardSanitizationTitleTwoFeatureOne",
              "serviceHealthguardSanitizationTitleTwoFeatureTwo",
              "serviceHealthguardSanitizationTitleTwoFeatureThree",
            ],
          },
          {
            title: "serviceHealthguardSanitizationHighlightCardTitleThree",
            features: [
              "serviceHealthguardSanitizationTitleThreeFeatureOne",
              "serviceHealthguardSanitizationTitleThreeFeatureTwo",
              "serviceHealthguardSanitizationTitleThreeFeatureThree",
            ],
          },
          {
            title: "serviceHealthguardSanitizationHighlightCardTitleFour",
            features: [
              "serviceHealthguardSanitizationTitleFourFeatureOne",
              "serviceHealthguardSanitizationTitleFourFeatureTwo",
            ],
          },
          {
            title: "serviceHealthguardSanitizationHighlightCardTitleFive",
            features: [
              "serviceHealthguardSanitizationTitleFiveFeatureOne",
              "serviceHealthguardSanitizationTitleFiveFeatureTwo",
            ],
          },
          {
            title: "serviceHealthguardSanitizationHighlightCardTitleSix",
            features: [
              "serviceHealthguardSanitizationTitleSixFeatureOne",
              "serviceHealthguardSanitizationTitleSixFeatureTwo",
            ],
          },
        ],
      },
    ],
  },

  "carpet-upholstery-cleaning": {
    introduction: {
      headline: "serviceCarpetUpholsteryCleaningIntroHeadLine",
      body: "serviceCarpetUpholsteryCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceCarpetUpholsteryCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceCarpetUpholsteryCleaningHighlightCardTitleTwo",
            features: [
              "serviceCarpetUpholsteryCleaningTitleTwoFeatureOne",
              "serviceCarpetUpholsteryCleaningTitleTwoFeatureTwo",
              "serviceCarpetUpholsteryCleaningTitleTwoFeatureThree",
              "serviceCarpetUpholsteryCleaningTitleTwoFeatureFour",
            ],
          },
          {
            title: "serviceCarpetUpholsteryCleaningHighlightCardTitleThree",
            features: [
              "serviceCarpetUpholsteryCleaningTitleThreeFeatureOne",
              "serviceCarpetUpholsteryCleaningTitleThreeFeatureTwo",
              "serviceCarpetUpholsteryCleaningTitleThreeFeatureThree",
            ],
          },
          {
            title: "serviceCarpetUpholsteryCleaningHighlightCardTitleFour",
            features: [
              "serviceCarpetUpholsteryCleaningTitleFourFeatureOne",
              "serviceCarpetUpholsteryCleaningTitleFourFeatureTwo",
              "serviceCarpetUpholsteryCleaningTitleFourFeatureThree",
            ],
          },
          {
            title: "serviceCarpetUpholsteryCleaningHighlightCardTitleFive",
            features: [
              "serviceCarpetUpholsteryCleaningTitleFiveFeatureOne",
              "serviceCarpetUpholsteryCleaningTitleFiveFeatureTwo",
              "serviceCarpetUpholsteryCleaningTitleFiveFeatureThree",
            ],
          },
          {
            title: "serviceCarpetUpholsteryCleaningHighlightCardTitleSix",
            features: [
              "serviceCarpetUpholsteryCleaningTitleSixFeatureOne",
              "serviceCarpetUpholsteryCleaningTitleSixFeatureTwo",
              "serviceCarpetUpholsteryCleaningTitleSixFeatureThree",
            ],
          },
        ],
      },
    ],
  },

  "steam-cleaning": {
    introduction: {
      headline: "serviceSteamCleaningIntroHeadLine",
      body: "serviceSteamCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceSteamCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceSteamCleaningHighlightCardTitleTwo",
            features: [
              "serviceSteamCleaningTitleTwoFeatureOne",
              "serviceSteamCleaningTitleTwoFeatureTwo",
              "serviceSteamCleaningTitleTwoFeatureThree",
            ],
          },
          {
            title: "serviceSteamCleaningHighlightCardTitleThree",
            features: [
              "serviceSteamCleaningTitleThreeFeatureOne",
              "serviceSteamCleaningTitleThreeFeatureTwo",
            ],
          },
          {
            title: "serviceSteamCleaningHighlightCardTitleFour",
            features: [
              "serviceSteamCleaningTitleFourFeatureOne",
              "serviceSteamCleaningTitleFourFeatureTwo",
            ],
          },
          {
            title: "serviceSteamCleaningHighlightCardTitleFive",
            features: [
              "serviceSteamCleaningTitleFiveFeatureOne",
              "serviceSteamCleaningTitleFiveFeatureTwo",
              "serviceSteamCleaningTitleFiveFeatureThree",
            ],
          },
        ],
      },
    ],
  },

  "post-event-cleaning": {
    introduction: {
      headline: "servicePostEventCleaningIntroHeadLine",
      body: "servicePostEventCleaningIntroBody",
    },
    highlights: [
      {
        title: "servicePostEventCleaningHighlightTitleOne",
        cards: [
          {
            title: "servicePostEventCleaningHighlightCardTitleTwo",
            features: [
              "servicePostEventCleaningTitleTwoFeatureOne",
              "servicePostEventCleaningTitleTwoFeatureTwo",
              "servicePostEventCleaningTitleTwoFeatureThree",
              "servicePostEventCleaningTitleTwoFeatureFour",
              "servicePostEventCleaningTitleTwoFeatureFive",
            ],
          },
          {
            title: "servicePostEventCleaningHighlightCardTitleThree",
            features: [
              "servicePostEventCleaningTitleThreeFeatureOne",
              "servicePostEventCleaningTitleThreeFeatureTwo",
              "servicePostEventCleaningTitleThreeFeatureThree",
              "servicePostEventCleaningTitleThreeFeatureFour",
            ],
          },
          {
            title: "servicePostEventCleaningHighlightCardTitleFour",
            features: [
              "servicePostEventCleaningTitleFourFeatureOne",
              "servicePostEventCleaningTitleFourFeatureTwo",
              "servicePostEventCleaningTitleFourFeatureThree",
              "servicePostEventCleaningTitleFourFeatureFour",
            ],
          },
          {
            title: "servicePostEventCleaningHighlightCardTitleFive",
            features: [
              "servicePostEventCleaningTitleFiveFeatureOne",
              "servicePostEventCleaningTitleFiveFeatureTwo",
              "servicePostEventCleaningTitleFiveFeatureThree",
              "servicePostEventCleaningTitleFiveFeatureFour",
            ],
          },
        ],
      },
    ],
  },

  "pool-cleaning": {
    introduction: {
      headline: "servicePoolCleaningIntroHeadLine",
      body: "servicePoolCleaningIntroBody",
    },
    highlights: [
      {
        title: "servicePoolCleaningHighlightTitleOne",
        cards: [
          {
            title: "servicePoolCleaningHighlightCardTitleTwo",
            features: [
              "servicePoolCleaningTitleTwoFeatureOne",
            ],
          },
          {
            title: "servicePoolCleaningHighlightCardTitleThree",
            features: [
              "servicePoolCleaningTitleThreeFeatureOne",
            ],
          },
          {
            title: "servicePoolCleaningHighlightCardTitleFour",
            features: [
              "servicePoolCleaningTitleFourFeatureOne",
            ],
          },
          {
            title: "servicePoolCleaningHighlightCardTitleFive",
            features: [
              "servicePoolCleaningTitleFiveFeatureOne",
            ],
          },
          {
            title: "servicePoolCleaningHighlightCardTitleSix",
            features: [
              "servicePoolCleaningTitleSixFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "precision-pressure-washing": {
    introduction: {
      headline: "servicePrecisionPressureWashingIntroHeadLine",
      body: "servicePrecisionPressureWashingIntroBody",
    },
    highlights: [
      {
        title: "servicePrecisionPressureWashingHighlightTitleOne",
        cards: [
          {
            title: "servicePrecisionPressureWashingHighlightCardTitleTwo",
            features: [
              "servicePrecisionPressureWashingTitleTwoFeatureOne",
            ],
          },
          {
            title: "servicePrecisionPressureWashingHighlightCardTitleThree",
            features: [
              "servicePrecisionPressureWashingTitleThreeFeatureOne",
            ],
          },
          {
            title: "servicePrecisionPressureWashingHighlightCardTitleFour",
            features: [
              "servicePrecisionPressureWashingTitleFourFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "child-care-service": {
    introduction: {
      headline: "serviceChildCareServiceIntroHeadLine",
      body: "serviceChildCareServiceIntroBody",
    },
    highlights: [
      {
        title: "serviceChildCareServiceHighlightTitleOne",
        cards: [
          {
            title: "serviceChildCareServiceHighlightCardTitleTwo",
            features: [
              "serviceChildCareServiceTitleTwoFeatureOne",
            ],
          },
          {
            title: "serviceChildCareServiceHighlightCardTitleThree",
            features: [
              "serviceChildCareServiceTitleThreeFeatureOne",
            ],
          },
          {
            title: "serviceChildCareServiceHighlightCardTitleFour",
            features: [
              "serviceChildCareServiceTitleFourFeatureOne",
            ],
          },
          {
            title: "serviceChildCareServiceHighlightCardTitleFive",
            features: [
              "serviceChildCareServiceTitleFiveFeatureOne",
            ],
          },
          {
            title: "serviceChildCareServiceHighlightCardTitleSix",
            features: [
              "serviceChildCareServiceTitleSixFeatureOne",
            ],
          },
          {
            title: "serviceChildCareServiceHighlightCardTitleSeven",
            features: [
              "serviceChildCareServiceTitleSevenFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "elder-care-service": {
    introduction: {
      headline: "serviceElderCareServiceIntroHeadLine",
      body: "serviceElderCareServiceIntroBody",
    },
    highlights: [
      {
        title: "serviceElderCareServiceHighlightTitleOne",
        cards: [
          {
            title: "serviceElderCareServiceHighlightCardTitleTwo",
            features: [
              "serviceElderCareServiceTitleTwoFeatureOne",
              "serviceElderCareServiceTitleTwoFeatureTwo",
            ],
          },
          {
            title: "serviceElderCareServiceHighlightCardTitleThree",
            features: [
              "serviceElderCareServiceTitleThreeFeatureOne",
              "serviceElderCareServiceTitleThreeFeatureTwo",
              "serviceElderCareServiceTitleThreeFeatureThree",
            ],
          },
          {
            title: "serviceElderCareServiceHighlightCardTitleFour",
            features: [
              "serviceElderCareServiceTitleFourFeatureOne",
              "serviceElderCareServiceTitleFourFeatureTwo",
            ],
          },
        ],
      },
    ],
  },

  "laundry-service": {
    introduction: {
      headline: "serviceLaundryServiceIntroHeadLine",
      body: "serviceLaundryServiceIntroBody",
    },
    highlights: [
      {
        title: "serviceLaundryServiceHighlightTitleOne",
        cards: [
          {
            title: "serviceLaundryServiceHighlightCardTitleTwo",
            features: [
              "serviceLaundryServiceTitleTwoFeatureOne",
            ],
          },
          {
            title: "serviceLaundryServiceHighlightCardTitleThree",
            features: [
              "serviceLaundryServiceTitleThreeFeatureOne",
            ],
          },
          {
            title: "serviceLaundryServiceHighlightCardTitleFour",
            features: [
              "serviceLaundryServiceTitleFourFeatureOne",
            ],
          },
          {
            title: "serviceLaundryServiceHighlightCardTitleFive",
            features: [
              "serviceLaundryServiceTitleFiveFeatureOne",
            ],
          },
          {
            title: "serviceLaundryServiceHighlightCardTitleSix",
            features: [
              "serviceLaundryServiceTitleSixFeatureOne",
            ],
          },
          {
            title: "serviceLaundryServiceHighlightCardTitleSeven",
            features: [
              "serviceLaundryServiceTitleSevenFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "move-in-out-transport-service": {
    introduction: {
      headline: "serviceMoveInOutTransportServiceIntroHeadLine",
      body: "serviceMoveInOutTransportServiceIntroBody",
    },
    highlights: [
      {
        title: "serviceMoveInOutTransportServiceHighlightTitleOne",
        cards: [
          {
            title: "serviceMoveInOutTransportServiceHighlightCardTitleTwo",
            features: [
              "serviceMoveInOutTransportServiceTitleTwoFeatureOne",
            ],
          },
          {
            title: "serviceMoveInOutTransportServiceHighlightCardTitleThree",
            features: [
              "serviceMoveInOutTransportServiceTitleThreeFeatureOne",
            ],
          },
          {
            title: "serviceMoveInOutTransportServiceHighlightCardTitleFour",
            features: [
              "serviceMoveInOutTransportServiceTitleFourFeatureOne",
            ],
          },
          {
            title: "serviceMoveInOutTransportServiceHighlightCardTitleFive",
            features: [
              "serviceMoveInOutTransportServiceTitleFiveFeatureOne",
            ],
          },
        ],
      },
    ],
  },

  "high-security-property-care": {
    introduction: {
      headline: "serviceHighSecurityPropertyCareIntroHeadLine",
      body: "serviceHighSecurityPropertyCareIntroBody",
    },
    highlights: [
      {
        title: "serviceHighSecurityPropertyCareHighlightTitleOne",
        cards: [
          {
            title: "serviceHighSecurityPropertyCareHighlightCardTitleTwo",
            features: [
              "serviceHighSecurityPropertyCareTitleTwoFeatureOne",
              "serviceHighSecurityPropertyCareTitleTwoFeatureTwo",
            ],
          },
          {
            title: "serviceHighSecurityPropertyCareHighlightCardTitleThree",
            features: [
              "serviceHighSecurityPropertyCareTitleThreeFeatureOne",
              "serviceHighSecurityPropertyCareTitleThreeFeatureTwo",
            ],
          },
          {
            title: "serviceHighSecurityPropertyCareHighlightCardTitleFour",
            features: [
              "serviceHighSecurityPropertyCareTitleFourFeatureOne",
              "serviceHighSecurityPropertyCareTitleFourFeatureTwo",
            ],
          },
          {
            title: "serviceHighSecurityPropertyCareHighlightCardTitleFive",
            features: [
              "serviceHighSecurityPropertyCareTitleFiveFeatureOne",
              "serviceHighSecurityPropertyCareTitleFiveFeatureTwo",
            ],
          },
        ],
      },
    ],
  },

  "luxury-yacht-cleaning": {
    introduction: {
      headline: "serviceLuxuryYachtCleaningIntroHeadLine",
      body: "serviceLuxuryYachtCleaningIntroBody",
    },
    highlights: [
      {
        title: "serviceLuxuryYachtCleaningHighlightTitleOne",
        cards: [
          {
            title: "serviceLuxuryYachtCleaningHighlightCardTitleTwo",
            features: [
              "serviceLuxuryYachtCleaningTitleTwoFeatureOne",
              "serviceLuxuryYachtCleaningTitleTwoFeatureTwo",
            ],
          },
          {
            title: "serviceLuxuryYachtCleaningHighlightCardTitleThree",
            features: [
              "serviceLuxuryYachtCleaningTitleThreeFeatureOne",
              "serviceLuxuryYachtCleaningTitleThreeFeatureTwo",
            ],
          },
          {
            title: "serviceLuxuryYachtCleaningHighlightCardTitleFour",
            features: [
              "serviceLuxuryYachtCleaningTitleFourFeatureOne",
              "serviceLuxuryYachtCleaningTitleFourFeatureTwo",
            ],
          },
          {
            title: "serviceLuxuryYachtCleaningHighlightCardTitleFive",
            features: [
              "serviceLuxuryYachtCleaningTitleFiveFeatureOne",
              "serviceLuxuryYachtCleaningTitleFiveFeatureTwo",
            ],
          },
        ],
      },
    ],
  
}
}
// Aliases for slug variations between backend catalog and frontend routes
if (SERVICE_CONTENT["regular-home-cleaning"]) {
  SERVICE_CONTENT["regular-maintenance-cleaning"] = SERVICE_CONTENT["regular-home-cleaning"];
}
if (SERVICE_CONTENT["quick-touch-up-cleaning"]) {
  SERVICE_CONTENT["essential-touch-up-cleaning"] = SERVICE_CONTENT["quick-touch-up-cleaning"];
}
if (SERVICE_CONTENT["post-construction-renovation-cleaning"]) {
  SERVICE_CONTENT["post-construction-cleaning"] = SERVICE_CONTENT["post-construction-renovation-cleaning"];
}
if (SERVICE_CONTENT["healthguard-sanitization"]) {
  SERVICE_CONTENT["guard-sanitization-services"] = SERVICE_CONTENT["healthguard-sanitization"];
}
if (SERVICE_CONTENT["pool-cleaning"]) {
  SERVICE_CONTENT["pool-cleaning-maintenance"] = SERVICE_CONTENT["pool-cleaning"];
}
if (SERVICE_CONTENT["child-care-service"]) {
  SERVICE_CONTENT["childcare-services"] = SERVICE_CONTENT["child-care-service"];
}
if (SERVICE_CONTENT["elder-care-service"]) {
  SERVICE_CONTENT["elder-care-services"] = SERVICE_CONTENT["elder-care-service"];
}
if (SERVICE_CONTENT["laundry-service"]) {
  SERVICE_CONTENT["laundry-services"] = SERVICE_CONTENT["laundry-service"];
  SERVICE_CONTENT["laundry-linen-care"] = SERVICE_CONTENT["laundry-service"];
}
if (SERVICE_CONTENT["move-in-out-transport-service"]) {
  SERVICE_CONTENT["move-in-out-transport-health"] = SERVICE_CONTENT["move-in-out-transport-service"];
}
