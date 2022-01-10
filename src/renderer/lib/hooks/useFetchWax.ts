import useSWR from 'swr';
import { PriceMarketChartProps } from '../../typings/pricegraph';
import fetcher from '../fetcher';

const useFetchWax = () => {
  const { data } = useSWR<PriceMarketChartProps>(
    `https://api.coingecko.com/api/v3/coins/wax/market_chart?vs_currency=usd&days=1`,
    fetcher
  );

  if (!data) return null;

  return data.prices.map((r) => ({
    price: r[1],
    date: new Date(r[0]).toLocaleString(),
  }));
};

export default useFetchWax;
