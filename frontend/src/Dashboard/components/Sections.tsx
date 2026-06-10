import { useQuery } from "@tanstack/react-query";
import OngoingTaskCard from "./OngoingTaskCard";
import api from "@/lib/axios";
import { TailSpin } from "react-loader-spinner";

export type WorkerApplicationType = {
  id: string;
  location: string;
  title: string;
  status: string;
  budget: string;
  startDate: string;
  endDate: string;
  category: string;
  selectedWorker: {
    firstName: string;
    lastName: string;
  };
  applications: {
    proposedPrice: string;
    status: string;
  };
};

const Sections = () => {
  const { data, isLoading, isError } = useQuery<WorkerApplicationType>({
    queryKey: ["approvedTask"],
    queryFn: async () => {
      const res = await api.get("/jobs/approved");
      return res.data.data;
    },
  });

  if (isError) {
    return <div>Error fetching applied tasks.</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">OnGoing task</h2>
      <div className="my-4">

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
        ) : data ? (
          <OngoingTaskCard data={data} />
        ) : (
          <p className="text-gray-400">No ongoing task yet.</p>
        )}
      </div>
    </div>
  );
};

export default Sections;
