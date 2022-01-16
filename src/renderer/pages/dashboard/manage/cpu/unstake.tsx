import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppProvider } from '../../../../providers/app';

const ManageCpuModalUnstakeAction = () => {
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
            unstake_cpu_quantity: String(`${amount.toFixed(8)} WAX`),
            unstake_net_quantity: String(`${(0).toFixed(8)} WAX`),
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
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clipRule="evenodd"
            />
          </svg>
          Unstake CPU
        </button>
      </div>
    </div>
  );
};

export default ManageCpuModalUnstakeAction;
