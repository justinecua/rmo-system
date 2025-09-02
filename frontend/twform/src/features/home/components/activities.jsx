import { useState } from "react";
import ActivityDetailsDialog from "@/features/user_types/rmo_staff/components/activities/activityDetailsDialog";
import PaginationControls from "@/features/components/paginationControls";

const HomeActivities = ({
  activities,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const backendUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes || "00"} ${
      hour >= 12 ? "PM" : "AM"
    }`;
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 mx-auto">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Activities
        </h2>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="w-full sm:w-auto"
          />
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12 sm:py-16 text-gray-500">
          <p>No upcoming activities scheduled</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {activities.map((activity) => (
            <div
              key={activity.activity_id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
            >
              <div className="h-40 sm:h-48 overflow-hidden relative">
                {activity.photos[0] && (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={`${backendUrl}${activity.photos[0].image}`}
                      alt={activity.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                )}
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-900/90 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                  {formatDate(activity.scheduled_date)}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-3 sm:mb-4 flex-grow">
                  {activity.short_description || activity.description}
                </p>

                <div className="space-y-2 sm:space-y-3 text-sm text-gray-700 mb-4 sm:mb-5">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="mt-0.5">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">{activity.venue}</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="mt-0.5">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      {formatTime(activity.start_time)} –{" "}
                      {formatTime(activity.end_time)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(activity)}
                  className="mt-auto w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>View Details</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ActivityDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={selectedActivity}
        backendUrl={backendUrl}
        formatDate={formatDate}
        formatTime={formatTime}
      />
    </div>
  );
};

export default HomeActivities;
