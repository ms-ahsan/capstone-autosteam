import NavMobile from '@/components/nav-mobile';
import { transactions } from '@/constants/dummy';
import { CalendarDays } from 'lucide-react';
import React from 'react';

export default function Transaksi() {
  return (
    <div>
      <NavMobile title={'Dashboard'} />
      <div className='mt-6'>
        <div className='p-6'>
          {/* Header */}
          <div className='flex justify-between items-center mb-6 gap-3'>
            <h1 className='text-xl font-bold'>Transaksi</h1>
            <div className='text-gray-500 flex items-center gap-2'>
              <span className='text-xs'>
                (1 November 2024 - 2 November 2024)
              </span>
              <button className='text-black'>
                <CalendarDays />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <div className='p-6'>
          {transactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className='bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-4'
            >
              {/* Left Section */}
              <div className='flex flex-col'>
                <p className='text-black font-bold'>
                  {transaction.transactionId}
                </p>
                <p className='text-gray-500'>{transaction.user}</p>
                <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-semibold mt-2'>
                  {transaction.amount}
                </span>
              </div>

              {/* Right Section */}
              <div className='flex flex-col items-end'>
                <span className='bg-[#FF9800] text-white px-3 py-1 rounded-md text-[9px] font-semibold mb-2'>
                  {transaction.dateTime}
                </span>
                <div className='flex items-center gap-2'>
                  <span className='text-yellow-600'>
                    {/* Replace with an appropriate icon */}
                    <i className='fas fa-wallet'></i>
                  </span>
                  <span className='text-yellow-600 font-semibold'>
                    {transaction.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
