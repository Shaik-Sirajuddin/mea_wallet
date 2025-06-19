export interface Price {
  time: number;
  price: number;
}
export interface ChartDataResponse {
  prices: Price[];
}
export interface ChartProvider {
  fetchChartData: (symbol: string, days: string) => Promise<ChartDataResponse>;
}
