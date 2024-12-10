"use client";

import React, { useState, useRef } from "react";
import { Search, Clock, User, X } from "lucide-react";

const ArticleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchContainerRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentPage(1);

    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&page=${
          currentPage - 1
        }&api-key=kWGGmq4PRGvIkkLsWcJFzKc4d2zobs7s`
      );
      const data = await response.json();
      setArticles(data.response.docs);

      if (searchContainerRef.current) {
        searchContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (multimedia) => {
    const image = multimedia?.find((media) => media.subtype === "xlarge");
    return image ? `https://static01.nyt.com/${image.url}` : null;
  };

  return (
    <div
      ref={searchContainerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            New York Times Article Search
          </h1>
          <p className="text-gray-600">Explore the latest news and insights</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition duration-300 shadow-sm text-gray-700"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 
              text-gray-400 transition-all duration-300 
              group-focus-within:text-blue-500"
              size={22}
            />
            {searchQuery && (
              <X
                className="absolute right-20 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-red-500 cursor-pointer transition duration-300"
                size={22}
              />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
              bg-blue-500 text-white rounded-full p-2 
              hover:bg-blue-600 transition duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : "Search"}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center animate-pulse text-gray-600 py-8">
            Searching articles...
          </div>
        )}

        {articles.length > 0 && (
          <>
            <div className="grid gap-6 mb-6">
              {articles.map((article, index) => {
                const imageUrl = getImageUrl(article.multimedia);
                return (
                  <div
                    key={index}
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
                    <div>
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
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
