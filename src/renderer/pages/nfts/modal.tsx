import { Dialog } from '@headlessui/react';
import { useNFTAsset } from './provider';
import RenderAsset from './render-asset';

const ViewNFTAssetModal = () => {
  const { asset } = useNFTAsset();

  return (
    <div>
      <div className="flex items-start justify-between w-full relative">
        <div className="w-3/5">
          <Dialog.Title as="h3" className="font-black text-indigo-600 text-3xl">
            {asset?.name}
          </Dialog.Title>
          <Dialog.Description className="text-gray-700 text-sm mt-1">
            Viewing informations of this NFT asset..
          </Dialog.Description>

          <div className="mt-4">
            <ul>
              <li className="my-2">
                <h4 className="text-sm text-gray-600">Collection</h4>
                <p className="text-gray-700 font-medium">
                  {asset?.collection.name}
                </p>
              </li>

              <li className="my-2">
                <h4 className="text-sm text-gray-600">Schema</h4>
                <p className="text-gray-700 font-medium">
                  {asset?.schema.schema_name}
                </p>
              </li>

              <li className="my-2">
                <h4 className="text-sm text-gray-600">Template ID</h4>
                <p className="text-gray-700 font-medium">
                  {asset?.template?.template_id}
                </p>
              </li>

              <li className="my-2">
                <h4 className="text-sm text-gray-600">Mint #</h4>
                <p className="text-gray-700 font-medium">
                  {asset?.template_mint} /{' '}
                  {asset?.template?.max_supply === '0' ? (
                    <>&infin;</>
                  ) : (
                    asset?.template?.max_supply
                  )}
                </p>
              </li>

              <li className="my-2">
                <h4 className="text-sm text-gray-600">Backed Tokens</h4>
                {(asset?.backed_tokens.length ?? 0) > 0 ? (
                  asset?.backed_tokens.map((b, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <p key={i} className="text-gray-700 font-medium">
                      {b.amount} {b.token_symbol}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700 font-medium">none</p>
                )}
              </li>
            </ul>
          </div>
        </div>

        <p className="absolute -top-5 -right-5 text-sm text-gray-600 font-medium">
          <a
            href={`https://wax-test.atomichub.io/explorer/asset/${asset?.asset_id}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            title="View NFT on AtomicHub.io"
          >
            #{asset?.asset_id}
          </a>
        </p>

        <div className="w-2/5">
          <RenderAsset />
        </div>
      </div>

      <div>
        <h4 className="text-sm text-gray-600">Immutable Data</h4>
        <hr className="my-2" />
        <table className="mt-2 h-10">
          {Object.entries(asset?.data ?? {}).map(([k, v], i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i} className="">
              <td className="py-1 text-sm text-gray-700">{k}</td>
              <td className="py-1 text-sm break-all text-gray-800">{v}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ViewNFTAssetModal;
