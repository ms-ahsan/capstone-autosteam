import React from 'react';

export default function AddTransaksi() {
  const categories = [
    'Semua',
    'Steam Cuci Kendaraan',
    'Makanan',
    'Minuman',
  ];
  const products = [
    {
      id: 1,
      name: 'Cuci Motor Kecil',
      price: 'Rp 15.000',
      image: '🛵',
    },
    {
      id: 2,
      name: 'Cuci Motor Besar',
      price: 'Rp 20.000',
      image: '🏍️',
    },
    {
      id: 3,
      name: 'Cuci Mobil Standar',
      price: 'Rp 20.000',
      image: '🚗',
    },
    {
      id: 4,
      name: 'Cuci Mobil Besar',
      price: 'Rp 40.000',
      image: '🚙',
    },
    {
      id: 5,
      name: 'Cuci Mobil Angkot',
      price: 'Rp 35.000',
      image: '🚐',
    },
    { id: 6, name: 'Kopi ABC Susu', price: 'Rp 20.000', image: '☕' },
    { id: 7, name: 'Kopi Kapal Api', price: 'Rp 5.000', image: '🔥' },
    { id: 8, name: 'Indomie Rebus', price: 'Rp 10.000', image: '🍜' },
  ];

  return (
    <div className='p-6'>
      {/* Search and Categories */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Cari produk'
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
        />
        <div className='flex gap-2 mt-4 flex-wrap'>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                category === 'Semua'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-3 gap-4'>
        {/* Add Product Card */}
        <div className='bg-gray-100 flex flex-col items-center justify-center p-6 rounded-lg shadow-md'>
          <div className='text-4xl text-gray-500 mb-2'>+</div>
          <p className='text-sm font-medium text-gray-600'>
            Tambah Produk
          </p>
        </div>

        {/* Product Cards */}
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white flex flex-col items-center p-4 rounded-lg shadow-md'
          >
            <div className='text-4xl mb-4'>{product.image}</div>
            <p className='text-sm font-medium text-gray-700'>
              {product.name}
            </p>
            <span className='mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-semibold'>
              {product.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
