import NavMobile from '@/components/nav-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export default function CheckoutTransaksi() {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const totalPrice = 28000; // Total harga transaksi
  const change = Math.max(paymentAmount - totalPrice, 0);

  const handleExactPayment = () => {
    setPaymentAmount(totalPrice);
  };
  return (
    <>
      <NavMobile title={'Transaksi'} />
      <div className='p-6 space-y-6'>
        {/* Total Harga Transaksi */}
        <Card className='shadow-md'>
          <CardContent className='flex items-center gap-4'>
            <div className='text-4xl'>💵</div>
            <div>
              <CardTitle>Total Harga Transaksi</CardTitle>
              <p className='text-2xl font-bold text-gray-800'>
                Rp {totalPrice.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pembayaran */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Pembayaran</h2>
          <div className='space-y-4'>
            {/* Metode Pembayaran */}
            <div>
              <Label htmlFor='paymentMethod'>Metode Pembayaran</Label>
              <Input id='paymentMethod' value='Cash' disabled />
            </div>

            {/* Jumlah Bayar */}
            <div>
              <Label htmlFor='paymentAmount'>Jumlah Bayar</Label>
              <Input
                id='paymentAmount'
                type='number'
                placeholder='0'
                value={paymentAmount}
                onChange={(e) =>
                  setPaymentAmount(Number(e.target.value))
                }
              />
            </div>

            {/* Tombol Uang Pas */}
            <Button
              className='bg-yellow-400 text-black flex items-center gap-2'
              onClick={handleExactPayment}
            >
              💰 Uang Pas
            </Button>
          </div>
        </div>

        {/* Kembalian */}
        <div>
          <h3 className='text-lg'>Kembalian:</h3>
          <p className='text-2xl font-bold text-green-600'>
            Rp {change.toLocaleString()}
          </p>
        </div>

        {/* Tombol Tambah Transaksi */}
        <Button className='w-full bg-green-500 text-white py-4 rounded-lg text-lg font-semibold'>
          Tambah Transaksi
        </Button>
      </div>
    </>
  );
}
