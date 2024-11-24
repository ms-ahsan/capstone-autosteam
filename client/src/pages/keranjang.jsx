import NavMobile from '@/components/nav-mobile';
import React, { useState } from 'react';

export default function Keranjang() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cuci Motor Kecil',
      price: 15000,
      quantity: 1,
      image: '🛵',
    },
    {
      id: 2,
      name: 'Indomie Rebus',
      price: 8000,
      quantity: 1,
      image: '🍜',
    },
    {
      id: 3,
      name: 'Kopi Kapal Api',
      price: 5000,
      quantity: 1,
      image: '☕',
    },
  ]);

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === 'increment'
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <NavMobile title={'Transaksi'} />
      <div className='p-6'>
        <h1 className='text-xl font-bold mb-4'>
          Keranjang Item Transaksi
        </h1>
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between bg-white shadow-md rounded-lg p-4'
            >
              <div className='flex items-center gap-4'>
                <div className='text-4xl'>{item.image}</div>
                <div>
                  <p className='font-semibold text-gray-800'>
                    {item.name}
                  </p>
                  <p className='text-blue-500 font-medium'>
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center border rounded-md'>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, 'decrement')
                    }
                    className='px-2 py-1 text-gray-700 font-bold hover:bg-gray-100'
                  >
                    -
                  </button>
                  <span className='px-4'>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, 'increment')
                    }
                    className='px-2 py-1 text-gray-700 font-bold hover:bg-gray-100'
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600'
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
