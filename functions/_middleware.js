export async function onRequest({ request, next }) {
	const hostname = new URL(request.url).hostname.toLowerCase();
	if (hostname === "shop.allforkeeps.com") {
		return Response.redirect("https://learn.allforkeeps.com/lms/courses", 302);
	}

	// Cloudflare owns the join hostname redirect; keep this middleware non-authoritative.
	return next();
}
