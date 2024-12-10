import React from "react";
import { Clock, User } from "lucide-react";

const ArticleCard = ({ article, formatDate, getImageUrl }) => {
  const imageUrl = getImageUrl(article.multimedia);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 
      transition transform hover:-translate-y-2 hover:shadow-lg 
      duration-300 border border-gray-100"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Article"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {article.byline?.original || "New York Times"}
      </h2>
      <p className="text-gray-600 mb-3 line-clamp-2">
        {article.abstract || article.snippet}
      </p>
      <div className="flex items-center text-gray-500 text-sm space-x-4">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{formatDate(article.pub_date)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <User size={16} />
          <span>{article.source}</span>
        </div>
      </div>
      <a
        href={article.web_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-blue-600 
        hover:text-blue-800 transition duration-300"
      >
        Read Full Article →
      </a>
    </div>
  );
};

export default ArticleCard;
