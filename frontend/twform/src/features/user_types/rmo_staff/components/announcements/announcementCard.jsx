import { Calendar, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const AnnouncementCard = ({ announcement, onDelete, onReadMore }) => {
  const backendUrl = import.meta.env.VITE_BACKEND;

  const coverPhoto = announcement.photos?.find((p) => p.is_cover)?.image;
  const additionalImages =
    announcement.photos?.filter((p) => !p.is_cover)?.map((p) => p.image) || [];

  const hasAdditionalImages = additionalImages.length > 0;
  const mediaSectionHeight = hasAdditionalImages ? "h-62" : "h-85";

  return (
    <div className="break-inside-avoid group relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {onDelete && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[120px] rounded-xl"
            >
              <DropdownMenuItem
                className="text-sm text-red-500"
                onClick={() => onDelete(announcement.announcement_id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* MEDIA */}
      <div className={`relative ${mediaSectionHeight} overflow-hidden`}>
        {coverPhoto ? (
          <>
            <img
              src={`${backendUrl}${coverPhoto}`}
              alt="Cover"
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                hasAdditionalImages ? "h-[250px]" : "h-full"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <ImageIcon className="h-10 w-10 text-gray-400" />
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full">
            <Calendar size={14} />
            <span className="text-xs">
              {format(new Date(announcement.date_posted), "MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* THUMBNAILS */}
      {hasAdditionalImages && (
        <div className="mt-2 grid grid-cols-3 gap-2 p-2">
          {additionalImages.slice(0, 3).map((img, idx) => {
            const isLast = idx === 2 && additionalImages.length > 3;
            const remaining = additionalImages.length - 3;

            return (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-lg border"
              >
                <img
                  src={`${backendUrl}${img}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-medium">
                    +{remaining}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-xl font-semibold line-clamp-1">
          {announcement.title}
        </h3>

        <p className="mt-2 text-gray-600 line-clamp-2">
          {announcement.short_description}
        </p>

        <button
          onClick={() => onReadMore(announcement)}
          className="mt-4 inline-flex items-center text-indigo-600 font-medium"
        >
          Read more →
        </button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
