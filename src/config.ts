// Keep this preview mode until real delivery, broker disclosures, and consent are reviewed.
export const site = {
  name: "Wesley Dulin",
  market: "San Antonio, Texas",
  preview: true,
  // Supply an MP4/WebM URL and a WebVTT caption track together to enable the VSL.
  videoUrl: "",
  captionsUrl: "",
  brokerage: "",
  iabsUrl: "",
};

export const areas = [
  "San Antonio",
  "Stone Oak",
  "Boerne",
  "Alamo Heights",
  "New Braunfels",
  "Still exploring",
];
export const timelines = [
  "As soon as possible",
  "In the next 3 months",
  "In 3 to 6 months",
  "In 6 to 12 months",
  "Just exploring",
];
export const budgets = [
  "Under $300,000",
  "$300,000 to $500,000",
  "$500,000 to $750,000",
  "$750,000 to $1 million",
  "Over $1 million",
  "I would like guidance",
];
export const financing = [
  "I have a preapproval",
  "I am speaking with a lender",
  "I would like help getting started",
  "I plan to pay cash",
];
export const representation = [
  "No, I am looking for an agent",
  "Yes, I am already represented",
];
export type Answers = {
  timeline: string;
  area: string;
  budget: string;
  financing: string;
  representation: string;
  name: string;
  email: string;
  phone: string;
  time: string;
  consent: boolean;
};
export const emptyAnswers: Answers = {
  timeline: "",
  area: "",
  budget: "",
  financing: "",
  representation: "",
  name: "",
  email: "",
  phone: "",
  time: "",
  consent: false,
};
