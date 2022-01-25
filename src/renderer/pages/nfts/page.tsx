import { UseAtomicAssetsProvider } from '@cryptopuppie/useatomicassets';
import MyNFTAssets from './assets';

const NFTsPage = () => {
  return (
    <UseAtomicAssetsProvider endpoint="https://test.wax.api.atomicassets.io">
      <div>
        <MyNFTAssets />
      </div>
    </UseAtomicAssetsProvider>
  );
};

export default NFTsPage;
