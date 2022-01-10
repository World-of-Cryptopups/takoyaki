import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useFetchWax from '../../lib/hooks/useFetchWax';

const DashboardPriceGraph = () => {
  const data = useFetchWax();

  return (
    <div className="mt-6">
      <h4 className="font-bold text-neutral-700 uppercase text-sm tracking-wide">
        Price Graph
      </h4>

      <div className="w-full h-96 mt-6">
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={{ fontSize: 12 }} dataKey="date" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip wrapperClassName="text-sm" />
              <Area
                type="natural"
                dataKey="price"
                stroke="#a5b4fc"
                fill="#c7d2fe"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DashboardPriceGraph;
