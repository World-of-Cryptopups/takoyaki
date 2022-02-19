import { UseAtomicAssetsProvider } from '@cryptopuppie/useatomicassets';
import { useSettings } from '../../modules/settings/provider';
import MyNFTAssets from './assets';

const NFTsPage = () => {
  const { atomicassets } = useSettings();

  return (
    <UseAtomicAssetsProvider endpoint={atomicassets}>
      <div>
        <MyNFTAssets />
      </div>
    </UseAtomicAssetsProvider>
  );
};

export default NFTsPage;
