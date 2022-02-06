import { IAsset } from '@cryptopuppie/useatomicassets/dist/typings/typings/atomicassets-js';
import { useState } from 'react';
import BaseModal from '../../components/modal';
import ViewNFTAssetModal from './modal';
import NFTAssetProvider from './provider';
import RenderAsset from './render-asset';

interface ListAssetProps {
  asset: IAsset;
}

const ListAsset = ({ asset }: ListAssetProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <NFTAssetProvider asset={asset}>
      <button
        onClick={openModal}
        type="button"
        className="hover:scale-105 duration-500"
      >
        <RenderAsset />
      </button>

      <BaseModal
        open={open}
        onClose={closeModal}
        closeModal={closeModal}
        width="max-w-3xl"
      >
        <ViewNFTAssetModal />
      </BaseModal>
    </NFTAssetProvider>
  );
};

export default ListAsset;
