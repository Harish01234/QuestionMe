'use client'
import Feedbackall from '@/components/feedback'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import { useSession } from 'next-auth/react'

const Feedbackpage = () => {
    const { data: session } = useSession();
    console.log(session);
    
  return (
    <div className=' bg-second' >
        {
            <Navbar/>
        }

        {  
            <div className='pt-10'>
                <Feedbackall/>
            </div>
        }
        {
            <div className='mt-auto'>
                <Footer />
            </div>
        }
    </div>
  )
}

export default Feedbackpage