import {
  Calendar,
  MoreHorizontal,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";
import PaginationControls from "@/features/components/paginationControls";

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

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Latest Announcements
      </h2>
      <div>
        {totalPages > 1 && (
          /* Added pagination conrols so that numerous number of pages wont appear and just a few page will appear*/
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {loadingAnnouncements ? (
        <div className="col-span-full flex justify-center items-center my-90">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 h-[60vh] flex justify-center items-center">
          No announcements available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => {
            const coverPhoto = announcement?.photos?.find(
              (p) => p.is_cover
            )?.image;
            const additionalImages =
              announcement?.photos
                ?.filter((p) => !p.is_cover)
                ?.map((p) => p.image) || [];

            const mediaSectionHeight =
              additionalImages.length > 0 ? "h-40" : "h-85";

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
              >
                {/* Media Section */}
                <div
                  className={`relative ${mediaSectionHeight} overflow-hidden`}
                >
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

                  {/* Date */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-xs">
                      <Calendar
                        size={14}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {format(
                          new Date(announcement.date_posted),
                          "MMMM d yyyy"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extra Images */}
                {additionalImages.length > 0 && (
                  <div
                    className={`mt-2 ${
                      additionalImages.length === 1
                        ? ""
                        : "grid grid-cols-3 gap-2"
                    } p-2`}
                  >
                    {additionalImages.slice(0, 3).map((img, idx) => {
                      const isLastVisible =
                        idx === 2 && additionalImages.length > 3;
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

                {/* Content */}
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
                    <button className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomeAnnouncements;
