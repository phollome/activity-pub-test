import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  const { request, params } = args;

  const baseURL = process.env.APP_BASE_URL || "http://localhost:3000";

  const url = new URL(request.url);

  if (url.origin === baseURL && params.username === "phollome") {
    const resourcePath = `${url.origin}${url.pathname}`;

    return json({
      "@context": "https://www.w3.org/ns/activitystreams",
      id: resourcePath,
      type: "OrderedCollection",
      totalItems: 0,
      first: "https://mastodon.jgarr.net/following_accts",
    });
  }

  return json(
    {
      error: "not_found",
      error_description: "Resource not found",
    },
    {
      status: 404,
    }
  );
}