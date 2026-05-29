import Profiledashboard from "@/components/dashboard/Profiledashboard";
import Navbar from "@/components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
    return null; // or a loading spinner
  }
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
