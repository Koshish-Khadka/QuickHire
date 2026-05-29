import AppliedTaskCard from "../AppliedTaskCard";


const AppliedTask = () => {
  return (
    <div className="border p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Applied jobs</h2>
      <p className="text-gray-600 mb-6">
        Track the status of all your job applications.
      </p>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>Pending</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>Completed</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-md">
          <p className="text-2xl font-bold">3</p>
          <p>Total Applied</p>
        </div>{" "}
        <div className="bg-red-50 p-6 rounded-md">
          <p className="text-2xl font-bold">1</p>
          <p>rejected</p>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <>
              <AppliedTaskCard />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedTask;
