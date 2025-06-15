import { PublicKey } from "@solana/web3.js";

export default {
  isValidPublicKey: (address: string) => {
    try {
      new PublicKey(address);
      return true;
    } catch (error) {
      return false;
    }
  },
};
