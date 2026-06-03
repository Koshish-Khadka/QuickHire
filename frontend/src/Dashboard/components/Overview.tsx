import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store/store";
import OverviewCard from "./OverviewCard";

const Overview = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const workerOverview = [
    {
      title: "Applied Tasks",
      number: 10,
    },
    {
      title: "Completed Tasks",
      number: 5,
    },
    {
      title: "Messages",
      number: 3,
    },
    {
      title: "Reviews",
      number: 4,
    },
  ];

  const TaskerOverview = [
    {
      title: "Posted Tasks",
      number: 20,
    },
    {
      title: "Active Tasks",
      number: 8,
    },
    {
      title: "Messages",
      number: 5,
    },
    {
      title: "Reviews",
      number: 6,
    },
  ];

  const overviewData =
    user?.role === "WORKER" ? workerOverview : TaskerOverview;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Overview</h2>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {overviewData.map((item, index) => (
          <OverviewCard key={index} title={item.title} number={item.number} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
