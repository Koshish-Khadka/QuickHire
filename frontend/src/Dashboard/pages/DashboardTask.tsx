import { useState } from "react";
import Taskcard from "../components/Taskcard";
import AddTask from "../components/Tasker/AddTask";
import { Link } from "react-router-dom";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
type category = "all" | "in-progress" | "completed";

export type Task = {
  budget: number;
  category: string;
  createdAt: string;
  description: string;
  endDate: string;
  location: string;
  id: string;
  status: string;
  startDate: string;
  title: string;
  urgency: string;
  userId: string;
};

const DashboardTask = () => {
  const [isActivemenu, setIsActiveMenu] = useState("all");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const { data } = useQuery<Task[]>({
    queryKey: ["createdTask"],
    queryFn: async () => {
      const res = await api.get("/jobs/created");
      return res.data.data;
    },
  });
  const handleOptions = (data: category) => {
    setIsActiveMenu(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div className="flex items-center gap-x-4">
          <p>Filter</p>

          <div className="flex justify-center items-center">
            <div className="border border-gray-300 shadow-md p-1 rounded-2xl flex gap-x-1">
              <button
                className={` p-2 rounded-2xl transition-all duration-300 ${
                  isActivemenu === "all" ? " bg-[#1B7B6F] text-white" : ""
                }`}
                onClick={() => handleOptions("all")}
              >
                All
              </button>
              <button
                className={` p-2 rounded-2xl transition-all duration-300 ${
                  isActivemenu === "in-progress"
                    ? " bg-[#1B7B6F] text-white"
                    : ""
                }`}
                onClick={() => handleOptions("in-progress")}
              >
                In Progress
              </button>
              <button
                className={` p-2 rounded-2xl transition-all duration-300 ${
                  isActivemenu === "completed" ? " bg-[#1B7B6F] text-white" : ""
                }`}
                onClick={() => handleOptions("completed")}
              >
                Completed
              </button>
            </div>
          </div>
          <button
            className="border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded-md hover:scale-105 duration-200 transition-all"
            onClick={() => setTaskModalOpen(true)}
          >
            Add task
          </button>
        </div>
      </div>
      {/* task card */}
      {data?.map((data, index) => (
        <Link to={`${data.id}`} key={index}>
          <Taskcard data={data} role={"TASKER"}/>
        </Link>
      ))}
      {/* modal */}
      {taskModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex justify-center items-center">
          <AddTask onClose={() => setTaskModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default DashboardTask;
