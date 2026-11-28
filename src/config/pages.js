export const pageFlags = {
  home: true,
  about: true,
  assessment: true,
  learn: true,
  shop: true,
  blog: true,
  start: true,
  changelog: true,
  rss: true,
  community: false,
  live: false,
  pricing: true,
  contact: false,
  support: true,
};

export function getPageKey(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/about") return "about";
  if (path === "/assessment") return "assessment";
  if (path === "/contact") return "contact";
  if (path === "/courses") return "learn";
  if (path === "/community") return "community";
  if (path === "/start") return "start";
  if (path === "/changelog") return "changelog";
  if (path === "/pricing") return "pricing";
  if (path === "/support") return "support";
  if (path === "/live") return "live";
  if (path === "/rss.xml") return "rss";
  if (path === "/blog" || path.startsWith("/blog/")) return "blog";
  return null;
}

export function isPageVisible(pathname) {
  const key = getPageKey(pathname);
  return key === null || pageFlags[key] !== false;
}
