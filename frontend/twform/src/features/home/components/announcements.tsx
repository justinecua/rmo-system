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
      <div className="w-full flex justify-between mb-7">
        <h2 className="text-3xl font-bold text-gray-800">
          Latest Announcements
        </h2>

        {totalPages > 1 && (
          /* Added pagination conrols so that numerous number of pages wont appear and just a few page will appear*/
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loadingAnnouncements ? (
          <div className="col-span-full flex justify-center items-center my-90">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 my-90">
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
