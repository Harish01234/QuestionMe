import Footer from '@/components/footer'
import Herosection from '@/components/herosection'
import Navbar from '@/components/navbar'
import React from 'react'

const homepage = () => {
  return (
    <div className='bg-second flex flex-col gap-2.5 min-h-screen w-full'>
  <Navbar />
  <div className="pt-40"> {/* Adjust this padding as per navbar height */}
    <Herosection />
  </div>
  <Footer/>
</div>

  )
}

export default homepage