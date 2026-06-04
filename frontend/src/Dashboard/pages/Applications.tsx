import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Applications = () => {
  const { data } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await api.get("/applications/workers/allApplications");
      return res.data.data;
    },
  });

  console.log("All applications", data);
  return <div>Applications</div>;
};

export default Applications;
