import React from "react";

type OverviewCardProps = {
  title: string;
  number: number;
};
const OverviewCard = ({ title, number }: OverviewCardProps) => {
  return (
    <div className="bg-white border rounded shadow p-3 hover:shadow-md hover:-translate-y-1 transition-all">
      <h3 className="text-[15px] text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{number}</p>
    </div>
  );
};

export default OverviewCard;
