import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppProvider } from 'renderer/providers/app';
import LayoutContainer from '../components/layout';
import ContentContainer from '../modules/content/container';
import SidebarContainer from '../modules/sidebar/container';

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
