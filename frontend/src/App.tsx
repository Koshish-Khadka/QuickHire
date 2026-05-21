import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import api from "./lib/axios";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await api.get("/auth/session");
        console.log("The response", response);
        dispatch(
          setCredentials({
            user: response.data.user,
            token,
          }),
        );
      } catch (error: unknown) {
        console.log(error);
        localStorage.removeItem("token");
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </>
  );
}

export default App;
