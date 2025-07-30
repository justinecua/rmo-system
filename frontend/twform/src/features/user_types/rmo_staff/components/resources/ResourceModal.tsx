import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { UPLOAD_RESOURCE } from "@/api/urls";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";

const ResourceModal = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setIsUploading(true);
      await axios.post(UPLOAD_RESOURCE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resource uploaded successfully!");
      setOpen(false);
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Upload Resource
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              placeholder="Enter resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const droppedFile = e.dataTransfer.files?.[0];
                  if (droppedFile) {
                    if (droppedFile.size > MAX_FILE_SIZE_BYTES) {
                      toast.error(
                        `File must be less than ${MAX_FILE_SIZE_MB}MB`
                      );
                      return;
                    }
                    setFile(droppedFile);
                  }
                }}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
              >
                {file ? (
                  <div className="flex flex-col items-center p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {file.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-4">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOCX, PPTX (Max 10MB)
                    </p>
                  </div>
                )}
                <Input
                  type="file"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
                        toast.error(
                          `File must be less than ${MAX_FILE_SIZE_MB}MB`
                        );
                        return;
                      }
                      setFile(selectedFile);
                    }
                  }}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </label>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            className="w-full rounded-md py-2 font-medium"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Resource"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceModal;
