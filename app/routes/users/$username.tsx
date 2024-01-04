import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  const { request, params } = args;

  const baseURL = process.env.APP_BASE_URL || "http://localhost:3000";

  const url = new URL(request.url);

  if (url.origin === baseURL) {
    const resourcePath = `${url.origin}${url.pathname}`;

    return json({
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1",
      ],
      id: resourcePath,
      type: "Person",
      following: `${resourcePath}/following`,
      followers: `${resourcePath}/followers`,
      inbox: `${resourcePath}/inbox`,
      preferredUsername: params.username,
      name: "Peter",
      summary: "Activity Pub Test",
      url: "https://songsforthe.dev",
      manuallyApprovesFollowers: true,
      discoverable: true,
      published: "2000-01-01T00:00:00Z",
      icon: {
        type: "Image",
        mediaType: "image/png",
        url: `${url.origin}/images/${params.username}/avatar.png`,
      },
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
