export interface PriceMarketChartProps {
  prices: number[][];
}

export interface PriceMarketProps {
  date: string;
  price: number;
}

export interface CurrentWaxPrice {
  wax: {
    usd: number;
  };
}
