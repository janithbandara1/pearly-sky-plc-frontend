export interface OurServiceFeature {
  title: string;
  items: string[];
}

export interface OurServiceCopy {
  /** Base English service slug — also the section's anchor id and the key for its icon. */
  id: string;
  title: string;
  headline: string;
  body: string[];
  highlightsTitle: string;
  features: OurServiceFeature[];
}

export interface OurServicesContent {
  badge: string;
  heading: string;
  subheading: string;
  browseLabel: string;
  services: OurServiceCopy[];
}
