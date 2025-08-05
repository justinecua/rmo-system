import {
  Calendar,
  MoreHorizontal,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";
import PaginationControls from "@/features/components/paginationControls";
import AnnouncementCard from "@/features/user_types/rmo_staff/components/announcements/announcementCard";
import { useState } from "react";
import { AnnouncementDetailDialog } from "@/features/user_types/rmo_staff/components/announcements/announcementDetailDialog";

const HomeAnnouncements = ({
  announcements,
  currentPage,
  totalPages,
  setCurrentPage,
  loadingAnnouncements,
}: {
  announcements: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  loadingAnnouncements: boolean;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND;

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleReadMore = (announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailDialogOpen(true);
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Latest Announcements
        </h2>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="w-full sm:w-auto"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loadingAnnouncements ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12 sm:py-16">
            No announcements available at the moment.
          </div>
        ) : (
          announcements.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              announcement={announcement}
              onReadMore={handleReadMore}
            />
          ))
        )}
      </div>

      <AnnouncementDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        selectedAnnouncement={selectedAnnouncement}
        backendUrl={backendUrl}
      />
    </>
  );
};

export default HomeAnnouncements;
