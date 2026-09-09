// Service content keys stay aligned with the English dictionary.
import type { TranslationKey } from "../../i18n/dictionaries/en";

export type HeadLine = Extract<TranslationKey, `service${string}IntroHeadLine`>;

/*
export type HeadLine = "serviceRegularCleaningIntroHeadLine" | "serviceQuickTouchUpCleaningIntroHeadLine"
 | "serviceSameDayPriorityCleaningIntroHeadLine" | "serviceDeepCleaningIntroHeadLine" |
  "serviceEndOfTenancyCleaningIntroHeadLine" | "servicePostConstructionRenovationCleaningIntroHeadLine" | 
  "servicePremiumRentalConciergeCleaningIntroHeadLine" | "serviceCommercialOfficeCleaningIntroHeadLine" |
   "serviceHealthguardSanitizationIntroHeadLine" | "serviceCarpetUpholsteryCleaningIntroHeadLine" | 
   "serviceSteamCleaningIntroHeadLine" | "servicePostEventCleaningIntroHeadLine" | 
   "servicePoolCleaningIntroHeadLine" | "servicePrecisionPressureWashingIntroHeadLine" | 
   "serviceChildCareServiceIntroHeadLine" | "serviceElderCareServiceIntroHeadLine" | 
   "serviceLaundryServiceIntroHeadLine" | "serviceMoveInOutTransportServiceIntroHeadLine" | 
   "serviceHighSecurityPropertyCareIntroHeadLine" | "serviceLuxuryYachtCleaningIntroHeadLine";


export type ServiceContentIntroBody= "serviceRegularCleaningIntroBody"|"serviceQuickTouchUpCleaningIntroBody"|
"serviceSameDayPriorityCleaningIntroBody"|"serviceDeepCleaningIntroBody"|
"serviceEndOfTenancyCleaningIntroBody"|"servicePostConstructionRenovationCleaningIntroBody"| "servicePremiumRentalConciergeCleaningIntroBody"|"serviceCommercialOfficeCleaningIntroBody"|
"serviceHealthguardSanitizationIntroBody"|"serviceCarpetUpholsteryCleaningIntroBody"|"serviceSteamCleaningIntroBody"|
"servicePostEventCleaningIntroBody"|"servicePoolCleaningIntroBody"|"servicePrecisionPressureWashingIntroBody"|
"serviceChildCareServiceIntroBody"|"serviceElderCareServiceIntroBody"|"serviceLaundryServiceIntroBody"|
"serviceMoveInOutTransportServiceIntroBody"|"serviceHighSecurityPropertyCareIntroBody" | "serviceLuxuryYachtCleaningIntroBody";


export type ServiceContentHighlightTitles = 
"serviceRegularCleaningHighlightTitleOne" | "serviceQuickTouchUpCleaningHighlightTitleOne" | 
"serviceSameDayPriorityCleaningHighlightTitleOne" | "serviceDeepCleaningHighlightTitleOne" |
"serviceEndOfTenancyCleaningHighlightTitleOne" | "servicePostConstructionRenovationCleaningHighlightTitleOne" | 
"servicePremiumRentalConciergeCleaningHighlightTitleOne" | "serviceCommercialOfficeCleaningHighlightTitleOne" | "serviceHealthguardSanitizationHighlightTitleOne" | "serviceCarpetUpholsteryCleaningHighlightTitleOne" |
"serviceSteamCleaningHighlightTitleOne" | "servicePostEventCleaningHighlightTitleOne" | "servicePoolCleaningHighlightTitleOne" | 
"servicePrecisionPressureWashingHighlightTitleOne" | "serviceChildCareServiceHighlightTitleOne" | "serviceElderCareServiceHighlightTitleOne" |
"serviceLaundryServiceHighlightTitleOne" | "serviceMoveInOutTransportServiceHighlightTitleOne" | 
"serviceHighSecurityPropertyCareHighlightTitleOne" | "serviceLuxuryYachtCleaningHighlightTitleOne";

*/

