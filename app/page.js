'use client'
import React from 'react'
import HomeLayout from './components/layout'
import { useSession } from 'next-auth/react';


function Home() {
  const {data: session} = useSession();
  return (
    <HomeLayout>

    <div className='text-cyan-800 flex justify-between'>
      <h2>Hello, <b>{session?.user?.name}</b></h2>
      
      <div className='flex gap-1 rounded-lg bg-cyan-300  overflow-hidden'>
        <img src={session?.user?.image} alt='' className='w-8 h-8'/>
        <span className='px-2 py-1'>{session?.user?.email}</span>
      </div>

    </div>

    </HomeLayout>
  )
}

export default Home