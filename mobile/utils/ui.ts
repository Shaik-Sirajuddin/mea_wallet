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
    console.log(error, value);
    return "0";
  }
}

export function parseNumberForView(value: string, maxLength: number = 12) {
  value = trimTrailingZeros(value);
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

type PasswordValidationResult = {
  valid: boolean;
  error:
    | "length_error"
    | "number_missing"
    | "symbol_missing"
    | "invalid_characters"
    | null;
};

export function validatePasswordWithReason(
  password: string
): PasswordValidationResult {
  const result: PasswordValidationResult = {
    valid: false,
    error: null,
  };

  // Check length
  if (password.length < 4 || password.length > 15) {
    result.error = "length_error";
    return result;
  }

  // Allowed symbols definition
  const allowedSymbols = "!@#$%^&*()-_=+[]{}|;:',.<>/?`~";

  // Check for invalid characters (only lowercase letters, numbers, and allowed symbols)
  const allowedRegex = new RegExp(`^[a-z0-9${escapeRegExp(allowedSymbols)}]+$`);
  if (!allowedRegex.test(password)) {
    result.error = "invalid_characters";
    return result;
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    result.error = "number_missing";
    return result;
  }

  // Check for at least one symbol
  const symbolRegex = new RegExp(`[${escapeRegExp(allowedSymbols)}]`);
  if (!symbolRegex.test(password)) {
    result.error = "symbol_missing";
    return result;
  }

  // Passed all checks
  result.valid = true;
  return result;
}

// Helper function to escape regex special characters in allowedSymbols
function escapeRegExp(str: string): string {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function isValidNumber(str: string) {
  const regex = /^-?\d+(\.\d+)?$|^-?\d+\.$/;
  return regex.test(str);
}

export const updateIfValid = (
  value: string,
  trigger: (value: string) => void
) => {
  if (isValidNumber(value) || value.length === 0) {
    console.log("valid", value);
    trigger(value);
  } else {
    console.log("notvalid", value);
  }
};
