import {
  Calendar,
  MoreHorizontal,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const AnnouncementCard = ({
  announcement,
  onDelete,
  onReadMore,
}: {
  announcement: any;
  onDelete: (id: number) => void;
  onReadMore: (announcement: any) => void;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const coverPhoto = announcement.photos?.find((p) => p.is_cover)?.image;
  const additionalImages =
    announcement.photos?.filter((p) => !p.is_cover)?.map((p) => p.image) || [];

  const mediaSectionHeight = additionalImages.length > 0 ? "h-40" : "h-85";

  return (
    <>
      <div className="group relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {/* Floating action button */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-white dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[120px] shadow-xl rounded-xl"
            >
              <DropdownMenuItem
                className="text-sm px-3 py-2 rounded-lg text-red-500"
                onClick={() => onDelete(announcement.announcement_id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className={`relative ${mediaSectionHeight} overflow-hidden`}>
          {coverPhoto ? (
            <>
              <img
                src={`${backendUrl}${coverPhoto}`}
                alt="Cover"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-gray-300 dark:text-gray-600" />
            </div>
          )}

          {/* Date badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-xs">
              <Calendar
                size={14}
                className="text-gray-500 dark:text-gray-400"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {format(new Date(announcement.date_posted), "MMMM d yyyy")}
              </span>
            </div>
          </div>
        </div>

        {additionalImages.length > 0 && (
          <div
            className={`mt-2 ${
              additionalImages.length === 1 ? "" : "grid grid-cols-3 gap-2"
            } p-2`}
          >
            {additionalImages.slice(0, 3).map((img, idx) => {
              const isLastVisible = idx === 2 && additionalImages.length > 3;
              const remainingCount = additionalImages.length - 3;

              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 ${
                    additionalImages.length === 1
                      ? "w-full h-40"
                      : "aspect-square"
                  }`}
                >
                  <img
                    src={`${backendUrl}${img}`}
                    alt={`Additional ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {isLastVisible && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-medium">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Content section */}
        <div className="flex-1 flex flex-col p-5">
          <div className="mb-1">
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
              {announcement?.title}
            </h3>
          </div>

          <div className="flex-1 space-y-3">
            <p className="mt-1 text-gray-600 line-clamp-2">
              {announcement?.short_description}
            </p>

            <button
              onClick={() => onReadMore(announcement)}
              className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read more
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementCard;
