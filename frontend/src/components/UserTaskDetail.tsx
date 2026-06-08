import api from "@/lib/axios";
import type { Tasktype } from "@/pages/Tasks";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { BookmarkIcon, MessageCircle } from "lucide-react";
import type { RootState } from "store/store";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Field } from "./ui/field";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Footer from "./Footer";

const UserTaskDetail = () => {
  const { id } = useParams();
  const [proposedPrice, setProposedPrice] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery<Tasktype>({
    queryKey: ["taskdetail", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data.data;
    },
  });

  const applyApplication = useMutation({
    mutationFn: async () => {
      // if (!proposedPrice || Number(proposedPrice) <= 0) {
      //   toast.error("Please enter a valid offer");
      //   return;
      // }
      const res = await api.post(`/applications/${id}`, {
        proposedPrice: Number(proposedPrice),
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Applied successfully");
      // navigate("/my-applications");
    },
    onError: () => {
      toast.error("Error applying for this task");
    },
  });

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return toast.error("Please login to apply for this task");
    }
    if (hasApplied) {
      return toast.error("You have already applied for this task");
    }
    applyApplication.mutate();
  };

  const hasApplied = Boolean(
    data?.applications?.find(
      (application) => application.workerId === user?.id,
    ),
  );

  if (isError) {
    return toast.error("Error");
  }

  return (
    <div>
      <Navbar />
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
      ) : (
        <div className="max-w-7xl mx-auto p-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_350px] gap-8">
            {/* Left Content */}
            <div>
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">{data?.title}</h1>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <p className="font-medium">{data?.status}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Start Date
                    </p>
                    <p className="font-medium">{data?.startDate}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">End Date</p>
                    <p className="font-medium">{data?.endDate}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Urgency</p>
                    <p className="font-medium">{data?.urgency}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Category</p>
                    <p className="font-medium">{data?.category}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Applicants
                    </p>
                    <p className="font-medium">12 Applicants</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10 border-t pt-6">
                <h2 className="text-xl font-semibold">About this task</h2>

                <p className="mt-4 text-muted-foreground leading-7 whitespace-pre-line">
                  {data?.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="flex items-center gap-2 border border-[#1B7B6F] text-[#1B7B6F] px-5 py-2 rounded-md font-medium hover:bg-[#1B7B6F] hover:text-white transition">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>

                <button className="flex items-center gap-2 border border-[#1B7B6F] text-[#1B7B6F] px-5 py-2 rounded-md font-medium hover:bg-[#1B7B6F] hover:text-white transition">
                  <BookmarkIcon className="w-5 h-5" />
                  Save Task
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div>
              <div className="sticky top-24">
                <div className="bg-white border rounded-lg shadow-md border-t-4 border-t-[#1B7B6F] p-6">
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <h2 className="text-4xl font-bold mt-1">$140</h2>

                  {user?.role !== "TASKER" && (
                    <>
                      <Field className="mt-4">
                        <Label className="text-sm text-gray-500 text-center">
                          Make an offer
                        </Label>
                        <Input
                          placeholder="Enter your proposed price"
                          value={proposedPrice}
                          onChange={(e) => setProposedPrice(e.target.value)}
                        />
                      </Field>

                      <button
                        disabled={hasApplied}
                        className="w-full mt-6 bg-[#1B7B6F] text-white py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleApply}
                      >
                        {hasApplied ? "Already Applied" : "Apply for this Task"}
                      </button>
                    </>
                  )}

                  <div className="mt-6 space-y-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span>{data?.status}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Category</span>
                      <span>{data?.category}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Urgency</span>
                      <span>{data?.urgency}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Applicants</span>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Sidebar */}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserTaskDetail;
