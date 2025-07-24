import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";

const RMOStaffDashboard = () => {
  const LS_KEY = "rmoSidebarCollapsed";

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? "false");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <RMOStaffSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={cn(
          "w-full p-4 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="bg-white p-5 h-full rounded-md">
          <div>
            <h3 className="text-md">Dashboard</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMOStaffDashboard;
