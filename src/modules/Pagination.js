import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 
        rounded-md text-gray-700 hover:bg-gray-50 transition duration-300
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} className="mr-2" /> Previous
      </button>

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 
        rounded-md text-gray-700 hover:bg-gray-50 transition duration-300
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next <ChevronRight size={20} className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
