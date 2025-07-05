import { Platform, ToastAndroid, Alert } from "react-native";

export const showToast = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    // iOS fallback
    Alert.alert("", message);
  }
};
export const tokenImageMap: Record<string, any> = {
  mea: require("@/assets/images/currency/mea.png"),
  sol: require("@/assets/images/currency/sol.png"),
  recon: require("@/assets/images/currency/recon.png"),
  fox9: require("@/assets/images/currency/fox9.png"),
};
/**
 * Trims trailing zeroes from a decimal string (but retains it as a string).
 * Examples:
 *   "1.0000" => "1"
 *   "0.120000" => "0.12"
 *   "10.00001" => "10.00001"
 *   "100" => "100"
 */
export function trimTrailingZeros(value: string): string {
  try {
    if (!value.includes(".")) return value; // no decimal point
    return value.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
  } catch (error) {
    console.log(error);
    return "";
  }
}

export function parseNumberForView(value: string) {
  const maxLength = 12;
  if (value.length <= maxLength) {
    return value;
  }

  let prefix = value.substring(0, 12);
  let suffix = value.substring(12);

  if (prefix.includes(".")) {
    if (prefix[11] === ".") {
      return prefix.substring(0, 11);
    }
    return prefix;
  }

  if (suffix.at(0) === ".") {
    return prefix;
  }

  //can use math notaions 1e9+xyx;
  return prefix + "..";
}

/**
 * Truncates a wallet address to a viewable format.
 * Example: 0x123456...abcd
 *
 * @param {string} address - Full wallet address
 * @param {number} startLength - Number of characters to keep at start (default: 6)
 * @param {number} endLength - Number of characters to keep at end (default: 4)
 * @returns {string} Truncated address
 */
/**
 * Truncates a wallet address to a viewable format.
 * Example: 0x123456...abcd
 *
 * @param address - Full wallet address
 * @param startLength - Number of characters to keep at start (default: 6)
 * @param endLength - Number of characters to keep at end (default: 4)
 * @returns Truncated address string
 */
export const truncateAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string => {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};
