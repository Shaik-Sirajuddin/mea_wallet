import { apiBaseUrl, apiKey } from "@/lib/constants";
import storage from "@/storage";
import { STORAGE_KEYS } from "@/storage/keys";
/**
 * Wrapper around fetch
 * Performs fetch request and returns parsed response
 */

//todo : implement concurrency here
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
    const bearerToken = await storage.retreive(STORAGE_KEYS.AUTH.TOKEN);
    headers = {
      ...headers,
      authorization: "Bearer " + (bearerToken ?? ""),
    };
    const response = await fetch(input, {
      ...init,
      headers: headers,
      // credentials: "same-origin",
    });
    console.log(input, init);

    let res = await response.json();
    if (!response.ok) {
      console.log(res.status);
      return res.status as string;
    }
    return res as T;
  } catch (error: any) {
    console.log("Request failed at parser", error);
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

  if (init && init?.method === "POST") {
    if (init.body && typeof init.body !== "string") {
      return "invalid body type";
    }
    let body = new URLSearchParams(init.body ?? {});
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
