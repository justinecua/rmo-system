import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface AnnouncementDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAnnouncement: any;
  backendUrl: string;
}

export const AnnouncementDetailDialog = ({
  open,
  onOpenChange,
  selectedAnnouncement,
  backendUrl,
}: AnnouncementDetailDialogProps) => {
  if (!selectedAnnouncement) return null;

  const coverPhoto = selectedAnnouncement.photos.find((p) => p.is_cover);
  const galleryPhotos = selectedAnnouncement.photos.filter((p) => !p.is_cover);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[70vw] h-[90vh] rounded-md p-0">
        <ScrollArea className="h-full w-full overflow-y-auto p-5">
          {/* Cover Photo */}
          {coverPhoto && (
            <div className="relative w-full mb-5">
              <img
                src={`${backendUrl}${coverPhoto.image}`}
                alt="announcement cover"
                className="w-full max-h-[400px] object-cover rounded"
              />
            </div>
          )}

          {/* Title and Date */}
          <DialogHeader className="pt-3">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedAnnouncement.title}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              {format(
                new Date(selectedAnnouncement?.date_posted),
                "MMMM d yyyy"
              )}
            </p>
          </DialogHeader>

          {/* Summary & Description */}
          <div className="mt-4 space-y-6 pb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Summary
              </h3>
              <p className="text-gray-600">
                {selectedAnnouncement.short_description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Details
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {selectedAnnouncement.description}
              </p>
            </div>

            {/* Gallery */}
            {galleryPhotos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryPhotos.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={`${backendUrl}${img.image}`}
                        alt={`Additional image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
