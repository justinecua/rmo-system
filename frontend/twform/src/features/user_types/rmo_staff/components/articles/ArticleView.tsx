import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  FileText,
  Download,
  Link as LinkIcon,
  User,
  Calendar,
  Book,
} from "lucide-react";

import HomeHeroSection from "@/features/home/components/heroSection";
import cover from "../../../../../assets/images/cover.jpg";
import HomeHeader from "@/features/home/components/header";
import HomeFooter from "@/features/home/components/footer";

const ArticleView = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const location = useLocation();
  const [selectedAgenda, setSelectedAgenda] = useState("institutional");
  const [isScrolled, setIsScrolled] = useState(false);
  const article = location.state?.article;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 350, behavior: "smooth" });
  }, []);

  // Sample images
  const images = {
    researchHero: cover,
  };

  if (!article) {
    return (
      <div className="p-6">
        <p className="text-red-500">No article data provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
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
      <div className="container mx-auto px-4 py-8 ">
        <button
          onClick={() => navigate("/", { state: { activeTab: "articles" } })}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Articles
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Article Header */}
          <div className="px-10 py-4">
            <div className="flex justify-between items-start">
              <div className="mt-6">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <div className="flex flex-wrap items-center gap:1 ">
                  <span className="font-bold italic mr-1">Authors: </span>
                  <span className="flex text-md items-center italic">
                    {article.authors.join(", ")}
                  </span>
                  <span className="font-bold italic ml-3 mr-1">College: </span>
                  <span className="italic flex items-center">
                    {article.college?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-10">
            <div className="mb-4">
              <div className="py-4">
                <h3 className="font-medium mb-4">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword: string, i: number) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                Abstract
              </h2>
              <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {article.abstract}
              </div>
            </div>
            {article.sections?.map((section: any, index: number) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <div className="prose max-w-none text-gray-700">
                  {section.content}
                </div>
              </div>
            ))}

            <div className="mt-5 mb-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                References
              </h3>
              <div className="space-y-2">
                {article.references?.length > 0 ? (
                  article.references.map((ref: string, i: number) => (
                    <p key={i} className="text-sm text-gray-600">
                      [{i + 1}] {ref}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No references available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                    {article.category || "Research"}
                  </span>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {article.title.split(" ").slice(0, 8).join(" ")}{" "}
                    {item !== 1 ? item : ""}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.abstract.split(" ").slice(0, 20).join(" ")}...
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/article/${item}`, { state: { article } })
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default ArticleView;
