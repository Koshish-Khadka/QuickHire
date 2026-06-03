import { useQuery } from "@tanstack/react-query";
import Taskcard from "../components/Taskcard";
import api from "@/lib/axios";
import type { Task } from "./DashboardTask";

type WorkerApplicationType = {
  id: string;
  jobId: string;
  workerId: string;
  coverLetter: string;
  proposedPrice: number;
  status: string;
  appliedAt: string;
  createdAt: string;
  job: Task;
};


const Appliedtask = () => {
  const { data, isLoading, isError } = useQuery<WorkerApplicationType[]>({
    queryKey: ["appliedTask"],
    queryFn: async () => {
      const res = await api.get("/applications/workers/applications");
      return res.data.data;
    },
  });

  // console.log("applied task", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching applied tasks.</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Applied Task</h1>
      <div className="mt-6">
        {data?.length === 0 ? (
          <p>No applied tasks found.</p>
        ) : (
          data?.map((data) => (
            <div key={data.id}>
              <Taskcard data={data.job} role={"WORKER"} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appliedtask;
