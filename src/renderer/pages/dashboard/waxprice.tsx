import useFetchWaxPrice from 'renderer/lib/hooks/useFetchWaxPrice';

const DashboardWaxPrice = () => {
  const price = useFetchWaxPrice();

  return (
    <div className="bg-indigo-100 py-6 px-8 rounded-lg">
      <p className="text-indigo-300 mb-2">WAXP Current Price</p>
      <strong className="text-indigo-500 text-4xl font-black truncate">
        $ {price}
      </strong>
    </div>
  );
};

export default DashboardWaxPrice;
