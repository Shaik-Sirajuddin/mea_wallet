const apiURL = "https://open-api.bingx.com";
export default {
  getPrice: async (symbol: string) => {
    if (symbol !== "MEA") {
      throw "Invalid Symbol";
    }
    symbol = "MEA_USDT";
    //TODO : change to use a global source for token symbols
    let params = new URLSearchParams({
      symbol,
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
