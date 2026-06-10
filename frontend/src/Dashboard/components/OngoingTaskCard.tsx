import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Wallet, User } from "lucide-react";
import type { WorkerApplicationType } from "./Sections";
import { useSelector } from "react-redux";
import type { RootState } from "store/store";

type OngoingTaskCardProps = {
  data: WorkerApplicationType;
};

export default function OngoingTaskCard({ data }: OngoingTaskCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Card className="w-full hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{data?.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{data?.category}</p>
        </div>

        <Badge className="bg-green-600">{data?.status}</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Worker */}
        <div className="flex items-center gap-2 text-sm">
          <User size={16} />
          <span>
            {/* {task.worker.firstName} {task.worker.lastName} */}
            {data?.selectedWorker?.firstName} {data?.selectedWorker?.lastName}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} />
          <span>{data?.location}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 text-sm">
          <Wallet size={16} />
          <span>
            Final Price:
            <strong className="ml-1">NPR {data?.budget}</strong>
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={16} />
          <span>
            {new Date(data?.startDate).toLocaleDateString()} -{" "}
            {new Date(data?.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>60%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="w-[60%] h-2 bg-[#1B7B6F] rounded-full" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button size="sm">View Details</Button>
          <Button size="sm" variant="outline">
            Message
          </Button>
          {user?.role === "WORKER" && (
            <Button size="sm" variant="secondary">
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
