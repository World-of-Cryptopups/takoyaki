import { useNFTAsset } from './provider';

const RenderAsset = () => {
  const { asset } = useNFTAsset();

  return (
    <>
      {asset?.immutable_data.video ? (
        <video
          src={`https://ipfs.io/ipfs/${asset?.immutable_data.video}`}
          height="300"
          width="200"
          autoPlay
          loop
          preload=""
          className="object-contain"
          title={asset?.immutable_data.name}
        >
          <track kind="captions" />
        </video>
      ) : (
        <img
          src={`https://ipfs.io/ipfs/${asset?.data.img}`}
          alt={asset?.name}
          className="object-contain"
        />
      )}
    </>
  );
};

export default RenderAsset;
