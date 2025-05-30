export interface PriceProvider {
   getLatestPrice : (pair: string) => number;
}
