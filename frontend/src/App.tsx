import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import api from "./lib/axios";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Profile from "./pages/Profile";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean | null>(null);

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
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
