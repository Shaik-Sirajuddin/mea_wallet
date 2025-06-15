const apiURL = "https://open-api.bingx.com";
export default {
  getPrice: async (pair: string) => {
    if (pair !== "MEA_USDT" && pair !== "SOL_USDT") {
      throw "Unsupported Pair";
    }
    //TODO : change to use a global source for token symbols
    let params = new URLSearchParams({
      symbol: pair,
    });
    let response = await fetch(
      apiURL + "/openApi/spot/v1/ticker/price?" + params.toString()
    );
    let result = await response.json();
    if (!response.ok) {
      throw result;
    }
    let price = result.data[0].trades[0].price;
    return parseFloat(price);
  },
};
