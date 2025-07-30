import Sidebar from "@/sidebar/sidebar";
import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import IRAModal from "../components/ira/iraModal";

const RMOStaffIRA = () => {
  const LS_KEY = "rmoSidebarCollapsed";
  const [openModal, setIsOpenModal] = useState(false);

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
        <div className="bg-white p-5 h-full rounded-md flex w-full justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Institutional Research Agenda
            </h3>
          </div>
          <Button onClick={() => setIsOpenModal(true)} className="gap-2">
            <PlusCircle size={16} />
            Add Agenda
          </Button>
        </div>
      </div>
      <IRAModal open={openModal} setOpen={setIsOpenModal} />
    </div>
  );
};

export default RMOStaffIRA;
