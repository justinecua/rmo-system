import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const ArticleCard = ({ article }: { article: any }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/articles/${article?.article_id}`, {
          state: { article },
        })
      }
      className="cursor-pointer bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
            {article?.college?.name}
          </span>
          <span className="text-xs text-gray-500">{article.year}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-blue-600 mb-2 line-clamp-1 font-medium">
          {article.authors?.join(", ")}
        </p>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
          {article.abstract}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.keywords.slice(0, 2).map((keyword: string, i: number) => (
            <span
              key={i}
              className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
