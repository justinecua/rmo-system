import { useState, useEffect, useCallback } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  GET_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  GET_ARTICLE_DETAILS,
  GET_COLLEGES_URL,
} from "@/api/urls";
import axios from "axios";

import ArticlesTable from "../components/articles/ArticlesTable";
import ArticleDetailsDialog from "../components/articles/ArticleDetailsDialog";
import StatusUpdateDialog from "../components/articles/StatusUpdateDialog";

const RMOStaffArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    totalItems: 0,
    totalPages: 1,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const LS_KEY = "rmoSidebarCollapsed";

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? "false");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const getMediaUrl = (path) => {
    const baseUrl = import.meta.env.VITE_MEDIA_BASE_URL || "";
    return path ? `${baseUrl}${path}` : "";
  };

  const fetchColleges = useCallback(async () => {
    try {
      const { data } = await axios.get(GET_COLLEGES_URL);
      setColleges(data);
    } catch {
      toast.error("Failed to fetch colleges");
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page: pagination.page,
        page_size: pagination.pageSize,
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedCollege) params.college_id = selectedCollege;
      if (selectedStatus) params.status = selectedStatus;

      const response = await axios.get(GET_ARTICLES, { params });

      setArticles(response.data.data);
      setPagination((prev) => ({
        ...prev,
        totalItems: response.data.pagination.total_items,
        totalPages: response.data.pagination.total_pages,
      }));
    } catch {
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.pageSize,
    searchQuery,
    selectedCollege,
    selectedStatus,
  ]);

  const fetchArticleDetails = async (articleId) => {
    try {
      const response = await axios.get(GET_ARTICLE_DETAILS(articleId));
      setSelectedArticle(response.data);
    } catch {
      toast.error("Failed to fetch articles");
    }
  };

  const handleStatusChange = async (articleId, newStatus) => {
    try {
      await axios.patch(UPDATE_ARTICLE_STATUS(articleId), {
        status: newStatus,
      });

      setArticles((prev) =>
        prev.map((article) =>
          article.article_id === articleId
            ? { ...article, status: newStatus }
            : article
        )
      );

      if (selectedArticle) {
        setSelectedArticle({ ...selectedArticle, status: newStatus });
      }

      toast.success(`Article status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update article status");
    } finally {
      setIsApproveDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const resetAndSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchArticles();
  };

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <RMOStaffSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={cn(
          "w-full p-4 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="bg-white p-5 h-full rounded-md">
          <div className="flex justify-between w-full gap-4 mb-3">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800">Articles</h3>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Input
                placeholder="Search by title, author, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") resetAndSearch();
                }}
                className="w-64"
              />

              <Select
                value={selectedStatus ?? "all"}
                onValueChange={(value) =>
                  setSelectedStatus(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCollege ?? "all"}
                onValueChange={(value) =>
                  setSelectedCollege(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Filter by college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {colleges.map((college) => (
                    <SelectItem
                      key={college.college_id}
                      value={college.college_id.toString()}
                    >
                      {college.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={resetAndSearch}>
                Search
              </Button>
            </div>
          </div>

          <ArticlesTable
            loading={loading}
            articles={articles}
            pagination={pagination}
            onPageChange={(page) => setPagination({ ...pagination, page })}
            onViewDetails={async (articleId) => {
              await fetchArticleDetails(articleId);
              setIsViewDialogOpen(true);
            }}
            onReviewStatus={(article) => {
              setSelectedArticle(article);
              setIsApproveDialogOpen(true);
            }}
          />

          <ArticleDetailsDialog
            isOpen={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            article={selectedArticle}
            getMediaUrl={getMediaUrl}
          />

          <StatusUpdateDialog
            isOpen={isApproveDialogOpen}
            onOpenChange={setIsApproveDialogOpen}
            article={selectedArticle}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RMOStaffArticles;
