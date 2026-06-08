import type { Tasktype } from "@/pages/Tasks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Taskcard = ({ data }: { data: Tasktype }) => {
  return (
    <div className="shadow-md p-4 rounded-md transition-all hover:scale-101 hover:shadow-lg duration-200">
      <div className="flex gap-x-3 justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-bold">
              {data?.user?.firstName + data?.user?.lastName}
            </p>
          </div>
          <h4>{data?.title}</h4>
          <div className="space-x-3 ">
            <Badge variant="destructive">{data?.urgency}</Badge>
            <Badge variant="outline">{data?.status}</Badge>
          </div>
          <p className="text-[14px] text-gray-500 max-w-2xl line-clamp-2">
            {data?.description}
          </p>
          <div className="flex space-x-3">
            <div>
              location:{" "}
              <span className="text-sm text-gray-500">{data?.location}</span>
            </div>
            <div>
              budget:{" "}
              <span className="text-sm text-gray-500">${data?.budget}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-4">
          <div className="text-end">
            <p className="text-xl font-bold text-[#1B7B6F]">${data?.budget}</p>
            <p className="text-sm text-gray-500">Fixed price</p>
          </div>
          <button className="w-full text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded-md font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Taskcard;
