import { Dialog, Transition } from '@headlessui/react';
import { createContext, Fragment, ReactNode, useContext } from 'react';

interface BaseModalProps extends BaseModalContextProps {
  width: string;
  children: ReactNode;
}

interface BaseModalContextProps {
  open: boolean;
  // eslint-disable-next-line react/require-default-props
  onClose?: () => void;
  closeModal: () => void;
}

const BaseModalContext = createContext<BaseModalContextProps>({
  open: false,
  closeModal: () => {},
});

const BaseModal = (props: BaseModalProps) => {
  const { open, onClose, closeModal, children, width } = props;

  return (
    <BaseModalContext.Provider value={{ open, onClose, closeModal }}>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose ?? (() => {})}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`${width} inline-block w-full p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </BaseModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(BaseModalContext);
  if (context === undefined) throw new Error('No BaseModal parent.');

  return context;
};

export default BaseModal;
