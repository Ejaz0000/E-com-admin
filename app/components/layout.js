'use client'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import Nav from './nav';



export default function HomeLayout({children}) {
  const {data: session} = useSession();
  if(!session){
    return (
      <div className='bg-cyan-600 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={()=> signIn('google')} className='bg-white rounded-lg p-2 px-4'>Login with google</button>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-cyan-600 flex'>
      <Nav />
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
      {children}
      </div>
    </div>
  )
}
