import { CircleChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "store/store";

const DashNav = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-center py-2 justify-between w-full">
      {" "}
      <p className="font-semibold">
        {user?.firstName} {user?.lastName} {" "}({user?.role})
      </p>
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer transition flex items-center"
      >
        <CircleChevronLeft className="w-4 h-4 inline-block mr-1" />
        View Site
      </Link>
    </div>
  );
};

export default DashNav;
