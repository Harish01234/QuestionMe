"use client";

import React, { useEffect, useState } from "react";
import QuestionCard from "./questioncard"; // adjust path if needed
import { IInterview } from "@/models/Interviews";

const QuestionGrid: React.FC = () => {
  const [data, setData] = useState<IInterview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/genarate");
        const result = await res.json();
        console.log("API Response:", result); // Check API response
        if (result.success) {
          setData(result.data); // Update state with the "data" array
        } else {
          console.log("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching interview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log("Data after state update:", data); // Log data after it updates
  }, [data]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data.length) return <p className="text-center">No questions found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {data.map((item) => (
        <QuestionCard key={item._id ? item._id.toString() : "no-id"} {...item} />
      ))}
    </div>
  );
};

export default QuestionGrid;
