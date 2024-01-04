import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  const { request } = args;

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (resource !== null) {
    const baseURL = new URL(
      process.env.APP_BASE_URL || "http://localhost:3000"
    );

    const acctRegExp = new RegExp(/^acct:[^@]+@[^@]+$/);

    if (acctRegExp.test(resource)) {
      const [username, domain] = resource.slice(5).split("@");
      if (domain === baseURL.hostname && username === "phollome") {
        return json(
          {
            subject: resource,
            links: [
              {
                rel: "self",
                type: "application/activity+json",
                href: `${baseURL.origin}/users/${username}`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/jrd+json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }
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
