import LayoutContainer from '../components/layout';
import ContentContainer from '../modules/content/container';
import SidebarContainer from '../modules/sidebar/container';

const AppContainer = () => {
  return (
    <LayoutContainer>
      <SidebarContainer />
      <ContentContainer />
    </LayoutContainer>
  );
};

export default AppContainer;
