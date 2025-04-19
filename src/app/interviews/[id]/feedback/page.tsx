'use client'
import React, { useEffect } from 'react';
import createfeedback from '@/lib/feedback';
import { Types } from 'mongoose';

const Feedbackpage = () => {

  // Example mock data
  const transcript = [
    { role: 'Candidate', content: 'I am familiar with React and JavaScript.' },
    { role: 'Interviewer', content: 'Can you explain how React hooks work?' },
    { role: 'Candidate', content: 'Sure! Hooks like useState and useEffect are used to manage state and side effects in functional components.' },
  ];

  const Interview = {
    _id: "68038b15dede11a0f0a770be",   // <-- Just a string!
    userId: "68038b15dede11a0f0a770be", 
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "TailwindCSS"],
    level: "Junior",
    questions: ["Tell me about your recent project.", "What is useEffect?"],
    finalized: true,
    createdAt: new Date().toISOString(),
  };
  

  const userId = '68038b15dede11a0f0a770be';

  // Call createfeedback with mock data
  useEffect(() => {
    const fetchFeedback = async () => {
      console.log("Starting feedback generation...");

      try {
        // Logging the input data before passing it to the createfeedback function
        console.log("Transcript Data:", transcript);
        console.log("Interview Data:", Interview);
        console.log("User ID:", userId);

       createfeedback(transcript, Interview, userId);

        // Log success
        console.log("Feedback successfully generated and saved.");
      } catch (error) {
        // Log error if the feedback generation fails
        console.error("Error in feedback generation:", error);
      }
    };

    fetchFeedback();
  }, []); // Empty array means this effect runs once on component mount

  return (
    <div>
      <h1>Feedback Page</h1>
      <p>The feedback for the interview has been generated.</p>
    </div>
  );
};

export default Feedbackpage;
