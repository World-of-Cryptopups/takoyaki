import DashboardAccStats from './acc-stats';
import DashboardPriceGraph from './graph-price';

const DashboardPage = () => {
  return (
    <div>
      <DashboardAccStats />

      <DashboardPriceGraph />
    </div>
  );
};

export default DashboardPage;
