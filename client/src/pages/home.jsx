import { menuItems } from '@/constants/dashboard-menu';
import React from 'react';

export default function Home() {
  return (
    <>
      <div className='bg-primary text-white px-4 py-14 rounded-b-3xl shadow-lg'>
        {/* User Profile Section */}
        <div className='flex items-center space-x-4'>
          <img
            src='https://via.placeholder.com/50'
            alt='Profile'
            className='w-16 h-16 rounded-full border-2 border-white'
          />
          <div>
            <h2 className='text-lg font-semibold'>John Doe</h2>
            <p className='text-sm'>Kasir Mirae</p>
            <span className='bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded'>
              Aktif
            </span>
          </div>
        </div>

        {/* Summary Section */}
        <div className='mt-6'>
          <h3 className='font-semibold text-lg'>Summary</h3>
          <div className='flex items-center justify-between mt-4'>
            <div className='bg-white text-black p-4 rounded-lg w-1/2 mx-1'>
              <p className='text-sm text-gray-500'>
                Total transaksi (Hari ini)
              </p>
              <p className='text-2xl font-bold'>120</p>
            </div>
            <div className='bg-white text-black p-4 rounded-lg w-1/2 mx-1'>
              <p className='text-sm text-gray-500'>
                Total pendapatan (Hari ini)
              </p>
              <p className='text-2xl font-bold'>Rp 940.000</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-4 mt-7'>
        <h2 className='text-lg font-semibold'>Main Menu</h2>
        <div className='grid grid-cols-2 gap-4 p-6'>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow'
            >
              {/* Icon */}
              <div className='w-16 h-16 flex items-center justify-center mb-3'>
                <img
                  src={item.icon}
                  alt={item.title}
                  className='w-full h-full object-contain'
                />
              </div>
              {/* Title */}
              <p className='text-black text-sm font-semibold'>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
