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
  if (!value.includes(".")) return value; // no decimal point
  return value.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
}
