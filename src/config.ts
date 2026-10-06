// Keep preview mode until lead delivery and the completed agent IABS are verified.
export const site = {
  name: "Wesley Dulin",
  market: "Texas",
  preview: true,
  videoUrl: "",
  captionsUrl: "",
  brokerage: "The Branch Real Estate Group Inc.",
  iabsUrl: "",
  calendarUrl: "https://calendly.com/wesleyodulin/client-consultation",
  newConstructionUrl: "",
  socialLinks: [] as { label: string; url: string }[],
  listingsUrl: "https://www.thebranchinc.com/search",
};

export const intents = [
  "I’m buying",
  "I’m selling",
  "Both",
  "Just exploring",
  "Other",
];
export const timelines = [
  "As soon as possible",
  "In the next 3 months",
  "In 3 to 6 months",
  "In 6 to 12 months",
  "Just exploring",
  "Other",
];
export const budgets = [
  "Under $300,000",
  "$300,000 to $500,000",
  "$500,000 to $750,000",
  "$750,000 to $1 million",
  "Over $1 million",
  "I would like guidance",
  "Other",
];
export const financing = [
  "I have a preapproval",
  "I am speaking with a lender",
  "I would like help getting started",
  "I plan to pay cash",
  "Not applicable yet",
  "Other",
];
export const representation = [
  "No, I am looking for an agent",
  "Yes, I am already represented",
  "I am not sure",
  "Other",
];
export type Answers = {
  intent: string;
  intentOther: string;
  timeline: string;
  timelineOther: string;
  area: string;
  budget: string;
  budgetOther: string;
  financing: string;
  financingOther: string;
  representation: string;
  representationOther: string;
  name: string;
  email: string;
  phone: string;
  time: string;
  contactConsent: boolean;
};
export const emptyAnswers: Answers = {
  intent: "",
  intentOther: "",
  timeline: "",
  timelineOther: "",
  area: "",
  budget: "",
  budgetOther: "",
  financing: "",
  financingOther: "",
  representation: "",
  representationOther: "",
  name: "",
  email: "",
  phone: "",
  time: "",
  contactConsent: false,
};
