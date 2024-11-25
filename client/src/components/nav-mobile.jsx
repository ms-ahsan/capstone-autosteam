import { ArrowLeft } from 'lucide-react';
import React from 'react';

export default function NavMobile({ title, href }) {
  return (
    <div className='bg-primary text-white p-4 rounded-b-3xl shadow-lg'>
      <div className='flex items-center justify-between relative'>
        <div className='absolute left-0 flex items-center'>
          <ArrowLeft />
        </div>

        <p className='mx-auto text-center font-semibold'>{title}</p>
      </div>
    </div>
  );
}
