import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/authSlice";
import api from "./lib/axios";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import "./App.css";
import type { RootState } from "store/store";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./pages/ProtectedRoute";
import DashboardLayout from "./Dashboard/DashboardLayout";
import Dashboard from "./Dashboard/pages/Dashboard";
import Applications from "./Dashboard/pages/Applications";
import Messages from "./Dashboard/pages/Messages";
import TaskDetail from "./Dashboard/components/TaskDetail";
import Appliedtask from "./Dashboard/pages/Appliedtask";
import UserTaskDetail from "./components/UserTaskDetail";
import DashboardTask from "./Dashboard/pages/DashboardTask";
import { TailSpin } from "react-loader-spinner";
// import ApplicantcartDetail from "./Dashboard/components/ApplicantcartDetail";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean | null>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await api.get("/auth/session");
        // console.log("The response", response);
        dispatch(
          setCredentials({
            user: response.data.user,
            token,
          }),
        );
      } catch (error: unknown) {
        console.log(error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === "WORKER" && !user.isOnboarded) {
      navigate("/profile-complete");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile-complete" element={<Onboarding />} />
        <Route path="/tasks/:id" element={<UserTaskDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-tasks" element={<DashboardTask />} />
            <Route path="my-tasks/:id" element={<TaskDetail />} />
            <Route path="applications" element={<Applications />} />
  
            <Route path="messages" element={<Messages />} />
            <Route path="applied-tasks" element={<Appliedtask />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
