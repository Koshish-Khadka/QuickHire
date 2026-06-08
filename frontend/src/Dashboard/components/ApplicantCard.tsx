import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Wallet } from "lucide-react";
import type { ApplicationType } from "./TaskDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";

type ApplicantCardProps = {
  data: ApplicationType;
};

export default function ApplicantCard({ data }: ApplicantCardProps) {
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const proposedPrice = Number(data.proposedPrice);
  const budget = Number(data.job.budget);
  const hasValidOffer = proposedPrice > 0 && proposedPrice > budget;
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {data?.applicant.firstName[0]}
              {data?.applicant.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-lg">
              {data?.applicant.firstName} {data?.applicant.lastName}
            </h3>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              {data?.applicant.location}
            </div>
          </div>
        </div>

        <Badge
          variant={
            data.status === "PENDING"
              ? "secondary"
              : data.status === "ACCEPTED"
                ? "default"
                : "destructive"
          }
        >
          {data.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wallet size={16} color="orange" />
            <p>Budget</p>
            {" : "}
            NPR {data?.job.budget}
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} color="green" />
            <p>Offered Price</p>
            {" : "}
            NPR {data?.proposedPrice}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} color="gray" />
            <p>Applied at</p>
            {" : "}
            {/* {new Date(application.appliedAt).toLocaleDateString()} */}
            16 nov
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button size="sm" onClick={() => setOpenAssignDialog(true)}>
            Accept
          </Button>

          <Button size="sm" variant="destructive">
            Reject
          </Button>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader className="border-b-2 border-b-gray-300 pb-2">
                  <DialogTitle>Worker Profile</DialogTitle>
                  <DialogDescription>
                    Below is the full detail of the worker.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="justify-center items-center ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {" "}
                    {data?.applicant.firstName[0]}
                    {data?.applicant.lastName[0]}
                  </h2>
                  <div className="flex gap-4">
                    <p>{data.applicant.location}</p>
                    <p>{data.applicant.email}</p>
                    <p>{data.applicant.phoneNumber}</p>
                  </div>
                  <div>{data.applicant.bio}</div>
                </FieldGroup>
              </DialogContent>
            </form>
          </Dialog>

          {/*  */}
          <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Confirm Worker Assignment</DialogTitle>

                <DialogDescription>
                  Review all details before assigning this worker.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Task Information */}
                <div>
                  <h3 className="font-semibold mb-3">Task Information</h3>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Task Name</span>
                      <span>{data.job.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Budget</span>
                      <span>NPR {data.job.budget}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Start Date</span>
                      <span>
                        {new Date(data.job.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>End Date</span>
                      <span>
                        {new Date(data.job.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Worker Information */}
                <div>
                  <h3 className="font-semibold mb-3">Worker Information</h3>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Name</span>
                      <span>
                        {data.applicant.firstName} {data.applicant.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Email</span>
                      <span>{data.applicant.email}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phone</span>
                      <span>{data.applicant.phoneNumber}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Location</span>
                      <span>{data.applicant.location}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="font-semibold mb-3">Assignment Summary</h3>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Task Budget</span>
                      <span>NPR {data.job.budget}</span>
                    </div>
                    {hasValidOffer && (
                      <div className="flex justify-between">
                        <span>Worker Offer</span>
                        <span>NPR {proposedPrice}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-lg">
                      <span>Final Price</span>
                      <span>NPR {hasValidOffer ? proposedPrice : budget}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setOpenAssignDialog(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => {
                      // call accept mutation here
                      console.log("Assign worker");
                    }}
                  >
                    Assign Worker
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
