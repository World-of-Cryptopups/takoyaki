import { UseHyperionProvider } from '@cryptopuppie/useeoshyperion';
import MyTransactions from './transactions';

const TransactionsPage = () => {
  return (
    <UseHyperionProvider endpoint="https://testnet.waxsweden.org">
      <MyTransactions />
    </UseHyperionProvider>
  );
};

export default TransactionsPage;
