import { useState } from "react";
import { toast } from "sonner";
import { FileText, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEL_RESOURCES } from "@/api/urls";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";

const ResourceCard = ({ forms, onDelete, showDelete = true }) => {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id) => {
    setResourceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!resourceToDelete) return;

    try {
      setIsDeleting(true);
      const res = await fetch(DEL_RESOURCES(resourceToDelete), {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Resource deleted successfully");
        onDelete(resourceToDelete);
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to delete resource");
      }
    } catch (err) {
      toast.error("Network error occurred");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setResourceToDelete(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!forms || forms.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No resources available
        </p>
      </div>
    );
  }

  return (
    <>
      {forms.map((form) => {
        const fullLink = `${backendUrl}${form.file_url}`;
        const fileType = form.file_url.split(".").pop().toUpperCase();

        return (
          <div
            key={form.resource_id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <a
              href={fullLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-40 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-gray-700 dark:to-gray-800"
            >
              <div className="rounded-lg bg-white/90 p-3 shadow-sm backdrop-blur-sm dark:bg-gray-900/90">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900/90 dark:text-gray-300">
                {fileType}
              </span>
            </a>

            <div className="flex flex-1 flex-col p-4">
              <div className="mb-3 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  {form.title}
                </h3>
                {form.subject && (
                  <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {form.subject}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatFileSize(form.size)}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-2 sm:h-auto sm:w-auto sm:px-3"
                    onClick={() => window.open(fullLink, "_blank")}
                  >
                    <span className="sr-only sm:not-sr-only sm:mr-2">Open</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  {showDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-2 sm:h-auto sm:w-auto sm:px-3"
                      onClick={() => handleDeleteClick(form.resource_id)}
                    >
                      <span>Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Delete Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteConfirmed={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ResourceCard;
