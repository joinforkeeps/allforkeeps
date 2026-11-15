export async function onRequest({ request, next }) {
	const requestUrl = new URL(request.url);

	if (requestUrl.hostname === "join.allforkeeps.com") {
		const destination = new URL("https://allforkeeps.com/community/");
		destination.search = requestUrl.search;
		return Response.redirect(destination.toString(), 301);
	}

	return next();
}
