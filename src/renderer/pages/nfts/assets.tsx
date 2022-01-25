import { useGetAssets } from '@cryptopuppie/useatomicassets';
import { useAppProvider } from 'renderer/providers/app';

const MyNFTAssets = () => {
  const { account } = useAppProvider();

  const { data } = useGetAssets(account ? { owner: account.wallet } : null);

  return (
    <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
      {data?.map((i, index) => (
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

          {i.immutable_data.video ? (
            <video
              src={`https://ipfs.io/ipfs/${i.immutable_data.video}`}
              height="300"
              width="200"
              autoPlay
              loop
              preload=""
              className="object-contain"
              title={i.immutable_data.name}
            >
              <track kind="captions" />
            </video>
          ) : (
            <img
              src={`https://ipfs.io/ipfs/${i.data.img}`}
              alt={i.name}
              className="object-contain"
            />
          )}

          <p className="absolute w-full -bottom-3 text-center bg-gray-200 text-sm py-2 rounded-b-lg px-3 truncate font-medium tracking-wide text-indigo-500">
            {i.name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MyNFTAssets;
