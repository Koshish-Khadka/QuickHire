import Navbar from "@/components/Navbar";
import Taskcard from "@/components/Taskcard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TaskDetail = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-22 max-w-5xl m-auto">
        <div className="flex gap-x-4 p-6 relative ">
          {/* left side */}
          <div className="flex-1 pr-105">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-[12px] text-muted-foreground">
                    Member since Jan 2024
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex">
                  <Star size={12} />
                  <Star size={12} />
                  <Star size={12} />
                  <Star size={12} />
                  <Star size={12} />
                </div>
                <p className="text-[12px] text-muted-foreground">42 reviews</p>
                <p className="text-[12px] text-muted-foreground">
                  18 jobs posted
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold">
              Deep cleaning — 3BR apartment
            </h2>
            <div className="space-x-3 mt-2">
              <Badge variant="destructive">High urgency</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="default">Open</Badge>
            </div>
            {/* description */}
            <div className="mt-8 border-b-2 border-b-gray-500 pb-4">
              <h3 className="font-semibold border-b-2 border-b-gray-500 pb-4">
                About this task
              </h3>
              <p className="mt-2 text-[14px] text-muted-foreground pt-4">
                I need someone to do a deep cleaning of my 3BR apartment. The
                apartment is about 1000 sq ft and has been vacant for a few
                weeks. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Est debitis quis vitae consequatur omnis harum in culpa impedit
                eligendi aspernatur nobis incidunt sapiente sint iusto, cum
                corporis delectus atque molestias.
              </p>
              <button className="mt-8 text-sm flex items-center gap-3 border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
                <MessageCircle className="w-5 h-5" /> Message
              </button>
            </div>
            {/* Reviews */}
            {/* <div>
              <h3>Reviews</h3>
            </div> */}
            {/* similar jobs */}
            <div className=" p-4">
              <p className="text-xl font-semibold">Similar jobs near you</p>
              {
                <div className="mt-4 flex flex-col gap-y-4 ">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                    <Link to={`/tasks/${index}`}>
                      <Taskcard key={index} />
                    </Link>
                  ))}
                </div>
              }
            </div>
          </div>
          {/* right side */}
          {/* <div className="w-96 h-fit rounded-md p-4 shadow-lg sticky top-24"> */}
          <div className="fixed top-24 right-70 w-96 rounded-md p-4 shadow-lg bg-white">
            <div className="border-b-2 border-b-slate-200 pb-4">
              <p>$200</p>
              <p>Fixed Price or Negotiate. $25/hr</p>
            </div>
            <div className="mt-4 border-b-2 border-b-slate-200 pb-4">
              <p>Start Date: 2026/01/01</p>
              <p>End Date: 2026/01/01</p>
            </div>
            <div className="mt-4 flex flex-col gap-y-4">
              <button className="text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
                Apply Now
              </button>
              <button className="text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
