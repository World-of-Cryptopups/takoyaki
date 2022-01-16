import { Listbox } from '@headlessui/react';
import fileSize from 'file-size';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppProvider } from '../../../../providers/app';
import { useManageRam } from './provider';

const buyin = [
  { name: 'wax', title: 'WAX' },
  { name: 'bytes', title: 'Bytes' },
];

const ManageRamModalBuyAction = () => {
  const { user, account } = useAppProvider();
  const { data } = useManageRam();

  const [selected, setSelected] = useState(buyin[0]);
  const [amount, setAmount] = useState(0);

  const buyAction = async () => {
    if (!user || !account) return;
    if (amount < 0) {
      toast.error('Amount cannot be less than 0');
      return;
    }

    await user
      .transact({
        action: {
          account: 'eosio',
          name: 'buyram',
          authorization: [user.auth],
          data: {
            payer: account.wallet,
            receiver: account.wallet,
            quant: String(`${amount.toFixed(8)} WAX`),
          },
        },
      })
      .then((r) => {
        toast.success('Sucessfully bought ram.');

        return r;
      })
      .catch((e) => {
        toast.error(String(e));
      });
  };

  const calcWAXBytes = () => {
    if (!data) return '';

    const base = Number(data.base.balance.split(' ')[0]);
    const quote = Number(data.quote.balance.split(' ')[0]);

    if (selected.name === 'wax') {
      return fileSize(Math.floor(amount * (base / quote))).human();
    }

    return `${((amount / base) * quote).toFixed(8)} WAX`;
  };

  return (
    <div className="">
      <div className="flex flex-col my-2">
        <span className="text-sm text-gray-700 mb-1">
          Buy in WAX or Bytes ?
        </span>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative py-2 px-4 rounded-lg border w-full text-left text-sm font-medium text-gray-800">
              {selected.title}
            </Listbox.Button>

            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {buyin.map((i, index) => (
                <Listbox.Option
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  value={i}
                  className={({ active, selected: sel }) =>
                    `w-full px-4 py-2 ${
                      active ? 'bg-indigo-500 text-gray-100' : ''
                    } ${sel ? 'bg-indigo-300 text-gray-100' : ''}`
                  }
                >
                  {i.title}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="flex flex-col my-2">
        <span className="text-sm text-gray-700 mb-1">
          Amount of RAM to buy in {selected.title}
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
          placeholder="Amount of RAM to buy"
          className="py-2 px-4 rounded-lg border text-gray-800 font-medium text-sm"
        />
      </div>

      <div>
        <p className="text-gray-600 text-sm">
          = <span className="font-bold">{calcWAXBytes()}</span>
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={buyAction}
          type="button"
          className="py-3 px-8 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium uppercase inline-flex items-center duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Buy with {selected.title}
        </button>
      </div>
    </div>
  );
};

export default ManageRamModalBuyAction;
