import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import anchorLink, { AnchorLogo } from '../../lib/anchor';
import { dApp } from '../../lib/config';
import { useAppProvider } from '../../providers/app';
import { CurrentUser } from '../../typings/user';

const AuthPage = () => {
  const { login, user, setUser, account } = useAppProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async (acc: CurrentUser) => {
      const anchor = anchorLink(
        'https://waxtestnet.greymass.com',
        'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12'
      );

      const session = await anchor.restoreSession(dApp, {
        actor: acc.wallet,
        permission: acc.permission,
      });
      if (!session) return;

      setUser(session);

      navigate('/');
    };

    if (!user && account) {
      restoreSession(account);
    }
  }, [account, navigate, setUser, user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-20 shadow-2xl rounded-lg bg-white">
        {JSON.stringify(account)}
        {user?.auth.toString()}
        <h3 className="text-indigo-500 font-black text-3xl">takoyaki</h3>
        <p className="text-gray-800">login with your wax wallet</p>

        <div className="mt-6">
          <button
            onClick={async () => {
              await login();

              navigate('/');
            }}
            className="bg-blue-400 hover:bg-blue-500 text-white py-3 px-10 rounded-lg inline-flex items-center"
            type="button"
          >
            <img src={AnchorLogo} alt="Anchor Logo" className="h-6 w-6 mr-2" />
            login with anchor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
