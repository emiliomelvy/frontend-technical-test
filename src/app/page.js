"use client";

import React, { useState, useRef } from "react";
import SearchBar from "@/modules/SearchBar";
import ArticleCard from "@/modules/ArticleCard";
import Pagination from "@/modules/Pagination";

const ArticleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const articlesPerPage = 10;
  const searchContainerRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentPage(1);

    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&fl=abstract,lead_paragraph,source,web_url,snippet,pub_date,byline,multimedia&page=${
          currentPage - 1
        }&api-key=kWGGmq4PRGvIkkLsWcJFzKc4d2zobs7s`
      );
      const data = await response.json();
      setArticles(data.response.docs);
      setTotalHits(data.response.meta.hits);

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

  const handleClearSearch = () => {
    setSearchQuery("");
    setArticles([]);
    setTotalHits(0);
    setCurrentPage(1);
  };

  const handlePageChange = async (newPage) => {
    setIsLoading(true);
    setCurrentPage(newPage);

    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&fl=abstract,lead_paragraph,source,web_url,snippet,pub_date,byline,multimedia&page=${
          newPage - 1
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

  const totalPages = Math.ceil(totalHits / articlesPerPage);

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

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          onSearchSubmit={handleSearch}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="text-center animate-pulse text-gray-600 py-8">
            Searching articles...
          </div>
        )}

        {articles.length > 0 && (
          <>
            <div className="grid gap-6 mb-6">
              {articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  article={article}
                  formatDate={formatDate}
                  getImageUrl={getImageUrl}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <div className="text-center text-gray-500 mt-4">
              Total Results: {totalHits.toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
