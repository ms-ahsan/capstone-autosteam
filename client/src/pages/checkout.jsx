import NavMobile from '@/components/nav-mobile';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function Checkout() {
  return (
    <>
      <NavMobile title={'Transaksi'} />
      <div className='p-6'>
        <h1 className='text-xl font-bold mb-4'>
          Isi Data Kendaraan dan Petugas{' '}
          <span className='text-red-500'>*</span>
        </h1>

        <div className='space-y-8'>
          {/* Section 1: Data Kendaraan dan Petugas */}
          <div>
            <Card className='shadow-md'>
              <CardHeader>
                <div className='flex items-center gap-4'>
                  <div className='text-4xl'>🛵</div>
                  <div>
                    <CardTitle>Cuci Motor Kecil</CardTitle>
                    <p className='text-blue-500 font-medium'>
                      Rp 15.000
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Data Kendaraan */}
                <div>
                  <h3 className='font-medium text-gray-800 mb-2'>
                    Data Kendaraan
                  </h3>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div>
                      <Label htmlFor='vehicleName'>
                        Nama Kendaraan
                      </Label>
                      <Input
                        id='vehicleName'
                        placeholder='Vario 125 2015'
                      />
                    </div>
                    <div>
                      <Label htmlFor='vehicleType'>
                        Jenis Kendaraan
                      </Label>
                      <Input id='vehicleType' placeholder='Motor' />
                    </div>
                    <div>
                      <Label htmlFor='plateNumber'>
                        Plat Nomor Kendaraan
                      </Label>
                      <Input
                        id='plateNumber'
                        placeholder='B 45XX AC'
                      />
                    </div>
                  </div>
                </div>

                {/* Petugas Pelaksana */}
                <div>
                  <h3 className='font-medium text-gray-800 mb-2'>
                    Petugas Pelaksana
                  </h3>
                  <div className='space-y-2'>
                    {['Dapit', 'Akhsan', 'Lingga'].map((name) => (
                      <div
                        key={name}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox id={`worker-${name}`} />
                        <Label
                          htmlFor={`worker-${name}`}
                          className='text-gray-800'
                        >
                          {name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 2: Data Pelanggan */}
          <div>
            <h2 className='text-lg font-semibold mb-4'>
              Isi Data Pelanggan (Opsional)
            </h2>
            <Card className='shadow-md'>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div>
                    <Label htmlFor='customerName'>
                      Nama Pelanggan
                    </Label>
                    <Input
                      id='customerName'
                      placeholder='Andri Wijaya'
                    />
                  </div>
                  <div>
                    <Label htmlFor='customerPhone'>
                      No Telp Pelanggan
                    </Label>
                    <Input
                      id='customerPhone'
                      placeholder='0811XXXXXXX'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
