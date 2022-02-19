export const DEFAULT_SETTINGS: SettingsProps = {
  atomicassets: 'https://wax.api.atomicassets.io',
  chain: 'https://wax.greymass.com',
  chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
};

export const DEFAULT_TESTNET_SETTINGS: SettingsProps = {
  atomicassets: 'https://test.wax.api.atomicassets.io',
  chain: 'https://waxtestnet.greymass.com',
  chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
};

export interface SettingsProps {
  atomicassets: string;
  chain: string;
  chainId: string;
}
