import Decimal from "decimal.js";

export const deci = (value: Decimal.Value) => {
  try {
    return new Decimal(value);
  } catch (e) {
    return null;
  }
};

export const isValidDeci = (value: Decimal.Value) => {
  try {
    let _val = new Decimal(value);
    return true;
  } catch (e) {
    return false;
  }
};
/**
 * @returns null if value is 0
 */
export const deciNZ = (value: Decimal.Value) => {
  try {
    let dec = new Decimal(value);
    if (dec.equals(0)) {
      return null;
    }
    return dec;
  } catch (e) {
    return null;
  }
};

function removeTrailingZeros(str: string) {
  // Check if the string contains a decimal point
  if (!str.includes(".")) return str;

  // Remove trailing zeros after the decimal point
  let [integerPart, decimalPart] = str.split(".");

  // Remove trailing zeros from the decimal part
  decimalPart = decimalPart.replace(/0+$/, "");

  // Reassemble the number, only if decimal part is not empty
  return decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
}

export const fixedOf = (value: Decimal.Value) => {
  let decimal = deci(value);
  if (decimal == null) {
    return 0;
  }
  return removeTrailingZeros(decimal.toFixed(18));
};
