import DashboardPage from '../../pages/dashboard/page';
import ContentHeader from './header';

const ContentContainer = () => {
  return (
    <div className="w-full h-full">
      <ContentHeader />

      <div className="p-12">
        <DashboardPage />
      </div>
    </div>
  );
};

export default ContentContainer;
