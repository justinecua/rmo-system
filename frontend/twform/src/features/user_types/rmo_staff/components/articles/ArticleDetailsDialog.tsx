import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2 } from "lucide-react";
import type { Article } from "./types/types";

interface ArticleDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
  getMediaUrl: (path: string) => string;
  isLoading?: boolean;
}

const ArticleDetailsDialog = ({
  isOpen,
  onOpenChange,
  article,
  getMediaUrl,
  isLoading = false,
}: ArticleDetailsDialogProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50vw] max-h-[90vh] overflow-y-auto rounded-lg border bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Article Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : article ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900">
                {article.title}
              </h3>
              {article.college?.name && (
                <p className="text-sm text-gray-600">{article.college.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-700">Authors</h4>
                <p className="text-sm text-gray-800">
                  {article.authors.join(", ")}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-700">Emails</h4>
                <p className="text-sm text-gray-800">
                  {article.emails.join(", ")}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-700">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-gray-50"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-700">Abstract</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded">
                {article.abstract}
              </p>
            </div>

            {article.articleFiles && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-700">PDF File</h4>
                <a
                  href={`${backendUrl}${getMediaUrl(
                    article.articleFiles[0]?.pdf_path
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  View PDF Document
                </a>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 space-y-1">
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <Badge
                variant={
                  article.status === "approved"
                    ? "success"
                    : article.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {article.status}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No article details available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailsDialog;
