import { test, expect } from "vitest";
import { loader } from "./webfinger";

const baseURL = "http://localhost:3000";
const username = "phollome";

test("user return", async () => {
  const request = new Request(
    `${baseURL}/.well-known/webfinger?resource=acct:${username}@localhost`
  );
  const response = await loader({ request, params: {}, context: {} });
  expect(response.status).toBe(200);
  const body = (await response.json()) as {
    subject: string;
    links: {
      rel: string;
      type: string;
      href: string;
    }[];
  };

  expect(body.subject).toBe(`acct:${username}@localhost`);
  expect(body.links.length).toBe(1);
  expect(body.links[0].rel).toBe("self");
  expect(body.links[0].type).toBe("application/activity+json");
  expect(body.links[0].href).toBe(`${baseURL}/users/${username}`);
});
