'use client';

import { useUserStore } from '@/store';
import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
  // const user = useUserStore((state) => state.users);

  // console.info(user);
  return (
    <section className='flex-1 w-screen h-screen items-center justify-center'>
      <h1 className='text2xl'>Page</h1>
      <Link href='/dashboard'>Dashboard</Link>
    </section>
  );
}
