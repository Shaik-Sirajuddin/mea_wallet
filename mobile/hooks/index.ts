import storage from "@/storage";
import { STORAGE_KEYS } from "@/storage/keys";

/**
 * Wrapper around fetch
 * Performs fetch request and returns parsed response
 */

/**
 * internal server error ,
 * custom server messages ,
 * network request failures
 */
export const networkRequest = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<string | T> => {
  try {
    let headers = init?.headers;
    headers = {
      authorization: (await storage.retreive(STORAGE_KEYS.AUTH.TOKEN)) ?? "",
      ...headers,
    };
    const response = await fetch(input, {
      ...init,
      headers: headers,
    });
    let res = await response.json();
    if (!response.ok) {
      return res.error as string;
    }
    return res as T;
  } catch (error: any) {
    if (error.message && typeof error.message === "string") {
      return error.message as string;
    }
    return "";
  }
};
