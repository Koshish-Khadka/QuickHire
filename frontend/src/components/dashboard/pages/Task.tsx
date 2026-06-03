import { useQuery } from "@tanstack/react-query";
import CreatedTaskCard from "../CreatedTaskCard";
import api from "@/lib/axios";

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

const Task = () => {
  const { data } = useQuery<Task[]>({
    queryKey: ["createdTask"],
    queryFn: async () => {
      const res = await api.get("/jobs/created");
      return res.data.data;
    },
  });
  console.log("Tasker created task", data);
  return (
    <div className="border p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">My tasks</h2>
      <p className="text-gray-600 mb-6">Manage all your posted jobs.</p>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>Total posted</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>Open</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>In progress</p>
        </div>{" "}
        <div className="bg-red-50 p-6 rounded-md">
          <p className="text-2xl font-bold">1</p>
          <p>Completed</p>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        {data?.length === 0 ? (
          <p>No Task created</p>
        ) : (
          data?.map((item) => {
            return (
              <>
                <CreatedTaskCard data={item} />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Task;
