import {
  Box,
  BriefcaseBusiness,
  BrushCleaning,
  HandHelping,
  PaintBucket,
  ToolCase,
  Truck,
} from "lucide-react";

const Category = () => {
  const jobList = [
    {
      name: "Assembly",
      icon: <Box />,
    },
    {
      name: "Cleaning",
      icon: <BrushCleaning />,
    },
    { name: "Moving", icon: <Truck /> },
    { name: "Home Repair", icon: <ToolCase /> },
    { name: "Outdoor Help", icon: <HandHelping /> },
    { name: "Painting", icon: <PaintBucket /> },
    { name: "Mounting", icon: <BriefcaseBusiness /> },
  ];
  return (
    <div className="pt-4 max-w-6xl m-auto">
      <div className="flex justify-between flex-wrap items-center gap-6">
        {jobList.map((job, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 transform transition-transform duration-300 hover:scale-105 hover:ease-in-out cursor-pointer hover:bg-green-50 rounded-lg"
          >
            <div className="text-4xl mb-4 bg-green-50 p-4 rounded-full">
              {job.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-500">{job.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
