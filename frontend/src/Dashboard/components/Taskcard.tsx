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

type TaskCardProps =
  | {
      role: "TASKER";
      data: Task;
    }
  | {
      role: "WORKER";
      data: WorkerApplicationType;
    };

const Taskcard = ({ data, role }: TaskCardProps) => {
  console.log("Worker data", data);
  const task = role === "WORKER" ? data.job : data;

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 hover:shadow-md hover:shadow-[#1B7B6F] transition-all hover:-translate-y-1 duration-200 ease-in-out ">
      {role === "TASKER" && (
        <>
          <h2 className="text-lg font-semibold mb-2">{task?.title}</h2>
          <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
            {task?.description}
          </p>
          <div className="grid grid-cols-3 gap-3">
            <p className="text-sm text-gray-500">Status: {task?.status}</p>
            <p className="text-sm text-gray-500">Budget: ${task?.budget}</p>
            <p className="text-sm text-gray-500">
              Start Date: {task?.startDate}
            </p>
            <p className="text-sm text-gray-500">Urgency: {task?.urgency}</p>
            <p className="text-sm text-gray-500">End Date: {task?.endDate}</p>
            <p className="text-sm text-gray-500">Category: {task?.category}</p>
          </div>
        </>
      )}

      {role === "WORKER" && (
        <>
          <h2 className="text-lg font-semibold mb-2">{data?.title}</h2>
          <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
            {data?.description}
          </p>
          <div className="grid grid-cols-3 gap-3">
            <p className="text-sm text-gray-500">Status: {data?.status}</p>
            <p className="text-sm text-gray-500">Budget: ${data?.budget}</p>
            <p className="text-sm text-gray-500">
              Start Date: {data?.startDate}
            </p>
            <p className="text-sm text-gray-500">Urgency: {data?.urgency}</p>
            <p className="text-sm text-gray-500">End Date: {data?.endDate}</p>
            <p className="text-sm text-gray-500">Category: {data?.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status: {data?.status}</p>
            <p className="text-sm text-gray-500">
              Offered Price: ${data?.proposedPrice}
            </p>
          </div>
        </>
      )}
      {/* <div className="flex items-center gap-x-4 mt-4">
        <button className="border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded-md hover:scale-105 duration-200 transition-all">
          Edit
        </button>
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:scale-105 duration-200 transition-all">
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default Taskcard;
