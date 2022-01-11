import useSWR from 'swr';
import { CurrentWaxPrice } from '../../typings/pricegraph';
import fetcher from '../fetcher';

const useFetchWaxPrice = () => {
  const { data } = useSWR<CurrentWaxPrice>(
    `https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=usd`,
    fetcher
  );

  return data?.wax.usd;
};

export default useFetchWaxPrice;
