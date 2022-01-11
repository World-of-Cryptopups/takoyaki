import useSWR from 'swr';
import { PriceMarketChartProps } from '../../typings/pricegraph';
import fetcher from '../fetcher';

const useFetchWax = () => {
  const { data } = useSWR<PriceMarketChartProps>(
    `https://api.coingecko.com/api/v3/coins/wax/market_chart?vs_currency=usd&days=14`,
    fetcher
  );

  if (!data) return null;

  return data.prices;
};

export default useFetchWax;
