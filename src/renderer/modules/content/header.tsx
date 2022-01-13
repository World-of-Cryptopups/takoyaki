import { useAppProvider } from '../../providers/app';
import TransferModal from '../transfer-modal/modal';

const ContentHeader = () => {
  const { user } = useAppProvider();

  return (
    <div className="fixed z-10 w-full border-b border-magnolia bg-gray-50">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="ml-20">
          <h3 className="font-black text-gray-800 tracking-wide text-lg">
            DASHBOARD
          </h3>
          <p className="text-neutral-600 text-sm ml-1">
            Hello, @{String(user?.auth.actor)}
          </p>
        </div>

        <div className="inline-flex items-center">
          <button
            type="button"
            className="inline-flex items-center rounded-lg py-2 px-4 bg-indigo-100 text-indigo-500"
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
              {String(user?.auth.actor)}
            </span>
          </button>

          <TransferModal />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
