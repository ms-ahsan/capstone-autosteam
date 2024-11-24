import NavMobile from '@/components/nav-mobile';
import { summaryData } from '@/constants/dummy';
import { CalendarDays } from 'lucide-react';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const chartData = [
  { name: 'Desktop', value: 1224, color: '#2563eb' }, // Total desktop
  { name: 'Mobile', value: 860, color: '#60a5fa' }, // Total mobile
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
};

export default function dashboard() {
  return (
    <div>
      <NavMobile title={'Dashboard'} />
      <div className='mt-6'>
        <div className='p-6'>
          {/* Header */}
          <div className='flex justify-between items-center mb-6 gap-3'>
            <h1 className='text-xl font-bold'>Summary</h1>
            <div className='text-gray-500 flex items-center gap-2'>
              <span className='text-xs'>
                (1 November 2024 - 2 November 2024)
              </span>
              <button className='text-black'>
                <CalendarDays />
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className='grid grid-cols-2 gap-4'>
            {summaryData.map((item) => (
              <div
                key={item.id}
                className='bg-blue-500 text-white rounded-lg p-4 shadow-md'
              >
                <h2 className='text-sm font-semibold mb-2'>
                  {item.title}
                </h2>
                <p className='text-xl font-bold'>{item.value}</p>
                {item.subValue && (
                  <p className='text-sm font-medium mt-1'>
                    {item.subValue}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <ChartContainer
          config={chartConfig}
          className='min-h-[200px] w-full'
        >
          <PieChart width={400} height={300}>
            {/* Pie */}
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill='#8884d8'
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* Tooltip */}
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
