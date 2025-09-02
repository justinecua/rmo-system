import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

const ActivitiesForm = ({
  open,
  onOpenChange,
  title,
  setTitle,
  shortDescription,
  setShortDescription,
  description,
  setDescription,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  venue,
  setVenue,
  coverPhoto,
  setCoverPhoto,
  previewCover,
  setPreviewCover,
  additionalImages,
  setAdditionalImages,
  previewImages,
  setPreviewImages,
  onSubmit,
  isSubmitting,
  MAX_TOTAL_SIZE_MB,
}) => {
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const removeCoverPhoto = () => {
    setCoverPhoto(null);
    setPreviewCover(null);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
          <DialogDescription>
            Add a title, short summary for your activity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Activity Title
            </label>
            <Input
              className="mt-2"
              placeholder="Enter activity title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Venue</label>
            <Input
              className="mt-2"
              placeholder="Enter venue location"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Activity Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-2"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                End Time
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Activity Description
            </label>
            <Textarea
              placeholder="Enter detailed description of the activity"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 resize-none mt-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Cover Photo
            </label>
            <Button
              onClick={() => coverInputRef.current?.click()}
              variant="outline"
              className="w-full mt-2 gap-2"
            >
              <Upload size={16} /> Upload Cover Photo
            </Button>
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              onChange={handleCoverChange}
              accept="image/*"
            />
          </div>

          {previewCover && (
            <div className="relative mt-2 w-full h-48 border rounded-md overflow-hidden">
              <img
                src={previewCover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={removeCoverPhoto}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !title || !description}
          >
            {isSubmitting ? "Creating..." : "Create Activity"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivitiesForm;
