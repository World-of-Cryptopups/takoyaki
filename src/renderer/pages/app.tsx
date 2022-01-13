import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LayoutContainer from '../components/layout';
import ContentContainer from '../modules/content/container';
import SidebarContainer from '../modules/sidebar/container';
import { useAppProvider } from '../providers/app';

const AppContainer = () => {
  const { user } = useAppProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('auth');
    }
  }, [user, navigate]);

  return (
    <LayoutContainer>
      <SidebarContainer />
      <ContentContainer />
    </LayoutContainer>
  );
};

export default AppContainer;
