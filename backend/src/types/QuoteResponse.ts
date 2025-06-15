interface QuoteResponse {
  routeAvailable: boolean;
  data?: {
    inputAmount: string;
    outputAmount: string;
    priceImpactPct: number;
  };
  message?: string;
}
