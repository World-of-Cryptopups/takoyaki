import { useGetAssets } from '@cryptopuppie/useatomicassets';
import { useAppProvider } from '../../providers/app';
import ListAsset from './list-asset';

const MyNFTAssets = () => {
  const { account } = useAppProvider();

  const { data, isError, error } = useGetAssets(
    account ? { owner: account.wallet } : null
  );

  if (isError) {
    return (
      <p className="text-red-500 text-sm tracking-wide">{error?.message}</p>
    );
  }

  return (
    <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
      {data ? (
        data.map((i, index) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative p-4 rounded-lg flex items-center justify-center bg-gray-100"
          >
            <p className="absolute -top-2 -left-2 bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-lg">
              #{i.asset_id}
            </p>

            <p className="absolute -top-2 -right-2 text-xs font-bold text-gray-600 bg-gray-200 p-1 rounded-lg">
              #{i.template_mint}/
              {i.template?.max_supply === '0' ? (
                <>&infin;</>
              ) : (
                i.template?.max_supply
              )}
            </p>

            <ListAsset asset={i} />

            <p className="absolute w-full -bottom-3 text-center bg-gray-200 text-sm py-2 rounded-b-lg px-3 truncate font-medium tracking-wide text-indigo-500">
              {i.name}
            </p>
          </li>
        ))
      ) : (
        <p className="text-sm text-gray-700">loading...</p>
      )}
    </ul>
  );
};

export default MyNFTAssets;
