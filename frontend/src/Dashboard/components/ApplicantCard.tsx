import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Wallet } from "lucide-react";
import type { ApplicationType } from "./TaskDetail";

type ApplicantCardProps = {
  data: ApplicationType;
};

export default function ApplicantCard({ data }: ApplicantCardProps) {
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
        <p className="text-sm text-muted-foreground">
          {data.applicant.bio || "No bio provided"}
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wallet size={16} />
            NPR {data?.proposedPrice}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {/* {new Date(application.appliedAt).toLocaleDateString()} */}
            16 nov
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button size="sm">Accept</Button>

          <Button size="sm" variant="destructive">
            Reject
          </Button>

          <Button size="sm" variant="outline">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
