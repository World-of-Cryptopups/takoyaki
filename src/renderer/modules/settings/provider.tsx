import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DEFAULT_SETTINGS, SettingsProps } from 'renderer/lib/settings';

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextProps {
  chain: string;
  atomicassets: string;
  chainId: string;
  testnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
  setEndpoints: Dispatch<SetStateAction<SettingsProps>>;
}

const SettingsContext = createContext<SettingsContextProps>({
  chain: '',
  atomicassets: '',
  chainId: '',
  testnet: false,
  setIsTestnet: () => {},
  setEndpoints: () => {},
});

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [isTestnet, setIsTestnet] = useState(false);
  const [endpoints, setEndpoints] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const defSettings: SettingsProps = JSON.parse(
      window.localStorage.getItem('CURRENT_APP_SETTINGS') ?? '{}'
    );
    const defTestnet: boolean = JSON.parse(
      window.localStorage.getItem('CURRENT_APP_TESTNET') ?? 'false'
    );

    const settings: SettingsProps = {
      atomicassets: defSettings.atomicassets ?? DEFAULT_SETTINGS.atomicassets,
      chain: defSettings.chain ?? DEFAULT_SETTINGS.chain,
      chainId: defSettings.chainId ?? DEFAULT_SETTINGS.chainId,
    };

    setIsTestnet(defTestnet);
    setEndpoints(settings);
  }, [setEndpoints, setIsTestnet]);

  return (
    <SettingsContext.Provider
      value={{ ...endpoints, testnet: isTestnet, setIsTestnet, setEndpoints }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined)
    throw new Error('<SettingsProvider></SettingsProvider>');

  return context;
};

export default SettingsProvider;
