'use client'
import Navbar from '@/components/navbar';
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import Footer from '@/components/footer';
import InterviewTaker from '@/components/interviewtaker';

const Interviewpage = () => {
  //   const asyncParams = useParams(); // Still synchronous in Client Components
  // const id = asyncParams?.id;
    
  //   const [interviewid, setinterviewid] = useState(asyncParams?.id);
    
  return (
    <div className='bg-second flex flex-col gap-2 min-h-screen w-full'>
        {<Navbar/>}
        {<div className='pt-40'>
            {/* {interviewid} */}
        </div>}
            <div>
                { <InterviewTaker /> }
            </div>
        <div className='mt-auto'>
            <Footer/>
        </div>
    </div>
  )
}

export default Interviewpage