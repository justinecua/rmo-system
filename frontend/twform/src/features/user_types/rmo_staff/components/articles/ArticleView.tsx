import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, Download } from "lucide-react";
import axios from "axios";
import { GET_RELATED_ARTICLES, GET_ARTICLE_DETAILS } from "@/api/urls";
import ArticleCard from "./ArticleCard";
import { Button } from "@/components/ui/button";
import HomeHeroSection from "@/features/home/components/heroSection";
import cover from "../../../../../assets/images/cover.jpg";
import HomeHeader from "@/features/home/components/header";
import HomeFooter from "@/features/home/components/footer";
import NoArticleFoundPage from "@/features/errors/NoArticleFoundPage";

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("articles");
  const [selectedAgenda, setSelectedAgenda] = useState("institutional");
  const [isScrolled, setIsScrolled] = useState(false);

  const [article, setArticle] = useState(location.state?.article || null);
  const [articleLoading, setArticleLoading] = useState(
    !location.state?.article
  );

  const [relatedArticles, setRelatedArticles] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 350, behavior: "smooth" });
  }, [article]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        // no need for !article
        setArticleLoading(true);
        try {
          const res = await axios.get(GET_ARTICLE_DETAILS(id));
          console.log("From article details:", res);
          setArticle(res.data);
        } catch (err) {
          console.error("Failed to fetch article:", err);
        } finally {
          setArticleLoading(false);
        }
      }
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!article?.article_id) {
        setRelatedArticles([]);
        return;
      }
      setRelatedLoading(true);
      try {
        const res = await axios.get(GET_RELATED_ARTICLES(article.article_id));
        setRelatedArticles(res.data || []);
      } catch (err) {
        console.error("Failed to fetch related articles:", err);
      } finally {
        setRelatedLoading(false);
      }
    };
    fetchRelated();
  }, [article]);

  const images = { researchHero: cover };

  if (!article && !articleLoading) {
    return <NoArticleFoundPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeroSection images={images} />
      <HomeHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAgenda={selectedAgenda}
        setSelectedAgenda={setSelectedAgenda}
        isScrolled={isScrolled}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate("/", { state: { activeTab: "articles" } })}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Articles</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                  {article?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">Authors:</span>
                    <span>{article?.authors.join(", ")}</span>
                  </div>
                  {article?.college?.name && (
                    <div className="flex items-center">
                      <span className="font-medium">College:</span>
                      <span>{article?.college.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-gray-600 text-sm tracking-wider -mt-3">
                  <span>ISSN 1656-8117</span>
                </div>
              </div>
              {(article?.pdf_url || article?.articleFiles?.[0]?.pdf_path) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    const pdfLink =
                      article?.pdf_url ||
                      `${import.meta.env.VITE_API_BASE_URL}${
                        article?.articleFiles[0].pdf_path
                      }`;

                    window.open(pdfLink, "_blank");
                  }}
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm">PDF</span>
                </Button>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {article?.keywords.map((keyword: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Abstract
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {article?.abstract}
              </p>
            </div>

            {article?.sections?.map((section: any, index: number) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {section?.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section?.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-100 animate-pulse rounded-xl"
                />
              ))
            ) : relatedArticles.length > 0 ? (
              relatedArticles.map((relatedArticle: any) => (
                <ArticleCard
                  key={relatedArticle.article_id}
                  article={relatedArticle}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-8">
                No related articles found.
              </p>
            )}
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default ArticleView;
