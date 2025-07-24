import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import type { Article } from "./types/types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StatusUpdateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
  onStatusChange: (
    articleId: number,
    newStatus: string
  ) => Promise<void> | void;
  isLoading?: boolean;
}

const StatusUpdateDialog = ({
  isOpen,
  onOpenChange,
  article,
  onStatusChange,
  isLoading = false,
}: StatusUpdateDialogProps) => {
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  if (!article) return null;

  const handleStatusChange = async (articleId: number, newStatus: string) => {
    setActionInProgress(newStatus);
    try {
      await onStatusChange(articleId, newStatus);
    } finally {
      setActionInProgress(null);
    }
  };

  const isButtonLoading = (status: string) =>
    isLoading || actionInProgress === status;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg border bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Update Status
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800 line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Current status:</span>
              <Badge
                variant={
                  article.status === "approved"
                    ? "success"
                    : article.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
                className="capitalize"
              >
                {article.status}
              </Badge>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex w-full gap-1">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() =>
                  handleStatusChange(article.article_id, "approved")
                }
                disabled={isButtonLoading("approved")}
              >
                {isButtonLoading("approved") ? (
                  <>
                    Approving...
                    <Loader2 className="h-4 w-4 ml-1 animate-spin" />
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() =>
                  handleStatusChange(article.article_id, "rejected")
                }
                disabled={isButtonLoading("rejected")}
              >
                {isButtonLoading("rejected") ? (
                  <>
                    Rejecting...
                    <Loader2 className="h-4 w-4 ml-1 animate-spin" />
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Reject
                  </>
                )}
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleStatusChange(article.article_id, "pending")}
              disabled={isButtonLoading("pending")}
            >
              {isButtonLoading("pending") ? (
                <>
                  Resetting...
                  <Loader2 className="h-4 w-4 ml-1 animate-spin" />
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  Reset to Pending
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;
