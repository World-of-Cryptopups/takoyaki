import { Switch } from '@headlessui/react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useModal } from '../../../components/modal';
import {
  DEFAULT_SETTINGS,
  DEFAULT_TESTNET_SETTINGS,
} from '../../../lib/settings';
import { useSettings } from '../../../modules/settings/provider';

const SettingsModal = () => {
  const { closeModal } = useModal();
  const { setEndpoints, setIsTestnet, testnet } = useSettings();

  const [switchTestnet, setSwitchTestnet] = useState(testnet);

  const inputChainApi = useRef<HTMLInputElement>(null);
  const inputChainId = useRef<HTMLInputElement>(null);
  const inputAtomicApi = useRef<HTMLInputElement>(null);

  const save = () => {
    const chainapi = inputChainApi.current?.value ?? '';
    const atomicapi = inputAtomicApi.current?.value ?? '';
    const chainid = inputChainId.current?.value ?? '';

    if (!chainapi) {
      // TODO:: catch error
      return;
    }
    if (!chainid) {
      // TODO:: catch error
      return;
    }
    if (!atomicapi) {
      // TODO:: catch error
      return;
    }

    const currentSettings = {
      atomicassets: atomicapi,
      chain: chainapi,
      chainId: chainid,
    };

    // set api settings
    window.localStorage.setItem(
      'CURRENT_APP_SETTINGS',
      JSON.stringify(currentSettings)
    );

    // set if testnet
    window.localStorage.setItem('CURRENT_APP_TESTNET', String(switchTestnet));

    setEndpoints(currentSettings);
    setIsTestnet(switchTestnet);

    toast.success('Successfully saved new settings.');

    closeModal();
  };

  return (
    <div className="mt-8">
      <Switch.Group>
        <div className="flex items-center justify-end">
          <Switch.Label className="mr-4 text-sm">
            Switch to TestNet
          </Switch.Label>
          <Switch
            checked={switchTestnet}
            onChange={setSwitchTestnet}
            className={`${switchTestnet ? 'bg-indigo-600' : 'bg-indigo-300'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Switch to TestNet</span>
            <span
              aria-hidden="true"
              className={`${switchTestnet ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
      </Switch.Group>

      <div className="my-3">
        <div className="flex flex-col my-2">
          <span className="mb-1 text-sm text-gray-700">WAX Chain API</span>
          <input
            type="text"
            name="chain-api"
            ref={inputChainApi}
            className="py-3 px-6 border rounded-lg text-sm"
            readOnly
            placeholder="WAX Chain API"
            value={
              switchTestnet
                ? DEFAULT_TESTNET_SETTINGS.chain
                : DEFAULT_SETTINGS.chain
            }
          />
        </div>

        <div className="flex flex-col my-2">
          <span className="mb-1 text-sm text-gray-700">Chain ID</span>
          <input
            type="text"
            name="chain-id"
            ref={inputChainId}
            className="py-3 px-6 border rounded-lg text-xs"
            readOnly
            placeholder="WAX Chain API"
            value={
              switchTestnet
                ? DEFAULT_TESTNET_SETTINGS.chainId
                : DEFAULT_SETTINGS.chainId
            }
          />
        </div>

        <div className="flex flex-col my-2">
          <span className="mb-1 text-sm text-gray-700">AtomicAssets API</span>
          <input
            type="text"
            name="atomicassets-api"
            ref={inputAtomicApi}
            className="py-3 px-6 border rounded-lg text-sm"
            readOnly
            placeholder="AtomicHub API"
            value={
              switchTestnet
                ? DEFAULT_TESTNET_SETTINGS.atomicassets
                : DEFAULT_SETTINGS.atomicassets
            }
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={save}
          type="button"
          className="py-3 px-12 text-sm uppercase rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
