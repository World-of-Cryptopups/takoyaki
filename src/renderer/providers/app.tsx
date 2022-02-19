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
import { useSettings } from '../modules/settings/provider';
import { CurrentUser } from '../typings/user';

interface AppProviderProps {
  children: ReactNode;
}

interface AppProviderContextProps {
  user: LinkSession | null;
  setUser: Dispatch<SetStateAction<LinkSession | null>>;
  login: () => Promise<void>;
  logoutCurrent: () => void;
  restoreAccount: (acc: CurrentUser) => void;
  account?: CurrentUser;
}

const AppProviderContext = createContext<AppProviderContextProps>({
  user: null,
  setUser: () => {},
  login: async () => undefined,
  restoreAccount: () => undefined,
  logoutCurrent: () => undefined,
});

const getCurrentUser = () => {
  if (typeof window === 'undefined') return undefined;

  const data = window.localStorage.getItem('current-user');
  if (!data) return undefined;

  return JSON.parse(data) as CurrentUser;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const { chain, chainId } = useSettings();

  const [account, setAccount] = useState(getCurrentUser());
  const [user, setUser] = useState<LinkSession | null>(null);

  const anchor = anchorLink(chain, chainId);

  const logoutCurrent = () => {
    setAccount(undefined);

    window.localStorage.removeItem('current-user');
  };

  const restoreAccount = async (acc: CurrentUser) => {
    const session = await anchor.restoreSession(dApp, {
      actor: acc.wallet,
      permission: acc.permission,
    });

    setAccount(acc);
    setUser(session);

    window.localStorage.setItem('current-user', JSON.stringify(acc));
  };

  const login = async () => {
    let session: LinkSession | null = null;

    // NOTE: since we are allowing multiple accounts, we should not restore previous accounts

    try {
      const sess = await anchor.login(dApp);
      session = sess.session;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(e as any);
    }

    if (!session) return;

    const currentAccount: CurrentUser = {
      wallet: session.auth.actor.toString(),
      permission: session.auth.permission.toString(),
    };

    setUser(session);
    setAccount(currentAccount);

    window.localStorage.setItem('current-user', JSON.stringify(currentAccount));
  };

  return (
    <AppProviderContext.Provider
      value={{ user, setUser, login, account, logoutCurrent, restoreAccount }}
    >
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
