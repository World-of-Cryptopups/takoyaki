import { IAsset } from '@cryptopuppie/useatomicassets/dist/typings/typings/atomicassets-js';
import { createContext, ReactNode, useContext } from 'react';

interface NFTAssetProviderProps {
  // eslint-disable-next-line react/require-default-props
  asset?: IAsset;
  children: ReactNode;
}

interface NFTAssetContextProps {
  asset?: IAsset;
}

const NFTAssetContext = createContext<NFTAssetContextProps>({});

const NFTAssetProvider = ({ asset, children }: NFTAssetProviderProps) => {
  return (
    <NFTAssetContext.Provider value={{ asset }}>
      {children}
    </NFTAssetContext.Provider>
  );
};

export const useNFTAsset = () => {
  const context = useContext(NFTAssetContext);
  if (context === undefined) {
    throw new Error('<NFTAssetProvider></NFTAssetProvider>');
  }

  return context;
};

export default NFTAssetProvider;
