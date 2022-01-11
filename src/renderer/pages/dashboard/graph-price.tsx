// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchWax from '../../lib/hooks/useFetchWax';

const DashboardPriceGraph = () => {
  const data = useFetchWax();

  const options: Highcharts.Options = {
    title: {
      text: 'WAXP Weekly Price',
      style: { fontSize: '16' },
    },
    series: [{ type: 'area', name: 'WAXP Price', data: data ?? [] }],
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? 'Click and drag in the plot area to zoom in'
          : 'Pinch the chart to zoom in',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Exchange rate',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, '#6366F1'],
            [1, '#E0E7FF'],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    chart: {
      zoomType: 'x',
    },
  };

  return (
    <div className="mt-6">
      <h4 className="font-bold text-neutral-700 uppercase text-sm tracking-wide">
        Price Graph
      </h4>

      <div className="w-full h-96 mt-6">
        {data ? (
          // <ResponsiveContainer width="100%" height="100%">
          //   <AreaChart
          //     width={500}
          //     height={400}
          //     data={data}
          //     margin={{
          //       top: 0,
          //       right: 0,
          //       left: 0,
          //       bottom: 0,
          //     }}
          //   >
          //     <CartesianGrid strokeDasharray="3 3" />
          //     <XAxis tick={{ fontSize: 12 }} dataKey="date" />
          //     <YAxis tick={{ fontSize: 12 }} />
          //     <Tooltip wrapperClassName="text-sm" />
          //     <Area
          //       type="natural"
          //       dataKey="price"
          //       stroke="#a5b4fc"
          //       fill="#c7d2fe"
          //     />
          //   </AreaChart>
          // </ResponsiveContainer>

          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DashboardPriceGraph;
