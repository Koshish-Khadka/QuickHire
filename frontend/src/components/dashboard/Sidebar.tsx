import { CheckCheck, LaptopIcon, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "store/store";

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const pathname = location.pathname;
  const workerLinks = [
    {
      name: "Profile Setup",
      icon: <User className="w-5 h-5" />,
      href: "/profile/profile-setup",
    },
    {
      name: "Applied Tasks",
      icon: <LaptopIcon className="w-5 h-5" />,
      href: "/profile/applied-tasks",
    },
    {
      name: "Completed Tasks",
      icon: <CheckCheck className="w-5 h-5" />,
      href: "/profile/completed-tasks",
    },
  ];

  const taskerLinks = [
    {
      name: "Post Task",
      icon: <User className="w-5 h-5" />,
      href: "/profile/create-task",
    },
    {
      name: "My Tasks",
      icon: <LaptopIcon className="w-5 h-5" />,
      href: "/profile/my-tasks",
    },
    {
      name: "Applications",
      icon: <CheckCheck className="w-5 h-5" />,
      href: "/profile/applications",
    },
  ];

  const navLinks = user?.role === "WORKER" ? workerLinks : taskerLinks;

  return (
    <>
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] ">
          Navigation
        </p>
      </div>
      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${
              pathname === link.href
                ? "bg-[#10B981] text-black"
                : "text-black hover:bg-[#10B981]/10 hover:text-green-700"
            }`}
          >
            {link.icon}
            <span className="flex-1">{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
