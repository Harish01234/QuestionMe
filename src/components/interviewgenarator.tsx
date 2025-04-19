'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { vapi } from '@/lib/vapi';

const InterviewGenerator = () => {
    const [interviewStatus, setInterviewStatus] = useState('Waiting to start...')
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const startInterview = () => {
    try {
      vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!)
      setIsInterviewActive(true)
      setInterviewStatus('Interview in progress')
    } catch (error) {
      console.log('VAPI start error:', error)
      setInterviewStatus('Error starting interview')
    }
  }

  const endInterview = () => {
    try {
      vapi.stop()
      setIsInterviewActive(false)
      setInterviewStatus('Interview ended')
    } catch (error) {
      console.log('VAPI end error:', error)
    }
  }

  useEffect(() => {
    // Set up only the necessary event listeners
    vapi.on("call-start", () => {
      console.log("Call has started.")
      setInterviewStatus('Interview in progress')
      setIsInterviewActive(true)
    })
    
    vapi.on("call-end", () => {
      console.log("Call has ended.")
      setInterviewStatus('Interview ended')
      setIsInterviewActive(false)
    })
    
    // No error listener - we'll handle state changes through the call-end event
    
    // Clean up event listeners on component unmount
    return () => {
      vapi.removeAllListeners("call-start")
      vapi.removeAllListeners("call-end")
    }
  }, [])

  return (
    <div className="bg-second min-h-screen w-full flex flex-col items-center justify-center px-4 py-6">
      <Image
        src="/aibot.png"
        alt="Logo"
        width={400}
        height={200}
        priority
        className="w-[200px] md:w-[300px] lg:w-[400px] h-auto mb-4"
      />

      {
        isInterviewActive==false ? (<button
            onClick={startInterview}
            className="bg-third text-white font-medium rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Generate Interview
          </button>) : (<button
            onClick={endInterview}
            className="bg-third text-white font-medium rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300 shadow-md"          >
            End Interview
          </button>)
      }
      <p className="text-lg font-medium text-white m-2.5">
            Status: <span className="text-third animate-pulse duration-300">{interviewStatus}</span>
          </p>
    </div>
  );
};

export default InterviewGenerator;
