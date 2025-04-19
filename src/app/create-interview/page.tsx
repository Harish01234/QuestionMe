'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Interviewgenarator from '@/components/interviewgenarator';

const page = () => {
    const { data: session } = useSession();
    console.log(session);
    
  return (
    <div className='bg-second w-full h-screen'>
      {<Navbar/>}
      <div className='pt-40'>
        <Interviewgenarator/>
      </div>
      {<Footer/>}

    </div>
  )
}

export default page