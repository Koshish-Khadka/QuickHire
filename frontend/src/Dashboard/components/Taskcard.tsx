import React from "react";

const Taskcard = () => {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 hover:shadow-md transition-all hover:-translate-y-1 duration-200 ease-in-out ">
      <h2 className="text-lg font-semibold mb-2">
        Worker needed for garden cleaning and maintenance
      </h2>
      <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
        This is a description of task 1. It provides details about the task and
        what needs to be done.
      </p>
      <div className="grid grid-cols-3 gap-3">
        <p className="text-sm text-gray-500">Status: In Progress</p>
        <p className="text-sm text-gray-500">Budget: $500</p>
        <p className="text-sm text-gray-500">Start Date: 2024-07-15</p>
        <p className="text-sm text-gray-500">Urgency: High</p>
        <p className="text-sm text-gray-500">End Date: 2024-07-15</p>
        <p className="text-sm text-gray-500">Category: Garden Maintenance</p>
      </div>
      <div className="flex items-center gap-x-4 mt-4">
        <button className="border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded-md hover:scale-105 duration-200 transition-all">
          Edit
        </button>
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:scale-105 duration-200 transition-all">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Taskcard;
