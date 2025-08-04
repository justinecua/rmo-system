// RMOStaffAnnouncements.tsx
import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnnouncementCard from "../components/announcements/announcementCard";
import AnnouncementForm from "../components/announcements/announcementForm";
import {
  ANNOUNCEMENTS_URL,
  DELETE_ANNOUNCEMENT_URL,
  GET_ANNOUNCEMENTS_URL,
} from "@/api/urls";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import PaginationControls from "@/features/components/paginationControls";
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog";
import { AnnouncementDetailDialog } from "../components/announcements/announcementDetailDialog";

const RMOStaffAnnouncements = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [previewCover, setPreviewCover] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MAX_TOTAL_SIZE_MB = 40;

  const [announcements, setAnnouncements] = useState([]);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND;
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
  const openDeleteDialog = (id: number) => {
    setDeletingId(id);
    setShowDeleteDialog(true);
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setCoverPhoto(null);
    setAdditionalImages([]);
    setPreviewCover(null);
    setPreviewImages([]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("description", description);

    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    }

    additionalImages.forEach((img: File, i: number) => {
      formData.append("additional_images", img);
    });

    try {
      const response = await fetch(ANNOUNCEMENTS_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        toast("Failed to create announcement");
        return;
      }

      await response.json();

      resetForm();
      setIsOpenModal(false);
      toast("Announcement created!");

      await fetchAnnouncements();
    } catch (error) {
      console.error("Submit Error:", error);
      toast("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingId) return;
    setIsLoading(true);

    try {
      const response = await fetch(DELETE_ANNOUNCEMENT_URL(deletingId), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Failed to delete announcement.");
        return;
      }
      setShowDeleteDialog(false);
      setDeletingId(null);
      toast.success("Announcement deleted.");
      await fetchAnnouncements();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnnouncements = async (page = 1) => {
    setLoadingAnnouncements(true);
    try {
      const response = await fetch(`${GET_ANNOUNCEMENTS_URL}?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch announcements.");

      const data = await response.json();
      setAnnouncements(data.results);
      setTotalPages(Math.ceil(data.count / 6));
      setCurrentPage(page);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast("Failed to load announcements.");
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  const handleReadMore = (announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailDialogOpen(true);
  };

  console.log(selectedAnnouncement);

  return (
    <div className="flex w-full bg-[#f5f7fb]">
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        deletingId={deletingId}
        onDeleteConfirmed={handleDeleteConfirmed}
        isLoading={isLoading}
      />

      <AnnouncementDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        selectedAnnouncement={selectedAnnouncement}
        backendUrl={backendUrl}
      />

      <RMOStaffSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <AnnouncementForm
        open={openModal}
        onOpenChange={setIsOpenModal}
        title={title}
        setTitle={setTitle}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        description={description}
        setDescription={setDescription}
        coverPhoto={coverPhoto}
        setCoverPhoto={setCoverPhoto}
        previewCover={previewCover}
        setPreviewCover={setPreviewCover}
        additionalImages={additionalImages}
        setAdditionalImages={setAdditionalImages}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        MAX_TOTAL_SIZE_MB={MAX_TOTAL_SIZE_MB}
      />

      <div
        className={cn(
          "w-full p-4 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="bg-white p-5 min-h-screen rounded-md">
          <div className="flex flex-row flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 min-w-[150px]">
              Announcements
            </h3>

            <div className="flex flex-nowrap items-center gap-3">
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
              <Button
                onClick={() => setIsOpenModal(true)}
                className="gap-2 shrink-0"
              >
                <PlusCircle size={16} />
                <span className="hidden sm:inline">Create Announcement</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </div>
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
                  onDelete={openDeleteDialog}
                  onReadMore={handleReadMore}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMOStaffAnnouncements;
