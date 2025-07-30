import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/features/user_types/rmo_staff/components/articles/ArticleCard";
import SubmitArticleDialog from "@/features/user_types/rmo_staff/components/articles/SubmitArticleDialog";
import axios from "axios";
import { GET_APPROVED_ARTICLES, GET_COLLEGES_URL } from "@/api/urls";

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

      <div className="mx-auto px-4">
        {/* Header */}
        <div className="mb-3 flex w-full justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles</h1>
            <p className="text-gray-600">
              Discover and explore academic publications across disciplines
            </p>
          </div>
          <div>
            <Button
              className="bg-white rounded-xl shadow-xs border border-gray-200 text-gray px-5 hover:shadow-md hover:bg-white transition-all duration-300"
              onClick={() => setArticleDialogOpen(true)}
            >
              Submit Article
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="relative  md:col-span-3">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or keywords..."
                className="py-3 pl-14 w-full rounded-lg border-none focus-none outline-none"
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
              />
            </div>

            <div className="relative col-span-1 md:col-span-3 flex outline-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none bg-white"
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
              >
                <option value="">All Colleges</option>
                {colleges.map((college: any) => (
                  <option key={college.college_id} value={college?.name}>
                    {college?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">
              {totalArticles} {totalArticles === 1 ? "article" : "articles"}{" "}
              found
            </p>
          </div>

          <div className="flex items-center justify-center">
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Articles List */}
        {isLoadingArticles ? (
          <div className="col-span-full flex justify-center items-center my-90">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 my-90">
            No announcements available at the moment.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 h-[50vh] flex justify-center items-center flex-col text-center">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No publications found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeArticles;
