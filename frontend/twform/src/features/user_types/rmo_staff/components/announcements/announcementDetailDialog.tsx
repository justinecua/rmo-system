import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = selectedAnnouncement?.photos || [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedAnnouncement]);

  if (!selectedAnnouncement) return null;

  const currentImage = photos[currentIndex]?.image;

  const next = () => setCurrentIndex((i) => (i + 1) % photos.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] h-[90vh] p-0 flex flex-col md:flex-row">
        {/* Close */}
        <Button
          onClick={() => onOpenChange(false)}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/80"
        >
          <X />
        </Button>

        {/* Left - Image */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center relative">
          {currentImage ? (
            <img
              src={`${backendUrl}${currentImage}`}
              alt="Main"
              className="max-w-full max-h-full object-contain rounded"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}

          {photos.length > 1 && (
            <>
              <Button
                onClick={prev}
                variant="ghost"
                size="icon"
                className="absolute left-4 bg-white/80"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={next}
                variant="ghost"
                size="icon"
                className="absolute right-4 bg-white/80"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </div>

        {/* Right - Details */}
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200">
          <ScrollArea className="h-full w-full p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedAnnouncement.title}
              </DialogTitle>
              <p className="text-sm text-gray-500">
                {format(
                  new Date(selectedAnnouncement.date_posted),
                  "MMMM d yyyy"
                )}
              </p>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Summary</h3>
                <p className="text-gray-600">
                  {selectedAnnouncement.short_description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Details</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedAnnouncement.description}
                </p>
              </div>

              {photos.length > 1 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Other Photos
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {photos.map((p: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`rounded overflow-hidden border-2 aspect-square ${
                          i === currentIndex
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={`${backendUrl}${p.image}`}
                          alt={`Thumb ${i + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
