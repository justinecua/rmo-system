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

const AnnouncementForm = ({
  open,
  onOpenChange,
  title,
  setTitle,
  shortDescription,
  setShortDescription,
  description,
  setDescription,
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
}: any) => {
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const removeCoverPhoto = () => {
    setCoverPhoto(null);
    setPreviewCover(null);
  };

  const removeImageAtIndex = (index: number) => {
    const updatedFiles = [...additionalImages];
    const updatedPreviews = [...previewImages];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setAdditionalImages(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const totalSize =
      files.reduce((acc, file) => acc + file.size, 0) +
      additionalImages.reduce((acc: any, file: any) => acc + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      alert(`Total image size should not exceed ${MAX_TOTAL_SIZE_MB}MB.`);
      return;
    }

    setAdditionalImages((prev: any) => [...prev, ...files]);
    setPreviewImages((prev: any) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Add a title, short summary, and optional images.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Short Description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-40 resize-none"
          />

          <Button
            onClick={() => coverInputRef.current?.click()}
            variant="outline"
            className="w-full gap-2"
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

          <Button
            onClick={() => imagesInputRef.current?.click()}
            variant="outline"
            className="w-full gap-2"
          >
            <Upload size={16} /> Upload Additional Images
          </Button>
          <input
            type="file"
            ref={imagesInputRef}
            className="hidden"
            onChange={handleAdditionalImagesChange}
            accept="image/*"
            multiple
          />

          <div className="mt-2 grid grid-cols-3 gap-3">
            {previewImages.map((img: string, i: number) => (
              <div
                key={i}
                className="relative h-32 border rounded-md overflow-hidden"
              >
                <img src={img} className="w-full h-full object-cover" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeImageAtIndex(i)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !title || !description}
          >
            {isSubmitting ? "Creating..." : "Create Announcement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementForm;
