import { useGetActions } from '@cryptopuppie/useeoshyperion';
import { Disclosure } from '@headlessui/react';
import { useAppProvider } from '../../providers/app';

const MyTransactions = () => {
  const { account } = useAppProvider();
  const { data, hasFailed, error } = useGetActions(
    account ? { account: account.wallet, limit: 100 } : null
  );

  if (hasFailed) {
    return (
      <p className="text-red-500 text-sm tracking-wide">{error?.message}</p>
    );
  }

  if (!data) {
    return <p className="text-sm text-gray-700">loading...</p>;
  }

  return (
    <ul>
      {data.actions.length > 0 ? (
        data.actions.map((i, index) => (
          <Disclosure
            as="li"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="my-2"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm text-left text-indigo-500 bg-gray-200 hover:bg-gray-300 ${
                    open ? 'rounded-t-lg' : 'rounded-lg'
                  }`}
                >
                  <span className="w-1/4 truncate">{i.trx_id}</span>

                  <p className="border py-1 px-4 rounded-lg bg-gray-100 text-xs font-medium tracking-wide text-gray-700">
                    <span className="text-indigo-600">{i.act.account}</span> -{' '}
                    {i.act.name}
                  </p>

                  <div className="inline-flex items-center">
                    <span className="text-gray-600 text-xs">
                      {new Date(i['@timestamp']).toLocaleString()}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-gray-500`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-8 pt-4 pb-6 text-sm rounded-b-lg bg-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-700" title="Transaction ID">
                        TRANSACTION:{' '}
                        <strong>
                          <a
                            href={`https://wax-test.bloks.io/transaction/${i.trx_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                            title="View transaction details on Bloks.io"
                          >
                            {i.trx_id}
                          </a>
                        </strong>
                      </p>

                      <p className="text-gray-700 mt-1" title="Block number">
                        BLOCK NUMBER:{' '}
                        <strong>
                          <a
                            href={`https://wax-test.bloks.io/block/${i.block_num}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                            title="View block details on Bloks.io"
                          >
                            #{i.block_num}
                          </a>
                        </strong>
                      </p>
                    </div>

                    <p className="text-gray-600 text-xs">
                      {new Date(i['@timestamp']).toString()}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <div className="inline-flex w-1/2">
                      <p className="text-gray-600">AUTHORIZATIONS:</p>
                      <ul className="ml-4 text-gray-700">
                        {i.act.authorization.map((j, idx) => (
                          <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className="mb-0.5 font-medium"
                          >
                            {j.actor}@{j.permission}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="inline-flex w-1/2">
                      <p className="text-gray-600">DATA:</p>

                      <ul className="ml-4 break-all">
                        {Object.keys(i.act.data).map((j, idx) => (
                          <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className="mb-0.5"
                          >
                            <strong className="text-gray-600">{j}</strong>:{' '}
                            <span className="text-gray-700">
                              {JSON.stringify(i.act.data[j])}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))
      ) : (
        <p className="text-sm text-gray-600">nothing to show here... (- _ -)</p>
      )}
    </ul>
  );
};

export default MyTransactions;
