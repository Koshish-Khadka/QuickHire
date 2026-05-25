import Sidebar from "./Sidebar";

const Profiledashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <aside className="sticky w-64 p-4 border-2 border-r-gray-300 min-h-[calc(100vh-80px)]">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Profiledashboard;
