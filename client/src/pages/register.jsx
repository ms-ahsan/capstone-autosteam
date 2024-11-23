import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function Register() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='pt-6'>
        <div className='flex justify-center'>
          <div className='flex items-center justify-between space-x-3'>
            <img
              src='../../public/logo.png'
              alt=''
              className='w-[75px] h-[75px] rounded-[30px]'
            />
            <div className='flex flex-col '>
              <h1 className='uppercase font-bold text-base'>
                auto steam cashier
              </h1>
              <p>Car and Motorbike</p>
            </div>
          </div>
        </div>

        <h2 className='font-bold mt-[58px]'>Create your account</h2>

        {/* form */}
        <div className='mt-[39px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted'>
                      Nama Toko
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='mt-6'>
                    <FormLabel className='text-muted'>
                      Email Toko
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Email Toko' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='mt-6'>
                    <FormLabel className='text-muted'>
                      Nomor Telepon
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Nomor Telepon' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='mt-6'>
                    <FormLabel className='text-muted'>
                      Alamat
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Alamat' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='mt-6'>
                    <FormLabel className='text-muted'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='text-right mt-3'>
                <a
                  href='#'
                  className='text-primary text-sm font-semibold'
                >
                  Forgot Password
                </a>
              </div>
              <Button type='submit' className='w-full mt-9'>
                Log In
              </Button>
              <Button
                type='submit'
                variant='outline'
                className='w-full mt-5'
              >
                <img
                  src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000'
                  alt=''
                  className='w-8 h-8'
                />
                Log In with google
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
