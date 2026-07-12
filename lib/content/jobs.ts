export interface Job {
  id: string;
  title: string;
  category: string;
  employmentType: string;
  location: string;
  bookable: boolean;
  aboutParagraphs: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: "residential-cleaner",
    title: "Cleaner (Male / Female) — Residential and Commercial Properties",
    category: "Cleaning",
    employmentType: "Full-Time / Part-Time / Flexible Shifts",
    location: "France / United Kingdom",
    bookable: true,
    aboutParagraphs: [
      "At Pearly Sky, we are committed to maintaining clean, safe, and welcoming environments for our clients. Whether it's homes, offices, or specialized facilities, we deliver excellence with every sweep, mop, and dusting motion.",
      "Joining our team means becoming part of a supportive and innovative organization that values your skills and offers opportunities for personal and professional growth.",
    ],
    responsibilities: [
      "Sweep, mop, vacuum, and dust floors and surfaces to maintain cleanliness and order.",
      "Sanitize and disinfect high-touch areas such as door handles, light switches, and countertops.",
      "Empty trash bins and replace liners promptly.",
      "Perform deep cleaning assignments, including carpet shampooing, upholstery cleaning, and floor waxing.",
      "Operate and maintain cleaning equipment such as vacuums, carpet cleaners, and floor polishers.",
      "Provide exceptional service by addressing client requests and ensuring satisfaction.",
    ],
    requirements: [
      "High school diploma or equivalent.",
      "Strong attention to detail and commitment to delivering quality results.",
      "Physical ability to perform tasks requiring bending, lifting, and standing for extended periods.",
      "Knowledge of basic cleaning techniques and equipment usage.",
      "Punctuality and reliability to adhere to scheduled shifts.",
    ],
    benefits: [
      "Competitive salary — €11.50–€15.00 per hour, commensurate with experience.",
      "Overtime pay for evening or weekend shifts.",
      "Opportunities for bonuses based on performance and client satisfaction.",
      "Supportive and inclusive work environment.",
    ],
  },
  {
    id: "childcare-assistant",
    title: "Children Care Worker (Male / Female)",
    category: "Childcare",
    employmentType: "Part-Time / Full-Time",
    location: "France / United Kingdom",
    bookable: true,
    aboutParagraphs: [
      "Pearly Sky's care team supports families with trusted, attentive childcare in the home. We're looking for warm, reliable individuals who genuinely love working with children.",
    ],
    responsibilities: [
      "Provide attentive and nurturing care to children in their homes or designated facilities.",
      "Assist with daily routines, including meals, homework, playtime, and bedtime.",
      "Ensure a safe, clean, and stimulating environment for children.",
      "Communicate effectively with parents regarding their children's needs and progress.",
      "Follow all safety and hygiene protocols.",
    ],
    requirements: [
      "Previous experience in childcare or a related field is preferred.",
      "Patience, empathy, and a genuine love for working with children.",
      "Strong communication skills in English and French.",
      "Ability to handle emergencies calmly and responsibly.",
      "Valid certifications in CPR/First Aid (preferred but not mandatory).",
    ],
    benefits: [
      "Competitive salary and benefits.",
      "Flexible working hours.",
      "Opportunity to make a positive impact on families and children.",
      "Supportive and inclusive work environment.",
    ],
  },
  {
    id: "elder-care-assistant",
    title: "Elder Care Worker (Male / Female)",
    category: "Elder Care",
    employmentType: "Full-Time / Part-Time / Flexible Shifts",
    location: "France / United Kingdom",
    bookable: true,
    aboutParagraphs: [
      "Pearly Sky's elder care team brings compassionate, professional support to seniors in their own homes, helping them live safely and comfortably with dignity.",
    ],
    responsibilities: [
      "Provide personalized care to elderly clients in their homes or care facilities.",
      "Assist with daily activities such as bathing, dressing, meal preparation, and medication reminders.",
      "Offer companionship and emotional support to seniors.",
      "Ensure a safe, clean, and comfortable environment for clients.",
      "Communicate effectively with families and healthcare professionals regarding clients' needs and progress.",
    ],
    requirements: [
      "Previous experience in elder care or a related field is preferred.",
      "Compassion, patience, and a genuine desire to help seniors.",
      "Strong communication skills in English and French.",
      "Ability to handle emergencies calmly and responsibly.",
      "Valid certifications in CPR/First Aid (preferred but not mandatory).",
    ],
    benefits: [
      "Competitive salary and benefits.",
      "Flexible working hours.",
      "Opportunity to make a meaningful impact in seniors' lives.",
      "Supportive and inclusive work environment.",
    ],
  },
];

export function getJob(id: string) {
  return jobs.find((job) => job.id === id);
}
