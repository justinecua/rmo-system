import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/features/user_types/rmo_staff/components/articles/ArticleCard";
import SubmitArticleDialog from "@/features/user_types/rmo_staff/components/articles/SubmitArticleDialog";
import axios from "axios";
import { GET_APPROVED_ARTICLES, GET_COLLEGES_URL } from "@/api/urls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HomeArticles = () => {
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    searchQuery: "",
    expandedArticle: null,
  });

  const [articleDialogOpen, setArticleDialogOpen] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.department]);

  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        setIsLoadingArticles(true);

        const params: Record<string, any> = {
          page: currentPage,
          page_size: 15,
        };

        if (filters.searchQuery.trim()) {
          params.search = filters.searchQuery.trim();
        }

        if (filters.department) {
          const selectedCollege = colleges.find(
            (c) => c.name === filters.department
          );
          if (selectedCollege) {
            params.college_id = selectedCollege.college_id;
          }
        }

        const res = await axios.get(GET_APPROVED_ARTICLES, { params });
        setArticles(res.data.data);
        setTotalArticles(res.data.pagination.total_items);
        setTotalPages(res.data.pagination.total_pages);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchApprovedArticles();
  }, [currentPage, filters.searchQuery, filters.department]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(GET_COLLEGES_URL);
        setColleges(res.data);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      }
    };

    fetchColleges();
  }, []);

  const filteredArticles = articles.filter((article) => {
    return (
      (filters.department === "" ||
        article.college?.name === filters.department) &&
      (filters.searchQuery === "" ||
        article.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        article.abstract
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        article.authors
          .join(", ")
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <SubmitArticleDialog
        open={articleDialogOpen}
        onOpenChange={setArticleDialogOpen}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-3 flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Articles
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Discover and explore academic publications across disciplines
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto bg-white rounded-xl shadow-xs border border-gray-200 text-gray px-4 sm:px-5 hover:shadow-md hover:bg-white transition-all duration-300"
              onClick={() => setArticleDialogOpen(true)}
            >
              Submit Article
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 mb-6 p-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="relative md:col-span-8 lg:col-span-9">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or keywords..."
                className="py-2 sm:py-3 pl-10 pr-4 w-full rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none"
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
              />
            </div>

            <div className="relative md:col-span-4 lg:col-span-3 flex justify-center items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left "
                  >
                    <span className="truncate">
                      {filters.department || "All Colleges"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
                  <DropdownMenuItem
                    onClick={() => setFilters({ ...filters, department: "" })}
                  >
                    All Colleges
                  </DropdownMenuItem>
                  {colleges.map((college: any) => (
                    <DropdownMenuItem
                      key={college.college_id}
                      onClick={() =>
                        setFilters({ ...filters, department: college.name })
                      }
                    >
                      {college.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Result Count and Pagination */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">
              {totalArticles} {totalArticles === 1 ? "article" : "articles"}{" "}
              found
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-24"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-24"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
                <span className="text-sm text-gray-700 whitespace-nowrap">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Articles List */}
        {isLoadingArticles ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 min-h-[50vh] flex justify-center items-center flex-col text-center p-6">
            <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
              No publications found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeArticles;
