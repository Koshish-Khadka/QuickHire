import { useQuery } from "@tanstack/react-query";
import type { Task } from "../pages/DashboardTask";
import OngoingTaskCard from "./OngoingTaskCard";
import api from "@/lib/axios";
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

const Sections = () => {
  const { data, isLoading, isError } = useQuery<WorkerApplicationType[]>({
    queryKey: ["appliedTask"],
    queryFn: async () => {
      const res = await api.get("/applications/workers/applications");
      return res.data.data;
    },
  });

  const filterData = data?.filter((items) => items.status !== "PENDING");

  if (isError) {
    return <div>Error fetching applied tasks.</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">OnGoing task</h2>
      <div className="my-4">
        <p className="text-gray-400">No ongoing task yet.</p>
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
        ) : (
          <OngoingTaskCard task={filterData?.[0]} />
        )}
      </div>
    </div>
  );
};

export default Sections;
