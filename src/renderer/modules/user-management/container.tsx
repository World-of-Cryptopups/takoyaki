import { Listbox, Transition } from '@headlessui/react';
import { PermissionLevel } from 'anchor-link';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useModal } from '../../components/modal';
import useListSessions from '../../lib/hooks/useListSessions';
import { useAppProvider } from '../../providers/app';
import { CurrentUser } from '../../typings/user';

const UserManagementModalContainer = () => {
  const { account, logoutCurrent, restoreAccount } = useAppProvider();
  const sessions = useListSessions();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const current = sessions.filter(
    (x) => x.auth.actor.toString() === account?.wallet
  )[0];

  const [selected, setSelected] = useState<PermissionLevel | undefined>(
    current?.auth
  );

  const switchAccount = () => {
    if (!selected || !account) return;

    const currentAccount = selected?.actor.toString();
    const currentPermission = selected.permission.toString();

    if (
      account.wallet === currentAccount &&
      account.permission === currentPermission
    ) {
      toast.warn('You are currently in this account.');
      return;
    }

    const acc: CurrentUser = {
      wallet: currentAccount,
      permission: selected?.permission.toString(),
    };

    restoreAccount(acc);

    closeModal();
  };

  useEffect(() => {
    if (selected || !current) return;

    setSelected(current.auth);
  }, [current, selected]);

  return (
    <div className="mt-6">
      <div className="flex flex-col my-2">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-4 pl-3 pr-10 text-left bg-indigo-50 border-2 border-indigo-300 rounded-lg shadow-xl font-medium cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selected?.actor.toString()}@{selected?.permission.toString()}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                {sessions.map((sess, index) => (
                  <Listbox.Option
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={({ active }) =>
                      `${
                        active
                          ? 'text-indigo-900 bg-indigo-100'
                          : 'text-gray-900'
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={sess.auth}
                  >
                    {({ selected: select, active }) => (
                      <>
                        <span
                          className={`${
                            select ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {sess.auth.actor.toString()}@
                          {sess.auth.permission.toString()}
                        </span>
                        {select ? (
                          <span
                            className={`${
                              active ? 'text-indigo-600' : 'text-indigo-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <svg
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>

          <div className="flex justify-end items-center mt-4">
            <button
              onClick={switchAccount}
              type="button"
              className="inline-flex items-center py-3 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>{' '}
              Switch Account
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                logoutCurrent();

                navigate('auth');
              }}
              className="text-sm text-gray-600 hover:underline"
              type="button"
            >
              login with different account
            </button>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default UserManagementModalContainer;
