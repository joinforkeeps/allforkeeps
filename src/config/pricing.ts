const coursePriceUsd = 50;

export const pricingConfig = {
  currency: "USD",
  coursePriceUsd,
  coursePaymentType: "one time",
  introCoursePriceUsd: 0,
  introCourseName: "Introduction to open-source software and self-hosting",
  assessmentPriceLabel: "Scoped and quoted",
  paymentsLive: false,
  memberCoursePriceCopy:
    `Members can choose one eligible older course free after each new course release. The newest course stays $${coursePriceUsd} for everyone.`,
  nonMemberCoursePriceCopy: `Each course costs $${coursePriceUsd} once. The free introduction is open to everyone.`,
  links: {
    newsletter: "https://news.allforkeeps.com/subscription/form",
    learning: "https://learn.allforkeeps.com/lms/courses",
    shop: "https://learn.allforkeeps.com/lms/courses",
    assessment: "/assessment",
    pricing: "/pricing",
  },
  callsToAction: {
    free: "Browse free guides",
    member: "Join the mailing list",
    courses: "Join the waiting list",
  },
} as const;

export function formatCoursePrice(amount: number) {
  return amount === 0 ? "Free" : `$${amount} ${pricingConfig.currency}`;
}
