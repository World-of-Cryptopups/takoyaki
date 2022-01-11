import { useNavigate } from 'react-router';
import { AnchorLogo } from 'renderer/lib/anchor';
import { useAppProvider } from 'renderer/providers/app';

const AuthPage = () => {
  const { login } = useAppProvider();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-20 shadow-2xl rounded-lg bg-white">
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
