import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import BaseModal from '../../components/modal';
import { useAppProvider } from '../../providers/app';
import UserManagementModalContainer from './container';

const UserManagementModal = () => {
  const { user } = useAppProvider();

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="inline-flex items-center rounded-lg py-2 px-4 bg-indigo-100 text-indigo-500 hover:bg-indigo-200 duration-300"
      >
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-1 text-xs tracking-wide font-bold">
          {user?.auth.actor.toString()}@{user?.auth.permission.toString()}
        </span>
      </button>

      <BaseModal
        open={open}
        onClose={closeModal}
        closeModal={closeModal}
        width="max-w-xl"
      >
        <Dialog.Title as="h3" className="font-black text-gray-800 text-2xl">
          Switch User
        </Dialog.Title>
        <Dialog.Description className="text-gray-700 mt-1">
          Switch to a different anchor account
        </Dialog.Description>

        <UserManagementModalContainer />
      </BaseModal>
    </>
  );
};

export default UserManagementModal;
