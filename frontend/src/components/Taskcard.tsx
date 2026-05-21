import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Taskcard = () => {
  return (
    <div className="border p-4 rounded-md">
      <div className="flex gap-x-3 justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-bold">Koshish Khadka</p>
          </div>
          <h4>Deep cleaning — 3BR apartment</h4>
          <div className="space-x-3 ">
            <Badge variant="destructive">High urgency</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <p className="text-[14px] text-gray-500 max-w-2xl line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            placeat non? Debitis, libero? Ducimus repellat numquam tempore
            eligendi quisquam! Eveniet veritatis, neque exercitationem
            perferendis necessitatibus earum eum unde maiores ad!
          </p>
          <div className="flex space-x-3">
            <div>
              location:{" "}
              <span className="text-sm text-gray-500">New York, NY</span>
            </div>
            <div>
              budget: <span className="text-sm text-gray-500">$150</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-4">
          <div className="text-end">
            <p className="text-xl font-bold text-[#1B7B6F]">$200</p>
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
