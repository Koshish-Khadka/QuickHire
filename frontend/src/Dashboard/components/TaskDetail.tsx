import api from "@/lib/axios";
import type { Tasktype } from "@/pages/Tasks";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Edit2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApplicantCard from "./ApplicantCard";
import { TailSpin } from "react-loader-spinner";

export type ApplicationType = {
  id: string;
  jobId: string;
  proposedPrice: string;
  status: string;
  applicant: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    location: string;
    phoneNumber: string;
    bio: string;
  };
  job: Tasktype;
};

const TaskDetail = () => {
  const { id } = useParams();
  // Get task detail

  const { data, isError, isLoading } = useQuery<Tasktype>({
    queryKey: ["taskdetail", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data.data;
    },
  });
  // get applicants applied for this job

  const {
    data: applications,
    // isLoading: applicationsLoading,
    // isError: applicationsError,
  } = useQuery<ApplicationType[]>({
    queryKey: ["JobApplications", id],
    queryFn: async () => {
      const res = await api.get(`/applications/${id}/applications`);
      return res.data.data;
    },
  });

  if (isError) {
    return toast.error("Error");
  }
  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="1"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-x-4 p-6 relative ">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{data?.title}</h2>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Pencil />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      Edit
                      <DropdownMenuShortcut>
                        <Edit2 />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Delete
                      <DropdownMenuShortcut>
                        <Trash2 />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="space-y-3 mt-2 flex flex-col">
            <p className="text-sm text-gray-500">Budget: ${data?.budget}</p>
            <p className="text-sm text-gray-500">Status: {data?.status}</p>
            <p className="text-sm text-gray-500">
              Start Date: {data?.startDate}
            </p>
            <p className="text-sm text-gray-500">End Date: {data?.endDate}</p>

            <p className="text-sm text-gray-500">Urgency: {data?.urgency}</p>
            <p className="text-sm text-gray-500">Category: {data?.category}</p>
            <p>Applicants: 12</p>
          </div>
          {/* description */}
          <div className="mt-8 border-b-2 border-b-gray-500 pb-4">
            <h3 className="font-semibold border-b-2 border-b-gray-500 pb-4">
              About this task
            </h3>
            <p className="mt-2 text-[14px] text-muted-foreground pt-4">
              {data?.description}
            </p>
            {/* <button className="mt-8 text-sm flex items-center gap-3 border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
              <MessageCircle className="w-5 h-5" /> Message
            </button> */}
          </div>
          {/* Applications */}
          <div className="mt-8 border-b-2 border-b-gray-500 pb-4">
            <h3 className="font-semibold ">Applicants applied for this task</h3>
            {applications?.length === 0 ? (
              <div>
                <p>No applicants applied till now</p>
              </div>
            ) : (
              applications?.map((data) => {
                return (
                  <div className="mt-8 space-y-4">
                    <ApplicantCard data={data} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
