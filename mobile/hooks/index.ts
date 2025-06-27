import { apiBaseUrl, apiKey } from "@/lib/constants";
/**
 * Wrapper around fetch
 * Performs fetch request and returns parsed response
 */

//implement concurrency here
let csrfToken = "a11253e5861000c665283ba49b8468ed2df07a74aa02548fe1859ed47839d632";

const hasHeader = (init: RequestInit, headerName: string): boolean => {
  if (!init.headers) return false;
  // Case 3: headers is a plain object
  return Object.keys(init.headers).some(
    (key) => key.toLowerCase() === headerName.toLowerCase()
  );
};
/**
 * internal server error ,
 * custom server messages ,
 * network request failures
 */
export const networkRequestWithParser = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<string | T> => {
  try {
    let headers = init?.headers;
    headers = {
      ...headers,
    };
    const response = await fetch(input, {
      ...init,
      headers: headers,
      credentials: "same-origin",
    });
    let res = await response.json();
    if (!response.ok) {
      return res.status as string;
    }
    return res as T;
  } catch (error: any) {
    if (error.message && typeof error.message === "string") {
      return error.message as string;
    }
    return "";
  }
};

export const networkRequest = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  //pre request

  //check if csrf is valid
  let csfrCheckResponse = await networkRequestWithParser(
    apiBaseUrl + "/api/id-check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        UserEmail: "this",
        csrfToken,
        apikey: apiKey,
      }).toString(),
    }
  );
  if (
    typeof csfrCheckResponse === "string" &&
    csfrCheckResponse === "CSFF Verification failed!"
  ) {
    //csfr check failed
    let result = await networkRequestWithParser<{ csrfToken: string }>(
      apiBaseUrl + `/api/csrf-token`
    );
    if (typeof result === "string") {
      console.log("failed to request csrf token", result);
      return result;
    }
    csrfToken = result.csrfToken;
  }

  if (init && init?.method === "POST") {
    if (init.body && typeof init.body !== "string") {
      return "invalid body type";
    }
    let body = new URLSearchParams(init.body ?? {});
    body.append("csrfToken", csrfToken);
    body.append("apikey", apiKey);
    init.body = body.toString();

    //set default
    if (!hasHeader(init, "Content-Type")) {
      init.headers = {
        ...init.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
  }
  return await networkRequestWithParser<T>(input, init);
};
