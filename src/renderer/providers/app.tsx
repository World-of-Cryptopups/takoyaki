import { LinkSession } from 'anchor-link';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import anchorLink from '../lib/anchor';
import { dApp } from '../lib/config';

interface AppProviderProps {
  children: ReactNode;
}

interface AppProviderContextProps {
  user: LinkSession | null;
  setUser: Dispatch<SetStateAction<LinkSession | null>>;
  login: () => Promise<void>;
}

const AppProviderContext = createContext<AppProviderContextProps>({
  user: null,
  setUser: () => {},
  login: async () => undefined,
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<LinkSession | null>(null);

  const login = async () => {
    let session: LinkSession | null = null;

    const anchor = anchorLink(
      'https://waxtestnet.greymass.com',
      'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12'
    );

    const sessionList = await anchor.listSessions(dApp);
    if (sessionList && sessionList.length > 0) {
      session = await anchor.restoreSession(dApp);
    } else {
      try {
        const sess = await anchor.login(dApp);
        session = sess.session;
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(e as any);
      }
    }

    if (!session) return;

    setUser(session);
  };

  return (
    <AppProviderContext.Provider value={{ user, setUser, login }}>
      {children}
    </AppProviderContext.Provider>
  );
};

// AppProvider hook
const useAppProvider = () => {
  const context = useContext(AppProviderContext);
  if (context === undefined) throw new Error('<AppProvider></AppProvider>');

  return context;
};

export default AppProvider;
export { useAppProvider };
