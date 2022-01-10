import AppProvider from 'renderer/providers/app';
import LayoutContainer from '../components/layout';
import ContentContainer from '../modules/content/container';
import SidebarContainer from '../modules/sidebar/container';

const AppContainer = () => {
  return (
    <AppProvider>
      <LayoutContainer>
        <SidebarContainer />
        <ContentContainer />
      </LayoutContainer>
    </AppProvider>
  );
};

export default AppContainer;
