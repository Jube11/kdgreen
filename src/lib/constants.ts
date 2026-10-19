export const COMPANY = {
  name: "KD Green Multiservices LLC",
  shortName: "KD Green",
  phone: "(813) 680-8203",
  phoneTel: "+18136808203",
  email: "info@kdgreen.com",
  tagline: "Roadside Assistance 24/7",
  usdot: "USDOT #9061199",
  area: "South Florida",
};

export const SITE = {
  name: COMPANY.name,
  phone: COMPANY.phone,
  phoneHref: `tel:${COMPANY.phoneTel}`,
  email: COMPANY.email,
  usdot: COMPANY.usdot,
  tagline: COMPANY.tagline,
};

export const WHY_US = [
  {
    icon: "bolt",
    title: "Rapid Mobile Dispatch",
    description: "Technicians dispatched immediately across South Florida with specialized mobile tooling.",
  },
  {
    icon: "build",
    title: "Certified Commercial Specialists",
    description: "Experienced diesel mechanics capable of handling heavy-duty rigs and medium trucks.",
  },
  {
    icon: "payments",
    title: "Transparent & Upfront Pricing",
    description: "Direct estimates without hidden shop markups or towing fees.",
  },
];
