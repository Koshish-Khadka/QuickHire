import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/authSlice";
import api from "./lib/axios";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Profile from "./pages/Profile";
import Applications from "./components/dashboard/pages/Applications";
import AppliedTask from "./components/dashboard/pages/AppliedTask";
import CompletedTask from "./components/dashboard/pages/CompletedTask";
import CreateTask from "./components/dashboard/pages/CreateTask";
import Task from "./components/dashboard/pages/Task";
import ProfileSetup from "./components/dashboard/pages/ProfileSetup";
import "./App.css";
import type { RootState } from "store/store";
import Onboarding from "./pages/Onboarding";

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
        <p className="text-lg text-gray-500">Restoring session...</p>
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
        <Route path="/tasks/:id" element={<TaskDetail />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate to="profile-setup" replace />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applied-tasks" element={<AppliedTask />} />
          <Route path="completed-tasks" element={<CompletedTask />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="profile-setup" element={<ProfileSetup />} />
          <Route path="my-tasks" element={<Task />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
