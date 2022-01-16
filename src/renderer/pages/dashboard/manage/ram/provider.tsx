import { useGetTableRows } from '@cryptopuppie/useeoschain';
import { createContext, ReactNode, useContext } from 'react';
import { GETRAM } from '../../../../typings/ram';

interface ManageRamProviderProps {
  children: ReactNode;
}

interface ManageRamContextProps {
  data?: GETRAM | null;
}

const ManageRamContext = createContext<ManageRamContextProps>({});

const ManageRamProvider = ({ children }: ManageRamProviderProps) => {
  const { data } = useGetTableRows<GETRAM>({
    code: 'eosio',
    scope: 'eosio',
    table: 'rammarket',
  });

  return (
    <ManageRamContext.Provider value={{ data: data?.rows[0] }}>
      {children}
    </ManageRamContext.Provider>
  );
};

export const useManageRam = () => {
  const context = useContext(ManageRamContext);
  if (context === undefined)
    throw new Error('<ManageRamProvider></ManageRamProvider>');

  return context;
};

export default ManageRamProvider;
