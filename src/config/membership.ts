type MemberFreePickMode = "one_pick_per_release" | "all_older";

type MembershipConfig = {
  memberDefinition: string;
  costUsd: number;
  subscriptionsAvailable: boolean;
  earlyAccessDays: number;
  memberFreePickMode: MemberFreePickMode;
  memberFreePickCountPerRelease: number;
  newestCoursePaidForEveryone: boolean;
  benefits: string[];
};

export const membershipConfig: MembershipConfig = {
  memberDefinition: "A member is anyone on the For Keeps mailing list",
  costUsd: 0,
  subscriptionsAvailable: false,
  earlyAccessDays: 7,
  memberFreePickMode: "one_pick_per_release" as const,
  memberFreePickCountPerRelease: 1,
  newestCoursePaidForEveryone: true,
  benefits: [
    "Weekly mailing list emails with stories and background notes",
    "Early access to new courses and Discord support",
    "One eligible older course of your choice for free, after each new course release",
    "Make your own learning batch with friends or your team, or take For Keeps offline.",
    "Lifetime access to purchased courses with free updates",
  ],
};

export type CourseRelease = {
  id: string;
  releaseDate: string;
};

export function getEligibleMemberFreePickCourseIds(
  courses: readonly CourseRelease[],
  releaseDate: string,
) {
  if (membershipConfig.memberFreePickMode === "all_older") {
    return courses
      .filter((course) => course.releaseDate < releaseDate)
      .map((course) => course.id);
  }

  const previousNewest = courses
    .filter((course) => course.releaseDate < releaseDate)
    .sort((left, right) => right.releaseDate.localeCompare(left.releaseDate))[0];

  return previousNewest ? [previousNewest.id] : [];
}
