import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import BaseModal from '../../components/modal';
import TransferModalForm from './form';

const TransferModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Transfer Assets"
        type="button"
        className="ml-2 inline-flex items-center rounded-lg py-2 px-6 bg-indigo-400 hover:bg-indigo-500 text-white"
      >
        <span className="mr-1 text-xs tracking-wide font-bold uppercase">
          Transfer
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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

      <BaseModal open={open} closeModal={() => setOpen(false)} width="max-w-xl">
        <Dialog.Title as="h3" className="font-black text-2xl text-gray-700">
          <span className="text-indigo-500">[WAXP]</span> Transfer Assets
        </Dialog.Title>
        <Dialog.Description className="text-gray-700 mt-1">
          Transfer / send token to another account
        </Dialog.Description>

        <TransferModalForm />
      </BaseModal>
    </>
  );
};

export default TransferModal;
