import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useModal } from '../../components/modal';
import { useAppProvider } from '../../providers/app';

const TransferModalForm = () => {
  const { user, account: userAccount } = useAppProvider();
  const { closeModal } = useModal();

  const inputAccount = useRef<HTMLInputElement>(null);
  const inputAmount = useRef<HTMLInputElement>(null);

  const transfer = async () => {
    if (!user || !userAccount) {
      return;
    }

    const account = inputAccount.current?.value ?? '';
    const amount = inputAmount.current?.valueAsNumber ?? 0;

    if (account === '') {
      toast.error('Account is needed to execute the transfer function.');
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      toast.error('Amount cannot be empty.');
      return;
    }
    if (amount < 0) {
      toast.error('Amount cannot be less than zero.');
    }

    await user
      .transact({
        action: {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [user.auth],
          data: {
            from: userAccount.wallet,
            to: account,
            quantity: String(`${amount.toFixed(8)} WAX`),
            memo: '',
          },
        },
      })
      .then((r) => {
        toast.success('Sucessfully transferred assets.');

        return r;
      })
      .catch((e) => {
        toast.error(String(e));
      });
  };

  return (
    <div className="mt-6">
      <div>
        <div className="flex flex-col my-2">
          <span className="mb-1 text-gray-600 uppercase text-sm">
            Account / Wallet
          </span>
          <input
            type="text"
            name="account"
            ref={inputAccount}
            className="py-4 px-6 rounded-lg border text-gray-800"
            placeholder="Account / wallet to transfer token"
          />
        </div>

        <div className="flex flex-col my-2">
          <span className="mb-1 text-gray-600 uppercase text-sm">Amount</span>
          <input
            type="number"
            name="amount"
            ref={inputAmount}
            className="py-4 px-6 rounded-lg border text-gray-800"
            placeholder="Ammount of token to transfer"
          />
        </div>

        <div className="flex justify-end mt-4 ">
          <button
            onClick={transfer}
            title="Transfer Assets"
            type="button"
            className="mr-2 py-3 px-8 text-sm uppercase font-medium rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white inline-flex items-center"
          >
            Transfer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          <button
            title="Cancel Transfer"
            type="submit"
            onClick={closeModal}
            className="py-3 px-8 text-sm uppercase font-medium rounded-lg bg-neutral-400 hover:bg-neutral-500 text-white inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferModalForm;
