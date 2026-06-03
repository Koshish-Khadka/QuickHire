import { File, LayoutDashboard, LogOut, MessageCircle, Workflow } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      name: "My Tasks",
      path: "my-tasks",
      icon: <Workflow className="w-6 h-6" />,
    },
    {
      name: "Applications",
      path: "applications",
      icon: <File className="w-6 h-6" />,
    },
    {
      name: "Messages",
      path: "messages",
      icon: <MessageCircle className="w-6 h-6" />,
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <div>
        {/* Header */}
        <div className="px-4 py-2 border-b-2 border-b-gray-200 text-center">
          <h2 className="text-base font-bold">Quick Hire</h2>
          <p className="text-gray-500 text-[11px]">Dashboard</p>
        </div>

        {/* Navigation */}
        <div className="mt-4">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === ""}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 transition ${
                  isActive
                    ? "border-r-[6px] bg-indigo-500/10 border-[#1B7B6F] text-[#1B7B6F]"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="mt-auto flex items-center gap-4 px-4 py-3 border-t w-full">
        <LogOut className="w-6 h-6" />
        <span className="md:block hidden">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
