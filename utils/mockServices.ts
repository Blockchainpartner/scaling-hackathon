import { MockService } from "./types";

export const mockServices: MockService[] = [
  {
    id: 1,
    logo: "logoSNCF.png",
    title: "Reduced train fare proof",
    issuer: "SNCF",
    description:
      "You are eligible to reduced fares on train tickets if you are between 12 and 27 years old, or if you have a disability.",
    cta: {
      title: "GET TICKETS",
      path: "train",
    },
  },
  {
    id: 2,
    logo: "logoAF.png",
    title: "Missed flight insurance",
    issuer: "Airfrance",
    description:
      "You can use this proof to demonstrate that you are on a list of travelers, in case your flight is cancelled.",
  },
  {
    id: 3,
    logo: "logoFC.png",
    title: "18+ year old proof",
    issuer: "France Conntect",
    description:
      "You can demonstrate you are eligible to access age restricted services, by proving you are more than eighteen years old.",
  },
];
