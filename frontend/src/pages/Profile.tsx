import Profiledashboard from "@/components/dashboard/Profiledashboard";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Profiledashboard>
          <Outlet />
        </Profiledashboard>
      </div>
    </div>
  );
};

export default Profile;
