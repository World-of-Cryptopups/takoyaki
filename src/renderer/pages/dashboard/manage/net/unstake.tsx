import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppProvider } from '../../../../providers/app';

const ManageNetModalUnstakeAction = () => {
  const { user, account } = useAppProvider();

  const [amount, setAmount] = useState(0);

  const unstakeAction = async () => {
    if (!user || !account) return;
    if (amount < 0) {
      toast.error('Amount cannot be less than 0');
    }

    await user
      .transact({
        action: {
          account: 'eosio',
          name: 'undelegatebw',
          authorization: [user.auth],
          data: {
            from: account.wallet,
            receiver: account.wallet,
            unstake_net_quantity: String(`${amount.toFixed(8)} WAX`),
            unstake_cpu_quantity: String(`${(0).toFixed(8)} WAX`),
          },
        },
      })
      .then((r) => {
        toast.success('Sucessfully unstaked CPU to your account.');

        return r;
      })
      .catch((e) => {
        toast.error(String(e));
      });
  };

  return (
    <div>
      <div className="flex flex-col my-2">
        <span className="text-sm text-gray-700 mb-1">
          Amount of WAX to unstake
        </span>
        <input
          onChange={(v) => {
            const x = v.currentTarget.valueAsNumber;

            // eslint-disable-next-line no-restricted-globals
            if (x < 0 || isNaN(x)) {
              return;
            }

            setAmount(x);
          }}
          type="number"
          name="amount"
          placeholder="Amount of WAX to unstake"
          className="py-2 px-4 rounded-lg border text-gray-800 font-medium text-sm"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={unstakeAction}
          type="button"
          className="py-3 px-8 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium uppercase inline-flex items-center duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
          Unstake NET
        </button>
      </div>
    </div>
  );
};

export default ManageNetModalUnstakeAction;
