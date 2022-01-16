import { RenderRoutes } from 'inp-router';
import ContentHeader from './header';

const ContentContainer = () => {
  return (
    <div className="w-full h-full">
      <ContentHeader />

      <div className="py-32 pl-32 pr-10">
        <RenderRoutes />
      </div>
    </div>
  );
};

export default ContentContainer;
