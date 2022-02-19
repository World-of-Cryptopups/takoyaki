import { useGetAccount } from '@cryptopuppie/useeoschain';
import filesize from 'file-size';
import prettyMilliseconds from 'pretty-ms';
import { useAppProvider } from '../../providers/app';
import ManageCpuModal from './manage/cpu';
import ManageNetModal from './manage/net';
import ManageRamModal from './manage/ram';

function getPercentage(used: number, max: number) {
  const v = used / max;

  return Math.ceil(v * 100);
}

const DashboardAccStatsWax = () => {
  const { account } = useAppProvider();
  const { data } = useGetAccount(
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
        <div className="flex items-center justify-between">
          <p className="text-indigo-500 font-medium mb-2">RAM</p>

          <ManageRamModal ram={ram} percentage={percentage.ram} />
        </div>

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
        <div className="flex items-center justify-between">
          <p className="text-indigo-500 font-medium mb-2">CPU</p>

          <ManageCpuModal cpu={cpu} percentage={percentage.cpu} />
        </div>

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
        <div className="flex items-center justify-between">
          <p className="text-indigo-500 font-medium mb-2">Network</p>

          <ManageNetModal net={net} percentage={percentage.net} />
        </div>
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
