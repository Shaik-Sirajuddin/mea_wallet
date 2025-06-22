import crypto from "crypto";
import axios from "axios";

const apiURL = "https://api.coinstore.com/api";

const getMarketQuote = async (pair: string) => {
  const expires = Date.now();
  const expiresKey = Math.floor(expires / 30000).toString();

  let apikey = process.env.COINSTORE_API_KEY;
  const secretKey = Buffer.from(process.env.COINSTORE_API_SECRET!);

  const intermediateKeyHex = crypto
    .createHmac("sha256", secretKey)
    .update(expiresKey)
    .digest("hex");

  // Convert intermediate hex digest to a Buffer for next HMAC
  const intermediateKey = Buffer.from(intermediateKeyHex, "utf-8");
  const payload = ``;

  // Step 5: Final signature using intermediate key and payload
  const signature = crypto
    .createHmac("sha256", intermediateKey)
    .update(payload)
    .digest("hex");

  const headers = {
    "X-CS-APIKEY": apikey,
    "X-CS-SIGN": signature,
    "X-CS-EXPIRES": expires.toString(),
  };

  let result = await axios.get(apiURL + "/v1/market/trade/" + pair, {
    headers,
  });
  return parseFloat(result.data.data[0].price);
};
export default {
  getPrice: async (symbol: string) => {
    return await getMarketQuote(symbol);
  },  
};
