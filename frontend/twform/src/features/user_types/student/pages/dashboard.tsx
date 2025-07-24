import Sidebar from "@/sidebar/sidebar";
import { useState } from "react";

const StudentDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="p-4 flex-1 transition-all duration-300">
        <div className="bg-white p-5 h-full rounded-md">
          <div>
            <h3 className="text-md">Dashboard</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
