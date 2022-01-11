import DashboardPage from '../../pages/dashboard/page';
import ContentHeader from './header';

const ContentContainer = () => {
  return (
    <div className="w-full h-full">
      <ContentHeader />

      <div className="py-32 pl-32 pr-10">
        <DashboardPage />
      </div>
    </div>
  );
};

export default ContentContainer;
