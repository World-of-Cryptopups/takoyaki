import { useGetCurrencyBalance } from '@cryptopuppie/useeoschain';
import { useAppProvider } from '../../providers/app';

const parseBalance = (bal: string) => {
  const x = bal.split(' ');

  // return Math.floor(Number(x[0]) * 100) / 100;
  return x[0];
};

const DashboardAccStatsBalance = () => {
  const { user } = useAppProvider();
  const { data } = useGetCurrencyBalance(
    user
      ? { account: user.auth.actor.toString(), code: 'eosio.token' }
      : undefined
  );

  return (
    <div className="bg-indigo-700 col-span-2 py-6 px-8 rounded-lg">
      <p className="text-indigo-100 mb-2">Total Balance</p>
      <strong className="text-white text-4xl font-black">
        {data ? parseBalance(data[0]) : 0} <span className="text-xl">WAXP</span>
      </strong>
    </div>
  );
};

export default DashboardAccStatsBalance;
