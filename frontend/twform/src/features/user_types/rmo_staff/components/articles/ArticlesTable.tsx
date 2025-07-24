import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, FileText, CheckCircle2 } from "lucide-react";
import type { Article, Pagination } from "./types/types";

interface ArticlesTableProps {
  loading: boolean;
  articles: Article[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onViewDetails: (articleId: number) => void;
  onReviewStatus: (article: Article) => void;
}

const ArticlesTable = ({
  loading,
  articles,
  pagination,
  onPageChange,
  onViewDetails,
  onReviewStatus,
}: ArticlesTableProps) => {
  if (loading) {
    return (
      <div className="col-span-full flex justify-center items-center my-90">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.article_id} className="hover:bg-gray-50">
                <TableCell className="">
                  <div className="line-clamp-2">
                    {article.title.length > 100
                      ? article.title.slice(0, 100) + "..."
                      : article.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="line-clamp-1">
                    {article.authors.join(", ").length > 80
                      ? article.authors.join(", ").slice(0, 80) + "..."
                      : article.authors.join(", ")}
                  </div>
                </TableCell>
                <TableCell>{article.college?.code}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewDetails(article.article_id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onReviewStatus(article)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Review Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {articles.length} of {pagination.totalItems} articles
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ArticlesTable;
