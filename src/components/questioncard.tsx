import { IInterview } from "@/models/Interviews";
import React from "react";

const QuestionCard: React.FC<IInterview> = ({
  _id,
  questions,
  level,
  role,
  techstack,
  type,
  createdAt,
}) => {
  // Ensure the _id and createdAt are correctly passed and available
  const readableId = _id?.toString() ?? "No ID"; // Fallback if _id is undefined
  const readableDate = createdAt ? new Date(createdAt).toLocaleString() : "Unknown"; // Format date

  console.log("ID:", readableId); // Debugging: log the ID to ensure it's correct
  console.log("Created At:", readableDate); // Debugging: log the createdAt value

  return (
    <div className="bg-second shadow-lg rounded-2xl p-6 max-w-md mx-auto space-y-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {/* ID Section */}
      <div className="text-sm text-third">
        ID: {readableId !== "No ID" ? readableId : <span className="italic text-gray-400">No ID</span>}
      </div>

      {/* Title Section */}
      <h2 className="text-xl font-semibold text-first">{role} - {level}</h2>

      {/* Type and Created At */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-third">Type: <span className="font-semibold">{type}</span></p>
        <p className="text-sm text-third">Created At: {readableDate}</p>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="font-semibold text-first">Tech Stack:</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {techstack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-third text-first rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

     

      {/* Button to Give Interview */}
      <div onClick={() => window.location.href = `/interviews/${_id}`} className="mt-4">
        <button className="bg-third text-first font-semibold py-2 px-4 rounded-md hover:bg-first transition-all duration-300">
          Give Interview
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
