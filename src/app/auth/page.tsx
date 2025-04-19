'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Authform from '@/components/register';
import Footer from '@/components/footer';
import Login from '@/components/login';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle state

  return (
    <div className="bg-third min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-grow">

        {isLogin ? <Login /> : <Authform />}
 
         <p className="mt-4 text-white text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-400 hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p> 
      </div>
      
      <Footer />
    </div>
  );
};

export default Page;
