import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import BaseModal from '../../../components/modal';
import SettingsModal from './modal';

const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BaseModal
        open={open}
        closeModal={() => setOpen(false)}
        onClose={() => setOpen(false)}
        width="max-w-xl"
      >
        <Dialog.Title as="h3" className="font-black text-2xl text-gray-700">
          Settings
        </Dialog.Title>
        <Dialog.Description className="text-gray-700 mt-1">
          Modify app configuration...
        </Dialog.Description>

        <SettingsModal />
      </BaseModal>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm inline-flex items-center hover:underline text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        settings
      </button>
    </>
  );
};

export default SettingsButton;
