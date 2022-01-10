import DashboardAccStatsBalance from './acc-stats-bal';
import DashboardAccStatsWax from './acc-stats-wax';
import DashboardWaxPrice from './waxprice';

const DashboardAccStats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <DashboardAccStatsBalance />

      <DashboardWaxPrice />

      <DashboardAccStatsWax />
    </div>
  );
};

export default DashboardAccStats;
