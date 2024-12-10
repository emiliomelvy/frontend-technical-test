import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onSearchSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSearchSubmit} className="mb-8 relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
            onClick={onClearSearch}
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
          {isLoading ? "........" : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
