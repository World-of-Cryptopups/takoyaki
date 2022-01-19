import { useINP } from 'inp-router';
import { useAppProvider } from '../../providers/app';
import TransferModal from '../transfer-modal/modal';
import UserManagementModal from '../user-management/modal';

const ContentHeader = () => {
  const { user } = useAppProvider();
  const { current } = useINP();

  const menus: Record<string, { title: string; description: string }> = {
    dashboard: {
      title: 'Dashboard',
      description: `Hello, @${String(user?.auth.actor)}`,
    },
    nfts: { title: 'My NFTs', description: 'My NFT Assets' },
    transactions: {
      title: 'My Transactions',
      description: 'View my wallet transactions',
    },
    settings: { title: 'App Settings', description: 'Edit settings' },
  };

  return (
    <div className="fixed z-10 w-full border-b border-magnolia bg-gray-50">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="ml-20">
          <h3 className="font-black text-gray-800 tracking-wide text-lg uppercase">
            {menus[current].title}
          </h3>
          <p className="text-neutral-600 text-sm ml-1">
            {menus[current].description}
          </p>
        </div>

        <div className="inline-flex items-center">
          <UserManagementModal />

          <TransferModal />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
