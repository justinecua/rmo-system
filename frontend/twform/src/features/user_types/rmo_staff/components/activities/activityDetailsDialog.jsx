import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ActivityDetailsDialog = ({
  open,
  onOpenChange,
  activity,
  backendUrl,
  formatDate,
  formatTime,
}) => {
  if (!activity) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = activity.photos || [];
  const currentImage = allImages[currentImageIndex]?.image;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[80%] max-w-none md:max-w-6xl p-0 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-gray-100 relative">
          {allImages.length > 0 ? (
            <>
              <img
                src={`${backendUrl}${currentImage}`}
                alt={activity.title}
                className="w-full h-full object-contain"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 md:p-1"
                  >
                    <ChevronLeft className="h-8 w-8 md:h-6 md:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 md:p-1"
                  >
                    <ChevronRight className="h-8 w-8 md:h-6 md:w-6" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No images available
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 h-[60vh] md:h-full overflow-y-auto p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">
              {activity.title}
            </DialogTitle>
            <DialogDescription className="flex flex-col sm:flex-row gap-2 mt-1 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatDate(activity.scheduled_date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {formatTime(activity.start_time)} -{" "}
                {formatTime(activity.end_time)}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {activity.venue && (
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Venue</h4>
                <p className="text-gray-700">{activity.venue}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-lg">Description</h4>
              <p className="text-gray-700 mt-1 whitespace-pre-line text-sm md:text-base">
                {activity.description}
              </p>
            </div>

            {allImages.length > 1 && (
              <div>
                <h4 className="font-semibold text-lg mb-2">Gallery</h4>
                <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-3 gap-2">
                  {allImages.map((photo, index) => (
                    <button
                      key={photo.activity_photo_id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-transparent"
                      } hover:border-gray-300`}
                    >
                      <img
                        src={`${backendUrl}${photo.image}`}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsDialog;
