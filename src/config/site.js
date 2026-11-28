const SITE_URL = import.meta.env.PUBLIC_SITE_URL || "https://allforkeeps.com";
import socials from "../data/for-keeps-socials.json";
import { pricingConfig } from "./pricing.ts";
const assessmentSurveyUrl =
  import.meta.env.PUBLIC_FORMBRICKS_SURVEY_URL?.trim() || "";
if (assessmentSurveyUrl && new URL(assessmentSurveyUrl).protocol !== "https:") {
  throw new Error("PUBLIC_FORMBRICKS_SURVEY_URL must be an HTTPS share URL.");
}

export const serviceLinks = {
  newsletter: pricingConfig.links.newsletter,
  learning: pricingConfig.links.learning,
  shop: pricingConfig.links.shop,
  assessment: pricingConfig.links.assessment,
  assessmentSurvey: assessmentSurveyUrl,
  enterDungeon: pricingConfig.links.learning,
};
export const teamClaim =
  "We are an independent eLearning studio with more than 10 years of experience helping individuals and nonprofit organisations make the most of opensource technology.";
export const teamClaimTeam =
  "We are a small team of nonprofit technology consultants with insider experience.";
export const teamClaimMode = "independent";
const selectedTeamClaim =
  teamClaimMode === "team" ? teamClaimTeam : teamClaim;
const xProfile = socials.find((social) => social.name === "X" || social.name === "Twitter");

/** @type {"newsletter" | "assessment"} */
export const primaryCta = "newsletter";
export const primaryCtaLabel =
  primaryCta === "assessment" ? "Book an assessment" : "Join For Keeps";
export const secondaryCtaLabel =
  primaryCta === "assessment" ? "Get updates" : "Book an Assessment";
export const analytics = {
  umamiWebsiteId: import.meta.env.PUBLIC_UMAMI_ID || "",
  umamiScriptUrl: "https://stats.allforkeeps.com/script.js",
};

export const siteConfig = {
  title: "For Keeps",
  author: "For Keeps",
  url: SITE_URL,
  mail: "hello@allforkeeps.com",
  teamClaim: selectedTeamClaim,
  meta: {
    title: "For Keeps",
    description:
      "Learn to choose, build, and maintain nonprofit technology you control. Start with practical open-source guides; pay for scoped expertise when you need it.",
    keywords:
      "For Keeps, nonprofit technology, open source, self-hosting, nonprofit CRM, donor tools, technology ownership",
    image: `${SITE_URL}/assets/keeper.jpg`,
    favicon: `${SITE_URL}/favicon.png`,
    twitterHandle: xProfile?.url ? `@${new URL(xProfile.url).pathname.split("/").filter(Boolean).pop()}` : "",
  },
  social: {
    twitter: xProfile?.url || "",
    twitterHandle: xProfile?.url ? `@${new URL(xProfile.url).pathname.split("/").filter(Boolean).pop()}` : "",
    twitterName: "For Keeps",
    blog: "https://allforkeeps.com/blog",
  },
};
