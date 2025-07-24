import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarDays, Clock } from "lucide-react";

interface ActivityDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: any;
  backendUrl: string;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
}

const ActivityDetailsDialog = ({
  open,
  onOpenChange,
  activity,
  backendUrl,
  formatDate,
  formatTime,
}: ActivityDetailsDialogProps) => {
  if (!activity) return null;

  const coverImage = activity?.photos?.find((photo) => photo?.is_cover)?.image;
  const galleryPhotos = activity.photos?.filter((photo) => !photo.is_cover);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{activity.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <CalendarDays size={16} />
            {formatDate(activity.scheduled_date)}
            <span className="flex items-center gap-1 ml-2">
              <Clock size={16} />
              {formatTime(activity.start_time)} -{" "}
              {formatTime(activity.end_time)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative h-64 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                coverImage
                  ? `${backendUrl}${coverImage}`
                  : "/placeholder-image.jpg"
              }
              alt={activity.title}
            />
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Description</h4>
            <p className="text-gray-700">{activity.description}</p>
          </div>

          {galleryPhotos && galleryPhotos.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Gallery</h4>
              <div className="grid grid-cols-3 gap-2">
                {galleryPhotos.map((photo: any) => (
                  <div
                    key={photo.activity_photo_id}
                    className="aspect-square overflow-hidden rounded-md"
                  >
                    <img
                      src={`${backendUrl}${photo.image}`}
                      alt="Additional activity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsDialog;
