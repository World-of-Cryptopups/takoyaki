import { Link } from 'inp-router';
import { useSettings } from '../settings/provider';

const SidebarContainer = () => {
  const { testnet } = useSettings();

  return (
    <div className="w-68 z-20 h-screen fixed bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white bg-indigo-500 py-1 px-2 rounded-xl">
          t
        </h1>

        {testnet ? (
          <small className="text-xs bg-orange-500 text-white p-1 rounded-md">
            testnet
          </small>
        ) : (
          <></>
        )}
      </div>

      <ul className="mt-6">
        <li>
          <Link
            to="dashboard"
            className={({ active }) =>
              `text-center w-full inline-flex items-center hover:text-indigo-500 hover:bg-indigo-100 p-3 rounded-lg mb-1 ${
                active ? 'text-indigo-500 bg-indigo-100' : 'text-raisin-black'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="ml-1 hidden">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="nfts"
            className={({ active }) =>
              `text-center w-full inline-flex items-center hover:text-indigo-500 hover:bg-indigo-100 p-3 rounded-lg mb-1 ${
                active ? 'text-indigo-500 bg-indigo-100' : 'text-raisin-black'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-1 hidden">NFTs</span>
          </Link>
        </li>

        <li>
          <Link
            to="transactions"
            className={({ active }) =>
              `text-center w-full inline-flex items-center hover:text-indigo-500 hover:bg-indigo-100 p-3 rounded-lg mb-1 ${
                active ? 'text-indigo-500 bg-indigo-100' : 'text-raisin-black'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="ml-1 hidden">Transactions</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarContainer;
