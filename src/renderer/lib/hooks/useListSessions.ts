import { ChainId, PermissionLevel } from 'anchor-link';
import { useEffect, useState } from 'react';
import { useSettings } from '../../modules/settings/provider';
import { useAppProvider } from '../../providers/app';
import { dApp } from '../config';

const useListSessions = () => {
  const { chainId } = useSettings();

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
      let sess = await user.link.listSessions(dApp);

      sess = sess.filter((s) => s.chainId.toString() === chainId);

      setSession(sess);
    };

    list();
  }, [chainId, user]);

  return session;
};

export default useListSessions;
