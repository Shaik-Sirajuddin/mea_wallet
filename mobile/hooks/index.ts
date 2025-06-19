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
    const response = await fetch(input, init);
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