export type serviceContenthighlihgtCardFeatures=

  // regular-home-cleaning
  | [
      "serviceRegularCleaningTitleOneFeatureOne",
      "serviceRegularCleaningTitleOneFeatureTwo",
      "serviceRegularCleaningTitleOneFeatureThree",
      "serviceRegularCleaningTitleOneFeatureFour"
    ]
  | ["serviceRegularCleaningTitleTwoFeatureOne"]
  | [
      "serviceRegularCleaningTitleThreeFeatureOne",
      "serviceRegularCleaningTitleThreeFeatureTwo",
      "serviceRegularCleaningTitleThreeFeatureThree"
    ]
  | [
      "serviceRegularCleaningTitleFourFeatureOne",
      "serviceRegularCleaningTitleFourFeatureTwo",
      "serviceRegularCleaningTitleFourFeatureThree"
    ]

  // quick-touch-up-cleaning
  | [
      "serviceQuickTouchUpCleaningTitleTwoFeatureOne",
      "serviceQuickTouchUpCleaningTitleTwoFeatureTwo",
      "serviceQuickTouchUpCleaningTitleTwoFeatureThree",
      "serviceQuickTouchUpCleaningTitleTwoFeatureFour",
      "serviceQuickTouchUpCleaningTitleTwoFeatureFive"
    ]
  | [
      "serviceQuickTouchUpCleaningTitleThreeFeatureOne",
      "serviceQuickTouchUpCleaningTitleThreeFeatureTwo",
      "serviceQuickTouchUpCleaningTitleThreeFeatureThree",
      "serviceQuickTouchUpCleaningTitleThreeFeatureFour"
    ]
  | [
      "serviceQuickTouchUpCleaningTitleFourFeatureOne",
      "serviceQuickTouchUpCleaningTitleFourFeatureTwo",
      "serviceQuickTouchUpCleaningTitleFourFeatureThree"
    ]
  | [
      "serviceQuickTouchUpCleaningTitleFiveFeatureOne",
      "serviceQuickTouchUpCleaningTitleFiveFeatureTwo",
      "serviceQuickTouchUpCleaningTitleFiveFeatureThree"
    ]

  // same-day-priority-cleaning
  | [
      "serviceSameDayPriorityCleaningTitleTwoFeatureOne",
      "serviceSameDayPriorityCleaningTitleTwoFeatureTwo"
    ]
  | [
      "serviceSameDayPriorityCleaningTitleThreeFeatureOne",
      "serviceSameDayPriorityCleaningTitleThreeFeatureTwo",
      "serviceSameDayPriorityCleaningTitleThreeFeatureThree",
      "serviceSameDayPriorityCleaningTitleThreeFeatureFour"
    ]
  | [
      "serviceSameDayPriorityCleaningTitleFourFeatureOne",
      "serviceSameDayPriorityCleaningTitleFourFeatureTwo",
      "serviceSameDayPriorityCleaningTitleFourFeatureThree",
      "serviceSameDayPriorityCleaningTitleFourFeatureFour"
    ]
  | [
      "serviceSameDayPriorityCleaningTitleSixFeatureOne",
      "serviceSameDayPriorityCleaningTitleSixFeatureTwo",
      "serviceSameDayPriorityCleaningTitleSixFeatureThree",
      "serviceSameDayPriorityCleaningTitleSixFeatureFour",
      "serviceSameDayPriorityCleaningTitleSixFeatureFive"
    ]
  | [
      "serviceSameDayPriorityCleaningTitleSevenFeatureOne",
      "serviceSameDayPriorityCleaningTitleSevenFeatureTwo",
      "serviceSameDayPriorityCleaningTitleSevenFeatureThree",
      "serviceSameDayPriorityCleaningTitleSevenFeatureFour",
      "serviceSameDayPriorityCleaningTitleSevenFeatureFive",
      "serviceSameDayPriorityCleaningTitleSevenFeatureSix"
    ]

  // deep-cleaning
  | [
      "serviceDeepCleaningTitleTwoFeatureOne",
      "serviceDeepCleaningTitleTwoFeatureTwo",
      "serviceDeepCleaningTitleTwoFeatureThree"
    ]
  | [
      "serviceDeepCleaningTitleThreeFeatureOne",
      "serviceDeepCleaningTitleThreeFeatureTwo",
      "serviceDeepCleaningTitleThreeFeatureThree"
    ]
  | [
      "serviceDeepCleaningTitleFourFeatureOne",
      "serviceDeepCleaningTitleFourFeatureTwo",
      "serviceDeepCleaningTitleFourFeatureThree"
    ]
  | [
      "serviceDeepCleaningTitleFiveFeatureOne",
      "serviceDeepCleaningTitleFiveFeatureTwo",
      "serviceDeepCleaningTitleFiveFeatureThree"
    ]

  // end-of-tenancy-cleaning
  | [
      "serviceEndOfTenancyCleaningTitleTwoFeatureOne",
      "serviceEndOfTenancyCleaningTitleTwoFeatureTwo",
      "serviceEndOfTenancyCleaningTitleTwoFeatureThree"
    ]
  | [
      "serviceEndOfTenancyCleaningTitleThreeFeatureOne",
      "serviceEndOfTenancyCleaningTitleThreeFeatureTwo"
    ]
  | [
      "serviceEndOfTenancyCleaningTitleFourFeatureOne",
      "serviceEndOfTenancyCleaningTitleFourFeatureTwo",
      "serviceEndOfTenancyCleaningTitleFourFeatureThree"
    ]
  | [
      "serviceEndOfTenancyCleaningTitleFiveFeatureOne",
      "serviceEndOfTenancyCleaningTitleFiveFeatureTwo"
    ]

  // post-construction-renovation-cleaning
  | [
      "servicePostConstructionRenovationCleaningTitleTwoFeatureOne",
      "servicePostConstructionRenovationCleaningTitleTwoFeatureTwo",
      "servicePostConstructionRenovationCleaningTitleTwoFeatureThree"
    ]
  | [
      "servicePostConstructionRenovationCleaningTitleThreeFeatureOne",
      "servicePostConstructionRenovationCleaningTitleThreeFeatureTwo"
    ]
  | [
      "servicePostConstructionRenovationCleaningTitleFourFeatureOne",
      "servicePostConstructionRenovationCleaningTitleFourFeatureTwo",
      "servicePostConstructionRenovationCleaningTitleFourFeatureThree"
    ]
  | [
      "servicePostConstructionRenovationCleaningTitleFiveFeatureOne",
      "servicePostConstructionRenovationCleaningTitleFiveFeatureTwo"
    ]

  // premium-rental-concierge-cleaning
  | [
      "servicePremiumRentalConciergeCleaningTitleTwoFeatureOne",
      "servicePremiumRentalConciergeCleaningTitleTwoFeatureTwo",
      "servicePremiumRentalConciergeCleaningTitleTwoFeatureThree",
      "servicePremiumRentalConciergeCleaningTitleTwoFeatureFour",
      "servicePremiumRentalConciergeCleaningTitleTwoFeatureFive"
    ]
  | [
      "servicePremiumRentalConciergeCleaningTitleThreeFeatureOne",
      "servicePremiumRentalConciergeCleaningTitleThreeFeatureTwo",
      "servicePremiumRentalConciergeCleaningTitleThreeFeatureThree",
      "servicePremiumRentalConciergeCleaningTitleThreeFeatureFour"
    ]
  | [
      "servicePremiumRentalConciergeCleaningTitleFourFeatureOne",
      "servicePremiumRentalConciergeCleaningTitleFourFeatureTwo",
      "servicePremiumRentalConciergeCleaningTitleFourFeatureThree",
      "servicePremiumRentalConciergeCleaningTitleFourFeatureFour"
    ]
  | [
      "servicePremiumRentalConciergeCleaningTitleFiveFeatureOne",
      "servicePremiumRentalConciergeCleaningTitleFiveFeatureTwo",
      "servicePremiumRentalConciergeCleaningTitleFiveFeatureThree",
      "servicePremiumRentalConciergeCleaningTitleFiveFeatureFour"
    ]

  // commercial-office-cleaning
  | [
      "serviceCommercialOfficeCleaningTitleTwoFeatureOne",
      "serviceCommercialOfficeCleaningTitleTwoFeatureTwo",
      "serviceCommercialOfficeCleaningTitleTwoFeatureThree"
    ]
  | [
      "serviceCommercialOfficeCleaningTitleThreeFeatureOne",
      "serviceCommercialOfficeCleaningTitleThreeFeatureTwo"
    ]
  | [
      "serviceCommercialOfficeCleaningTitleFourFeatureOne",
      "serviceCommercialOfficeCleaningTitleFourFeatureTwo"
    ]
  | [
      "serviceCommercialOfficeCleaningTitleFiveFeatureOne",
      "serviceCommercialOfficeCleaningTitleFiveFeatureTwo"
    ]
  | [
      "serviceCommercialOfficeCleaningTitleSixFeatureOne",
      "serviceCommercialOfficeCleaningTitleSixFeatureTwo"
    ]
  | ["serviceCommercialOfficeCleaningTitleEightFeatureOne"]
  | ["serviceCommercialOfficeCleaningTitleNineFeatureOne"]
  | ["serviceCommercialOfficeCleaningTitleTenFeatureOne"]
  | ["serviceCommercialOfficeCleaningTitleElevenFeatureOne"]

  // healthguard-sanitization
  | [
      "serviceHealthguardSanitizationTitleTwoFeatureOne",
      "serviceHealthguardSanitizationTitleTwoFeatureTwo",
      "serviceHealthguardSanitizationTitleTwoFeatureThree"
    ]
  | [
      "serviceHealthguardSanitizationTitleThreeFeatureOne",
      "serviceHealthguardSanitizationTitleThreeFeatureTwo",
      "serviceHealthguardSanitizationTitleThreeFeatureThree"
    ]
  | [
      "serviceHealthguardSanitizationTitleFourFeatureOne",
      "serviceHealthguardSanitizationTitleFourFeatureTwo"
    ]
  | [
      "serviceHealthguardSanitizationTitleFiveFeatureOne",
      "serviceHealthguardSanitizationTitleFiveFeatureTwo"
    ]
  | [
      "serviceHealthguardSanitizationTitleSixFeatureOne",
      "serviceHealthguardSanitizationTitleSixFeatureTwo"
    ]

  // carpet-upholstery-cleaning
  | [
      "serviceCarpetUpholsteryCleaningTitleTwoFeatureOne",
      "serviceCarpetUpholsteryCleaningTitleTwoFeatureTwo",
      "serviceCarpetUpholsteryCleaningTitleTwoFeatureThree",
      "serviceCarpetUpholsteryCleaningTitleTwoFeatureFour"
    ]
  | [
      "serviceCarpetUpholsteryCleaningTitleThreeFeatureOne",
      "serviceCarpetUpholsteryCleaningTitleThreeFeatureTwo",
      "serviceCarpetUpholsteryCleaningTitleThreeFeatureThree"
    ]
  | [
      "serviceCarpetUpholsteryCleaningTitleFourFeatureOne",
      "serviceCarpetUpholsteryCleaningTitleFourFeatureTwo",
      "serviceCarpetUpholsteryCleaningTitleFourFeatureThree"
    ]
  | [
      "serviceCarpetUpholsteryCleaningTitleFiveFeatureOne",
      "serviceCarpetUpholsteryCleaningTitleFiveFeatureTwo",
      "serviceCarpetUpholsteryCleaningTitleFiveFeatureThree"
    ]
  | [
      "serviceCarpetUpholsteryCleaningTitleSixFeatureOne",
      "serviceCarpetUpholsteryCleaningTitleSixFeatureTwo",
      "serviceCarpetUpholsteryCleaningTitleSixFeatureThree"
    ]

  // steam-cleaning
  | [
      "serviceSteamCleaningTitleTwoFeatureOne",
      "serviceSteamCleaningTitleTwoFeatureTwo",
      "serviceSteamCleaningTitleTwoFeatureThree"
    ]
  | [
      "serviceSteamCleaningTitleThreeFeatureOne",
      "serviceSteamCleaningTitleThreeFeatureTwo"
    ]
  | [
      "serviceSteamCleaningTitleFourFeatureOne",
      "serviceSteamCleaningTitleFourFeatureTwo"
    ]
  | [
      "serviceSteamCleaningTitleFiveFeatureOne",
      "serviceSteamCleaningTitleFiveFeatureTwo",
      "serviceSteamCleaningTitleFiveFeatureThree"
    ]

  // post-event-cleaning
  | [
      "servicePostEventCleaningTitleTwoFeatureOne",
      "servicePostEventCleaningTitleTwoFeatureTwo",
      "servicePostEventCleaningTitleTwoFeatureThree",
      "servicePostEventCleaningTitleTwoFeatureFour",
      "servicePostEventCleaningTitleTwoFeatureFive"
    ]
  | [
      "servicePostEventCleaningTitleThreeFeatureOne",
      "servicePostEventCleaningTitleThreeFeatureTwo",
      "servicePostEventCleaningTitleThreeFeatureThree",
      "servicePostEventCleaningTitleThreeFeatureFour"
    ]
  | [
      "servicePostEventCleaningTitleFourFeatureOne",
      "servicePostEventCleaningTitleFourFeatureTwo",
      "servicePostEventCleaningTitleFourFeatureThree",
      "servicePostEventCleaningTitleFourFeatureFour"
    ]
  | [
      "servicePostEventCleaningTitleFiveFeatureOne",
      "servicePostEventCleaningTitleFiveFeatureTwo",
      "servicePostEventCleaningTitleFiveFeatureThree",
      "servicePostEventCleaningTitleFiveFeatureFour"
    ]

  // pool-cleaning
  | ["servicePoolCleaningTitleTwoFeatureOne"]
  | ["servicePoolCleaningTitleThreeFeatureOne"]
  | ["servicePoolCleaningTitleFourFeatureOne"]
  | ["servicePoolCleaningTitleFiveFeatureOne"]
  | ["servicePoolCleaningTitleSixFeatureOne"]

  // precision-pressure-washing
  | ["servicePrecisionPressureWashingTitleTwoFeatureOne"]
  | ["servicePrecisionPressureWashingTitleThreeFeatureOne"]
  | ["servicePrecisionPressureWashingTitleFourFeatureOne"]

  // child-care-service
  | ["serviceChildCareServiceTitleTwoFeatureOne"]
  | ["serviceChildCareServiceTitleThreeFeatureOne"]
  | ["serviceChildCareServiceTitleFourFeatureOne"]
  | ["serviceChildCareServiceTitleFiveFeatureOne"]
  | ["serviceChildCareServiceTitleSixFeatureOne"]
  | ["serviceChildCareServiceTitleSevenFeatureOne"]

  // elder-care-service
  | [
      "serviceElderCareServiceTitleTwoFeatureOne",
      "serviceElderCareServiceTitleTwoFeatureTwo"
    ]
  | [
      "serviceElderCareServiceTitleThreeFeatureOne",
      "serviceElderCareServiceTitleThreeFeatureTwo",
      "serviceElderCareServiceTitleThreeFeatureThree"
    ]
  | [
      "serviceElderCareServiceTitleFourFeatureOne",
      "serviceElderCareServiceTitleFourFeatureTwo"
    ]

  // laundry-service
  | ["serviceLaundryServiceTitleTwoFeatureOne"]
  | ["serviceLaundryServiceTitleThreeFeatureOne"]
  | ["serviceLaundryServiceTitleFourFeatureOne"]
  | ["serviceLaundryServiceTitleFiveFeatureOne"]
  | ["serviceLaundryServiceTitleSixFeatureOne"]
  | ["serviceLaundryServiceTitleSevenFeatureOne"]

  // move-in-out-transport-service
  | ["serviceMoveInOutTransportServiceTitleTwoFeatureOne"]
  | ["serviceMoveInOutTransportServiceTitleThreeFeatureOne"]
  | ["serviceMoveInOutTransportServiceTitleFourFeatureOne"]
  | ["serviceMoveInOutTransportServiceTitleFiveFeatureOne"]

  // high-security-property-care
  | [
      "serviceHighSecurityPropertyCareTitleTwoFeatureOne",
      "serviceHighSecurityPropertyCareTitleTwoFeatureTwo"
    ]
  | [
      "serviceHighSecurityPropertyCareTitleThreeFeatureOne",
      "serviceHighSecurityPropertyCareTitleThreeFeatureTwo"
    ]
  | [
      "serviceHighSecurityPropertyCareTitleFourFeatureOne",
      "serviceHighSecurityPropertyCareTitleFourFeatureTwo"
    ]
  | [
      "serviceHighSecurityPropertyCareTitleFiveFeatureOne",
      "serviceHighSecurityPropertyCareTitleFiveFeatureTwo"
    ]

  // luxury-yacht-cleaning
  | [
      "serviceLuxuryYachtCleaningTitleTwoFeatureOne",
      "serviceLuxuryYachtCleaningTitleTwoFeatureTwo"
    ]
  | [
      "serviceLuxuryYachtCleaningTitleThreeFeatureOne",
      "serviceLuxuryYachtCleaningTitleThreeFeatureTwo"
    ]
  | [
      "serviceLuxuryYachtCleaningTitleFourFeatureOne",
      "serviceLuxuryYachtCleaningTitleFourFeatureTwo"
    ]
  | [
      "serviceLuxuryYachtCleaningTitleFiveFeatureOne",
      "serviceLuxuryYachtCleaningTitleFiveFeatureTwo"
    ];

