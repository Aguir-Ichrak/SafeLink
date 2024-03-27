import React from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08() {

  const chartData = {
    labels: [
      '12-01-2020',
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
      '10-01-2021',
      '11-01-2021',
      '12-01-2021',
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
      '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Current',
        data: [73, 64, 73, 69, 104, 104, 164, 164, 120, 120, 120, 148, 142, 104, 122, 110, 104, 152, 166, 233, 268, 252, 284, 284, 333, 323],
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Blue line
      {
        label: 'Previous',
        data: [184, 86, 42, 378, 42, 243, 38, 120, 0, 0, 42, 0, 84, 0, 276, 0, 124, 42, 124, 88, 88, 215, 156, 88, 124, 64],
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // emerald line
      {
        label: 'Average',
        data: [122, 170, 192, 86, 102, 124, 115, 115, 56, 104, 0, 72, 208, 186, 223, 188, 114, 162, 200, 150, 118, 118, 76, 122, 230, 268],
        borderColor: tailwindConfig().theme.colors.emerald[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{height: "25px"}}><path d="M97.2 96.2c10.4-10.7 16-17.1 16-21.9 0-2.8-1.9-5.5-3.8-7.4A14.8 14.8 0 0 0 101 64.1c-8.5 0-20.9 8.8-35.8 25.7C23.7 137 2.5 182.8 3.4 250.3s17.5 117 54.1 161.9C76.2 435.9 90.6 448 100.9 448a13.6 13.6 0 0 0 8.4-3.8c1.9-2.8 3.8-5.6 3.8-8.4 0-5.6-3.9-12.2-13.2-20.6-44.5-42.3-67.3-97-67.5-165C32.3 188.8 54 137.8 97.2 96.2zM239.5 420.1c.6 .4 .9 .6 .9 .6zm93.8 .6 .2-.1C333.2 420.6 333.2 420.7 333.3 420.6zm3.1-158.2c-16.2-4.2 50.4-82.9-68.1-177.2 0 0 15.5 49.4-62.8 159.6-74.3 104.4 23.5 168.7 34 175.2-6.7-4.4-47.4-35.7 9.6-128.6 11-18.3 25.5-34.9 43.5-72.2 0 0 15.9 22.5 7.6 71.1C287.7 364 354 342.9 355 343.9c22.8 26.8-17.7 73.5-21.6 76.6 5.5-3.7 117.7-78 33-188.1C360.4 238.4 352.6 266.6 336.4 262.4zM510.9 89.7C496 72.8 483.5 64 475 64a14.8 14.8 0 0 0 -8.4 2.8c-1.9 1.9-3.8 4.7-3.8 7.4 0 4.8 5.6 11.3 16 21.9 43.2 41.6 65 92.6 64.8 154.1-.2 68-23 122.6-67.5 165-9.3 8.4-13.2 14.9-13.2 20.6 0 2.8 1.9 5.6 3.8 8.4A13.6 13.6 0 0 0 475.1 448c10.3 0 24.7-12.1 43.5-35.8 36.6-44.9 53.1-94.4 54.1-161.9S552.3 137 510.9 89.7z"/></svg>        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Fire Detection</h2>
      </header>
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
