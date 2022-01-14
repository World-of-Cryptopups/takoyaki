import { useGetAccount } from '@cryptopuppie/useeoschain';
import filesize from 'file-size';
import prettyMilliseconds from 'pretty-ms';
import { useAppProvider } from 'renderer/providers/app';

function getPercentage(used: number, max: number) {
  const v = used / max;
  const x = v.toString().match(/^-?\d+(?:\.\d{0,2})?/);

  if (!x) return '-';

  return x[0];
}

const DashboardAccStatsWax = () => {
  const { account } = useAppProvider();
  const data = useGetAccount(
    account ? { account_name: account?.wallet } : undefined
  );

  const ram = {
    usage: data?.ram_usage ?? 0,
    quota: data?.ram_quota ?? 0,
  };
  const cpu = {
    usage: (data?.cpu_limit.used ?? 0) / 1000,
    quota: (data?.cpu_limit.max ?? 0) / 1000,
  };
  const net = {
    usage: data?.net_limit.used ?? 0,
    quota: data?.net_limit.max ?? 0,
  };

  const percentage = {
    ram: getPercentage(ram.usage, ram.quota),
    cpu: getPercentage(cpu.usage, cpu.quota),
    net: getPercentage(net.usage, net.quota),
  };

  return (
    <>
      <div className="bg-gray-100 border-indigo-300 border-2 py-4 px-6 rounded-lg">
        <p className="text-indigo-500 font-medium mb-2">RAM</p>

        <p className="text-sm mb-0.5 text-gray-600">
          {filesize(ram.usage).human()} / {filesize(ram.quota).human()}
        </p>
        <div className="w-full bg-gray-200 rounded-lg">
          <div
            title={`${percentage.ram}%`}
            className="bg-indigo-600 text-xs font-medium text-white text-center px-0.5 py-2 leading-none rounded-l-lg truncate"
            style={{
              width: `${percentage.ram}%`,
            }}
          >
            {percentage.ram}%
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-indigo-300 border-2 py-4 px-6 rounded-lg">
        <p className="text-indigo-500 font-medium mb-2">CPU</p>

        <p className="text-sm mb-0.5 text-gray-600">
          {prettyMilliseconds(cpu.usage, { millisecondsDecimalDigits: 2 })} /{' '}
          {prettyMilliseconds(cpu.quota, { millisecondsDecimalDigits: 2 })}
        </p>
        <div className="w-full bg-gray-200 rounded-lg">
          <div
            className="bg-indigo-600 text-xs font-medium text-white text-center px-0.5 py-2 leading-none rounded-l-lg truncate"
            style={{
              width: `${percentage.cpu}%`,
            }}
          >
            {percentage.cpu}%
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-indigo-300 border-2 py-4 px-6 rounded-lg">
        <p className="text-indigo-500 font-medium mb-2">Network</p>

        <p className="text-sm mb-0.5 text-gray-600">
          {filesize(net.usage).human()} / {filesize(net.quota).human()}
        </p>
        <div className="w-full bg-gray-200 rounded-lg">
          <div
            title={`${percentage.net}%`}
            className="bg-indigo-600 text-xs font-medium text-white text-center px-0.5 py-2 leading-none rounded-l-lg truncate"
            style={{
              width: `${percentage.net}%`,
            }}
          >
            {percentage.net}%
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAccStatsWax;
