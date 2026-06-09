import { useQuery } from "@tanstack/react-query";
import Taskcard from "../components/Taskcard";
import api from "@/lib/axios";
import type { Task } from "./DashboardTask";
import { TailSpin } from "react-loader-spinner";

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

  const filterData = data?.filter((items) => items.status !== "APPROVED");

  if (isError) {
    return <div>Error fetching applied tasks.</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Applied Task</h1>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="1"
            />
          </div>
        ) : filterData?.length === 0 ? (
          <p>No applied tasks found.</p>
        ) : (
          filterData?.map((data) => (
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
