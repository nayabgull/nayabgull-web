const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type Fetch = typeof fetch;

/**
 * Asks Cloudflare whether a Turnstile token is real. Any network or format problem counts as "not
 * verified", so a broken check can never let spam through.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  fetcher: Fetch = fetch,
): Promise<boolean> {
  if (token === "") return false;
  try {
    const response = await fetcher(VERIFY_URL, {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
    });
    if (!response.ok) return false;
    const data: unknown = await response.json();
    return typeof data === "object" && data !== null && "success" in data && data.success === true;
  } catch {
    return false;
  }
}
