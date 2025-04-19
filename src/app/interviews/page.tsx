import QuestionCard from '@/components/questioncard'
import Navbar from '@/components/navbar'
import React from 'react'
import QuestionGrid from '@/components/Interviews'
import Footer from '@/components/footer'

const Interviews = () => {
  return (
    <div className='bg-second flex flex-col gap-2 min-h-screen w-full'>
        {
             <Navbar/>
        }

        {
          
        <div className='pt-40'>
             <QuestionGrid/>
        </div>
          
        }
        <div className='mt-auto'>
            <Footer/>
        </div>

    </div>
  )
}

export default Interviews