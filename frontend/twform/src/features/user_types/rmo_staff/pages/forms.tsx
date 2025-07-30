import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";
import PaginationControls from "@/features/components/paginationControls";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle } from "lucide-react";
import ResourceModal from "../components/resources/ResourceModal";
import axios from "axios";
import { GET_RESOURCES } from "@/api/urls";
import ResourceCard from "@/features/home/components/resources/resourcesCard";

const RMOStaffResources = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const [resources, setResources] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const fetchResources = async () => {
    try {
      const res = await axios.get(GET_RESOURCES);
      console.log(res);
      setResources(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      setResources([]);
    }
  };

  useEffect(() => {
    if (!openModal) fetchResources();
  }, [openModal]);

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
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Resources</h3>

            <Button onClick={() => setIsOpenModal(true)} className="gap-2">
              <PlusCircle size={16} />
              Add File
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ResourceCard forms={resources} />
          </div>
        </div>
      </div>

      <ResourceModal open={openModal} setOpen={setIsOpenModal} />
    </div>
  );
};

export default RMOStaffResources;
