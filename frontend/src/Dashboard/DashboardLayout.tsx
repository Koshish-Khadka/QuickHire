import { Outlet } from "react-router-dom";
import DashNav from "./DashNav";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-64 right-0 z-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-2 bg-white shadow">
        <DashNav />
      </div>
      <div className="flex flex-1">
        <aside className="fixed top-0 left-0 md:w-64 w-16 h-screen border-r border-gray-300 bg-white">
          <Sidebar />
        </aside>
        <main className="flex-1 h-screen ml-16 md:ml-64 p-8 bg-gray-50 overflow-auto pt-18">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
