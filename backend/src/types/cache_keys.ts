export class CacheKey {
  static PRICE = "PRICE=";
  static symbolPrice(symbol: string) {
    return this.PRICE + symbol;
  }
}
