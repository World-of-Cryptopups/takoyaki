import { Dialog, Tab } from '@headlessui/react';
import filesize from 'file-size';
import { useState } from 'react';
import BaseModal from 'renderer/components/modal';
import ManageRamModalBuyAction from './ram/buy';
import ManageRamProvider from './ram/provider';
import ManageRamModalSellAction from './ram/sell';

interface ManageRamModalProps {
  ram: {
    usage: number;
    quota: number;
  };
  percentage: string | number;
}
const ManageRamModal = ({ ram, percentage }: ManageRamModalProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        title="Manage RAM"
        type="button"
        className="text-gray-500 hover:bg-indigo-500 hover:text-gray-100 duration-300 p-1 border rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <BaseModal open={open} closeModal={closeModal} width="max-w-xl relative">
        <button
          title="Close modal"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <Dialog.Title as="h3" className="text-gray-800 text-2xl font-black">
          Manage RAM
        </Dialog.Title>
        <Dialog.Description className="text-gray-600">
          Buy / sell your ram resources
        </Dialog.Description>

        <ManageRamProvider>
          <div className="my-2">
            <p className="text-sm mb-0.5 text-right text-gray-600">
              {filesize(ram.usage).human()} / {filesize(ram.quota).human()}
            </p>
            <div className="w-full bg-gray-200 rounded-lg">
              <div
                title={`${percentage}%`}
                className="bg-indigo-600 text-xs font-medium text-white text-center px-0.5 py-2 leading-none rounded-l-lg truncate"
                style={{
                  width: `${percentage}%`,
                }}
              >
                {percentage}%
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex items-center justify-center">
                <Tab
                  className={({ selected }) =>
                    `mx-0.5 text-sm py-2 px-8 rounded-lg border font-medium hover:bg-indigo-500 hover:border-indigo-300 hover:text-gray-100 ${
                      selected
                        ? 'bg-indigo-500 text-gray-100 border-indigo-300'
                        : 'text-indigo-500'
                    }`
                  }
                >
                  Buy
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `mx-0.5 text-sm py-2 px-8 rounded-lg border font-medium hover:bg-indigo-500 hover:border-indigo-300 hover:text-gray-100 ${
                      selected
                        ? 'bg-indigo-500 text-gray-100 border-indigo-300'
                        : 'text-indigo-500'
                    }`
                  }
                >
                  Sell
                </Tab>
              </Tab.List>
              <Tab.Panels className="p-4 rounded-lg mt-2 border">
                <Tab.Panel>
                  <ManageRamModalBuyAction />
                </Tab.Panel>

                <Tab.Panel>
                  <ManageRamModalSellAction
                    ram={{ remaining: ram.quota - ram.usage }}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </ManageRamProvider>
      </BaseModal>
    </>
  );
};

export default ManageRamModal;
