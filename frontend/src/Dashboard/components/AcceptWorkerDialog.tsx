import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type AcceptWorkerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    title: string;
    budget: number;
    startDate: string;
    endDate: string;
    category: string;
  };
  application: {
    proposedPrice: number;
    appliedAt: string;
    applicant: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      location: string;
    };
  };
  onConfirm: () => void;
};

export default function AcceptWorkerDialog({
  open,
  onOpenChange,
  task,
  application,
  onConfirm,
}: AcceptWorkerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Confirm Worker Assignment
          </DialogTitle>

          <DialogDescription>
            Review all information before assigning this worker.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Task Information
            </h3>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Task Name
                </span>
                <span className="font-medium">
                  {task.title}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Category
                </span>
                <Badge>{task.category}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Budget
                </span>
                <span className="font-semibold">
                  NPR {task.budget}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Start Date
                </span>
                <span>
                  {new Date(
                    task.startDate
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  End Date
                </span>
                <span>
                  {new Date(
                    task.endDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Worker Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Worker Information
            </h3>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Full Name
                </span>
                <span>
                  {application.applicant.firstName}{" "}
                  {application.applicant.lastName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Email
                </span>
                <span>{application.applicant.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Phone
                </span>
                <span>
                  {application.applicant.phoneNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Address
                </span>
                <span>
                  {application.applicant.location}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Assignment Summary
            </h3>

            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <div className="flex justify-between">
                <span>Original Budget</span>
                <span>NPR {task.budget}</span>
              </div>

              <div className="flex justify-between">
                <span>Worker Offer</span>
                <span>
                  NPR {application.proposedPrice}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Applied On</span>
                <span>
                  {new Date(
                    application.appliedAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Final Agreed Price</span>
                <span>
                  NPR {application.proposedPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={onConfirm}>
            Assign Worker
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}