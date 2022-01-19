import { ChainId, PermissionLevel } from 'anchor-link';
import { useEffect, useState } from 'react';
import { useAppProvider } from '../../providers/app';
import { dApp } from '../config';

const useListSessions = () => {
  const { user } = useAppProvider();
  const [session, setSession] = useState<
    {
      auth: PermissionLevel;
      chainId: ChainId;
    }[]
  >([]);

  useEffect(() => {
    if (!user) return;

    const list = async () => {
      const sess = await user.link.listSessions(dApp);

      setSession(sess);
    };

    list();
  }, [user]);

  return session;
};

export default useListSessions;
