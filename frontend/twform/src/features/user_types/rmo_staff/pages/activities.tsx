import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import ActivitiesForm from "../components/activities/activitiesForm";
import {
  ACTIVITIES_URL,
  GET_ACTIVITIES_URL,
  DELETE_ACTIVITY_URL,
} from "@/api/urls";
import { toast } from "sonner";
import PaginationControls from "@/features/components/paginationControls";
import ActivityCard from "../components/activities/activityCard";
import ActivityDetailsDialog from "../components/activities/activityDetailsDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const MAX_TOTAL_SIZE_MB = 10;

const RMOStaffActivities = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MAX_TOTAL_SIZE_MB = 40;

  const [activities, setActivities] = useState<any[]>([]);
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("scheduled_date", date);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("venue", venue);

    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    }

    additionalImages.forEach((image) => {
      formData.append("additional_images", image);
    });

    try {
      const response = await fetch(`${ACTIVITIES_URL}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast("Activity Created!");
        setIsOpenModal(false);
        fetchActivities(currentPage);
      } else {
        const errorData = await response.json();
        toast("Failed to create Activity");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingId) return;
    setIsLoading(true);

    try {
      const response = await fetch(DELETE_ACTIVITY_URL(deletingId), {
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
      await fetchActivities();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async (page = 1) => {
    setLoadingActivities(true);
    try {
      const response = await fetch(`${GET_ACTIVITIES_URL}?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch activities.");

      const data = await response.json();
      setActivities(data.results);
      setTotalPages(Math.ceil(data.count / 8));
      setCurrentPage(page);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast("Failed to load activities.");
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const openActivityDetails = (activity: any) => {
    setSelectedActivity(activity);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            This will permanently delete the announcement.
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirmed}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <RMOStaffSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <ActivitiesForm
        open={openModal}
        onOpenChange={setIsOpenModal}
        title={title}
        setTitle={setTitle}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        venue={venue}
        setVenue={setVenue}
        setEndTime={setEndTime}
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

      {/* Activity Details Modal */}
      <ActivityDetailsDialog
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        activity={selectedActivity}
        backendUrl={backendUrl}
        formatDate={formatDate}
        formatTime={formatTime}
      />

      <div
        className={cn(
          "w-full p-4 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="bg-white p-5 min-h-screen rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
            <div>
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
            <Button onClick={() => setIsOpenModal(true)} className="gap-2">
              <PlusCircle size={16} />
              Schedule Activity
            </Button>
          </div>

          {loadingActivities ? (
            <div className="col-span-full flex justify-center items-center my-90">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <ActivityCard
                    key={activity.activity_id}
                    activity={activity}
                    onViewDetails={openActivityDetails}
                    onDelete={(id) => {
                      setShowDeleteDialog(true);
                      setDeletingId(id);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center my-90">
              <div className="text-gray-400 mb-4">
                No activities scheduled yet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RMOStaffActivities;