export type LegacyServiceHighlightCardTitles = "serviceRegularCleaningHighlightCardTitleOne" |
            "serviceRegularCleaningHighlightCardTitleTwo" |
            "serviceRegularCleaningHighlightCardTitleThree" | "serviceRegularCleaningHighlightCardTitleFour" | "serviceQuickTouchUpCleaningHighlightCardTitleOne" | 
            "serviceQuickTouchUpCleaningHighlightCardTitleTwo" |
            "serviceQuickTouchUpCleaningHighlightCardTitleThree" | "serviceQuickTouchUpCleaningHighlightCardTitleFour" | "serviceQuickTouchUpCleaningHighlightCardTitleFive" | 
            "serviceSameDayPriorityCleaningHighlightCardTitleOne" | "serviceSameDayPriorityCleaningHighlightCardTitleTwo" |
            "serviceSameDayPriorityCleaningHighlightCardTitleThree" | "serviceSameDayPriorityCleaningHighlightCardTitleFour" | "serviceSameDayPriorityCleaningHighlightCardTitleFive" | 
            "serviceSameDayPriorityCleaningHighlightCardTitleSix" | "serviceSameDayPriorityCleaningHighlightCardTitleSeven" |
            "serviceDeepCleaningHighlightCardTitleOne" | "serviceDeepCleaningHighlightCardTitleTwo" | "serviceDeepCleaningHighlightCardTitleThree" | "serviceDeepCleaningHighlightCardTitleFour" | 
            "serviceDeepCleaningHighlightCardTitleFive" |
            "serviceEndOfTenancyCleaningHighlightCardTitleOne" | "serviceEndOfTenancyCleaningHighlightCardTitleTwo" | "serviceEndOfTenancyCleaningHighlightCardTitleThree" | "serviceEndOfTenancyCleaningHighlightCardTitleFour" | "serviceEndOfTenancyCleaningHighlightCardTitleFive" |
            "servicePostConstructionRenovationCleaningHighlightCardTitleOne" | "servicePostConstructionRenovationCleaningHighlightCardTitleTwo" | "servicePostConstructionRenovationCleaningHighlightCardTitleThree" | "servicePostConstructionRenovationCleaningHighlightCardTitleFour" | "servicePostConstructionRenovationCleaningHighlightCardTitleFive" |
            "servicePremiumRentalConciergeCleaningHighlightCardTitleOne" | "servicePremiumRentalConciergeCleaningHighlightCardTitleTwo" | "servicePremiumRentalConciergeCleaningHighlightCardTitleThree" | "servicePremiumRentalConciergeCleaningHighlightCardTitleFour" | "servicePremiumRentalConciergeCleaningHighlightCardTitleFive" |
            "serviceCommercialOfficeCleaningHighlightCardTitleOne" | "serviceCommercialOfficeCleaningHighlightCardTitleTwo" | "serviceCommercialOfficeCleaningHighlightCardTitleThree" | "serviceCommercialOfficeCleaningHighlightCardTitleFour" | "serviceCommercialOfficeCleaningHighlightCardTitleFive" |
            "serviceCommercialOfficeCleaningHighlightCardTitleSix" | "serviceCommercialOfficeCleaningHighlightCardTitleSeven" | "serviceCommercialOfficeCleaningHighlightCardTitleEight" | "serviceCommercialOfficeCleaningHighlightCardTitleNine" | "serviceCommercialOfficeCleaningHighlightCardTitleTen" |   "serviceCommercialOfficeCleaningHighlightCardTitleEleven" |
            "serviceHealthguardSanitizationHighlightCardTitleOne" | "serviceHealthguardSanitizationHighlightCardTitleTwo" | "serviceHealthguardSanitizationHighlightCardTitleThree" | "serviceHealthguardSanitizationHighlightCardTitleFour" | "serviceHealthguardSanitizationHighlightCardTitleFive" |
            "serviceCarpetUpholsteryCleaningHighlightCardTitleOne" | "serviceCarpetUpholsteryCleaningHighlightCardTitleTwo" | "serviceCarpetUpholsteryCleaningHighlightCardTitleThree" | "serviceCarpetUpholsteryCleaningHighlightCardTitleFour" | "serviceCarpetUpholsteryCleaningHighlightCardTitleFive" |
            "serviceCarpetUpholsteryCleaningHighlightCardTitleSix" | "serviceSteamCleaningHighlightCardTitleOne" | "serviceSteamCleaningHighlightCardTitleTwo" | "serviceSteamCleaningHighlightCardTitleThree" | "serviceSteamCleaningHighlightCardTitleFour" |
            "serviceSteamCleaningHighlightCardTitleFive" | "servicePostEventCleaningHighlightCardTitleOne" | "servicePostEventCleaningHighlightCardTitleTwo" | "servicePostEventCleaningHighlightCardTitleThree" | "servicePostEventCleaningHighlightCardTitleFour" |
            "servicePostEventCleaningHighlightCardTitleFive" | "servicePoolCleaningHighlightCardTitleOne" | "servicePoolCleaningHighlightCardTitleTwo" | "servicePoolCleaningHighlightCardTitleThree" | "servicePoolCleaningHighlightCardTitleFour" |
            "servicePoolCleaningHighlightCardTitleFive" | "servicePoolCleaningHighlightCardTitleSix" | "servicePrecisionPressureWashingHighlightCardTitleOne" | "servicePrecisionPressureWashingHighlightCardTitleTwo" |
            "servicePrecisionPressureWashingHighlightCardTitleThree" | "serviceChildCareServiceHighlightCardTitleOne" | "serviceChildCareServiceHighlightCardTitleTwo" | "serviceChildCareServiceHighlightCardTitleThree" |
            "serviceChildCareServiceHighlightCardTitleFour" | "serviceChildCareServiceHighlightCardTitleFive" | "serviceChildCareServiceHighlightCardTitleSix" | "serviceChildCareServiceHighlightCardTitleSeven" |
            "serviceElderCareServiceHighlightCardTitleOne" | "serviceElderCareServiceHighlightCardTitleTwo" | "serviceElderCareServiceHighlightCardTitleThree" | "serviceElderCareServiceHighlightCardTitleFour" |
            "serviceLaundryServiceHighlightCardTitleOne" | "serviceLaundryServiceHighlightCardTitleTwo" | "serviceLaundryServiceHighlightCardTitleThree" | "serviceLaundryServiceHighlightCardTitleFour" |
            "serviceLaundryServiceHighlightCardTitleFive" | "serviceLaundryServiceHighlightCardTitleSix" | "serviceLaundryServiceHighlightCardTitleSeven" | "serviceMoveInOutTransportServiceHighlightCardTitleOne" |   "serviceMoveInOutTransportServiceHighlightCardTitleTwo" | "serviceMoveInOutTransportServiceHighlightCardTitleThree" | "serviceMoveInOutTransportServiceHighlightCardTitleFour" |
            "serviceHighSecurityPropertyCareHighlightCardTitleOne" | "serviceHighSecurityPropertyCareHighlightCardTitleTwo" | "serviceHighSecurityPropertyCareHighlightCardTitleThree" | "serviceHighSecurityPropertyCareHighlightCardTitleFour" |
            "serviceLuxuryYachtCleaningHighlightCardTitleOne" | "serviceLuxuryYachtCleaningHighlightCardTitleTwo" | "serviceLuxuryYachtCleaningHighlightCardTitleThree" | "serviceLuxuryYachtCleaningHighlightCardTitleFour";
export type ServiceContentIntroBody = Extract<TranslationKey, `service${string}IntroBody`>;
export type ServiceContentHighlightTitles = Extract<TranslationKey, `service${string}HighlightTitle${string}`>;
export type serviceHighlightCardTitles = Extract<TranslationKey, `service${string}HighlightCardTitle${string}`>;