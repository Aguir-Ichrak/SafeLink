import React, { useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { FaBuildingShield } from 'react-icons/fa6';
// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06(data) {
  console.log(data.AB)

  const chartData = {
    labels: ['Reserved', 'Available'],
    datasets: [
      {
        label: 'Buildings',
        data: [
          data.AB, data.RB
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {chartData.datasets.data=[
    data.AB, data.RB
  ]},data)

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-5">
      <div
className='bg-transparent'
>
<div
className='bg-transparent'
>
  <FaBuildingShield
className="text-black text-xl"
  />
</div></div>
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Buildings</h2>
      </header>
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
