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
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[80vw] max-h-[95vh] h-full w-full p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Close Button - Mobile */}

        {/* Left - Image Section */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
          {currentImage ? (
            <>
              <img
                src={`${backendUrl}${currentImage}`}
                alt="Main"
                className="max-w-full max-h-full object-contain rounded"
              />
              {photos.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 w-2 rounded-full ${
                        i === currentIndex ? "bg-gray-700" : "bg-gray-400"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400 dark:text-gray-500">No image</div>
          )}

          {photos.length > 1 && (
            <>
              <Button
                onClick={prev}
                variant="ghost"
                size="icon"
                className="absolute left-2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 h-10 w-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={next}
                variant="ghost"
                size="icon"
                className="absolute right-2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 h-10 w-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Right - Details Section */}
        <div className="w-full md:w-1/2 h-[calc(60vh-53px)] md:h-full border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 relative">
          {/* Close Button - Desktop */}

          <ScrollArea className="h-full w-full p-4 md:p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl sm:text-2xl">
                {selectedAnnouncement.title}
              </DialogTitle>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {format(
                  new Date(selectedAnnouncement.date_posted),
                  "MMMM d, yyyy"
                )}
              </p>
            </DialogHeader>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {selectedAnnouncement.short_description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Details
                </h3>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm sm:text-base">
                  {selectedAnnouncement.description}
                </p>
              </div>

              {photos.length > 1 && (
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm sm:text-base">
                    Other Photos
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2">
                    {photos.map((p: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`rounded overflow-hidden border-2 aspect-square transition-all ${
                          i === currentIndex
                            ? "border-blue-500 dark:border-blue-400 scale-95"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <img
                          src={`${backendUrl}${p.image}`}
                          alt={`Thumb ${i + 1}`}
                          className="object-cover w-full h-full"
                          loading="lazy"
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
