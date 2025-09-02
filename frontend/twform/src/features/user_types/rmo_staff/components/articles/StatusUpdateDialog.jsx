import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StatusUpdateDialog = ({
  isOpen,
  onOpenChange,
  article,
  onStatusChange,
  isLoading = false,
}) => {
  const [actionInProgress, setActionInProgress] = useState(null);

  if (!article) return null;

  const handleStatusChange = async (articleId, newStatus) => {
    setActionInProgress(newStatus);
    try {
      await onStatusChange(articleId, newStatus);
    } finally {
      setActionInProgress(null);
    }
  };

  const isButtonLoading = (status) => isLoading || actionInProgress === status;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg border bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Update Status
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-sm mt-1">
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

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 w-full">
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
