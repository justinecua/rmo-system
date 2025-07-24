import { CalendarDays, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const ActivityCard = ({
  activity,
  onViewDetails,
  onDelete,
}: {
  activity: any;
  onViewDetails: (activity: any) => void;
  onDelete: (id: number) => void;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND;

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

  const coverImage = activity?.photos?.find((p) => p.is_cover)?.image;

  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Dropdown Action */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
              onClick={() => onDelete(activity.activity_id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cover Photo */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            coverImage ? `${backendUrl}${coverImage}` : "/placeholder-image.jpg"
          }
          alt={activity.title}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium text-sm flex items-center gap-1">
              <CalendarDays size={14} />
              {formatDate(activity.scheduled_date)}
            </span>
            <span className="text-white text-xs flex items-center gap-1">
              <Clock size={14} />
              {formatTime(activity.start_time)} -{" "}
              {formatTime(activity.end_time)}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {activity.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {activity.description}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => onViewDetails(activity)}
        >
          View details
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;
