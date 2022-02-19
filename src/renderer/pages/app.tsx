import { INPRouter } from 'inp-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LayoutContainer from '../components/layout';
import ContentContainer from '../modules/content/container';
import SidebarContainer from '../modules/sidebar/container';
import { useAppProvider } from '../providers/app';
import DashboardPage from './dashboard/page';
import NFTsPage from './nfts/page';
import TransactionsPage from './transactions/page';

const AppContainer = () => {
  const { account, user } = useAppProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account || !user) {
      navigate('auth');
    }
  }, [account, navigate, user]);

  return (
    <INPRouter
      defaultElement="dashboard"
      routes={{
        dashboard: DashboardPage,
        nfts: NFTsPage,
        transactions: TransactionsPage,
      }}
    >
      <LayoutContainer>
        <SidebarContainer />
        <ContentContainer />
      </LayoutContainer>
    </INPRouter>
  );
};

export default AppContainer;
