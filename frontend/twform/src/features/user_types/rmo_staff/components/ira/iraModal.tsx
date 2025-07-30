import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { UPLOAD_RESOURCE } from "@/api/urls";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";

const IRAModal = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [rationale, setRationale] = useState("");
  const [roleOfRMO, setRoleOfRMO] = useState("");
  const [objectives, setObjectives] = useState("");
  const [updateProcess, setUpdateProcess] = useState("");
  const [frameworkDescription, setFrameworkDescription] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!title.trim() || !rationale.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("cover_image", coverImage);
    formData.append("rationale", rationale);
    formData.append("role_of_rmo", roleOfRMO);
    formData.append("objectives", objectives);
    formData.append("update_process", updateProcess);
    formData.append("framework_description", frameworkDescription);

    try {
      setIsUploading(true);
      await axios.post(UPLOAD_RESOURCE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Agenda uploaded successfully!");
      setOpen(false);
      resetFields();
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetFields = () => {
    setTitle("");
    setCoverImage(null);
    setRationale("");
    setRoleOfRMO("");
    setObjectives("");
    setUpdateProcess("");
    setFrameworkDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add Institutional Research Agenda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
          <Textarea
            placeholder="Rationale"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
          />
          <Textarea
            placeholder="Role of RMO"
            value={roleOfRMO}
            onChange={(e) => setRoleOfRMO(e.target.value)}
          />
          <Textarea
            placeholder="Objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
          />
          <Textarea
            placeholder="Update Process"
            value={updateProcess}
            onChange={(e) => setUpdateProcess(e.target.value)}
          />
          <Textarea
            placeholder="Framework Description"
            value={frameworkDescription}
            onChange={(e) => setFrameworkDescription(e.target.value)}
          />

          <Button
            onClick={handleUpload}
            className="w-full rounded-md py-2 font-medium flex items-center justify-center gap-2"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Agenda"}
            {!isUploading && <UploadCloud className="w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IRAModal;
