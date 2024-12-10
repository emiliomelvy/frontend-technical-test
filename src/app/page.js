import React from "react";
import { Search } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            New York Times Article Search
          </h1>
          <p className="text-gray-600">Explore the latest news and insights</p>
        </div>

        <form className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
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

            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
              bg-blue-500 text-white rounded-full p-2 
              hover:bg-blue-600 transition duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
