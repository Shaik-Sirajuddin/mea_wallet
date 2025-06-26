import { PublicKey } from "@solana/web3.js";
export const isValidPublicKey = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

const tokenImageMap: Record<string, any> = {
  mea: require("@/assets/images/currency/sol.png"),
  sol: require("@/assets/images/currency/mea.png"),
  recon: require("@/assets/images/currency/recon.png"),
  fox9: require("@/assets/images/currency/fox9.png"),
};

export default tokenImageMap;
