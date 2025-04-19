'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { vapi } from '@/lib/vapi';
import createfeedback from '@/lib/feedback';
import { IInterview } from '@/models/Interviews';
import { useSession } from 'next-auth/react';

const baseInterviewer = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.

- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

const InterviewTaker = () => {

  const { data: session } = useSession();

  const params = useParams();
  const id = params?.id;
  console.log("Interview ID:", id);
  
  const [questions, setQuestions] = useState<string[]>([]);
  const [interview, setinterview] = useState<IInterview>();
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState('Not started');
  const [transcripts, setTranscripts] = useState<string[]>([])

  // ✅ Fetch interview questions once
  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:3000/api/getinterviewbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.questions);
        setQuestions(data.data.questions);
        setinterview(data.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  // ✅ Handle Interview start
  const startInterview = async () => {
    try {
      await vapi.start(baseInterviewer as any, {
        variableValues: {
          questions,
        },
      });
      setIsInterviewActive(true);
      setInterviewStatus('Interview in progress');
    } catch (error) {
      console.log('VAPI start error:', error);
      setInterviewStatus('Error starting interview');
    }
  };

  // ✅ Handle Interview end
  const endInterview = () => {
    try {
      vapi.stop();
      setIsInterviewActive(false);
      setInterviewStatus('Interview ended');
      createfeedback(transcripts,interview,session?.user?.id!).then((res) => console.log(res)).catch((err) => console.log(err));
    } catch (error) {
      console.log('VAPI end error:', error);
    }
  };

  // ✅ Setup listeners
  useEffect(() => {
    const handleMessage = (message: any) => {
      console.log('VAPI message:', message)

      if (message.type === 'conversation-update' && Array.isArray(message.conversation)) {
        const formattedTranscript: string[] = []

        message.conversation.forEach((item: any) => {
          if (item.role === 'user') {
            formattedTranscript.push(`User: ${item.content}`)
          } else if (item.role === 'assistant') {
            formattedTranscript.push(`Assistant: ${item.content}`)
          }
        })

        setTranscripts(formattedTranscript)
      }
    }

    const handleCallStart = () => {
      console.log('Call has started.')
      setInterviewStatus('Interview in progress')
      setIsInterviewActive(true)
    }

    const handleCallEnd = () => {
      console.log('Call has ended.')
      setInterviewStatus('Interview ended')
      setIsInterviewActive(false)
    }

    vapi.on('message', handleMessage)
    vapi.on('call-start', handleCallStart)
    vapi.on('call-end', handleCallEnd)

    return () => {
      vapi.removeAllListeners('message')
      vapi.removeAllListeners('call-start')
      vapi.removeAllListeners('call-end')
    }
  }, [])


  return (
    <div className="bg-second min-h-screen w-full flex flex-col items-center justify-center px-4 py-6">
      <Image
        src="/aibot2.jpg"
        alt="Logo"
        width={400}
        height={200}
        priority
        className="w-[200px] md:w-[300px] lg:w-[400px] h-auto mb-4"
      />

      {!isInterviewActive ? (
        <button
          onClick={startInterview}
          className="bg-third text-white font-medium rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          Generate Interview
        </button>
      ) : (
        <button
          onClick={endInterview}
          className="bg-third text-white font-medium rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          End Interview
        </button>
      )}

      <p className="text-lg font-medium text-white m-2.5">
        Status: <span className="text-third animate-pulse duration-300">{interviewStatus}</span>
      </p>
    </div>
  );
};

export default InterviewTaker;



