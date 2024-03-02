import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // Specify the maximum number of visible pages
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const visiblePageNumbers = (() => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers;
    }

    const firstVisiblePage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const lastVisiblePage = Math.min(
      currentPage + Math.ceil(maxVisiblePages / 2) - 1,
      totalPages
    );

    if (firstVisiblePage > 1) {
      return [
        1,
        null,
        ...pageNumbers.slice(firstVisiblePage, lastVisiblePage + 1),
      ];
    } else {
      return pageNumbers.slice(firstVisiblePage - 1, lastVisiblePage + 1);
    }
  })();

  const handlePageChange = (pageNumber: number | null) => {
    if (pageNumber !== null) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-6 h-6 bg-white text-black rounded-md shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {visiblePageNumbers?.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          className={`flex items-center justify-center w-6 h-6 bg-white border border-gray-300 rounded-md shadow-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 ${
            currentPage === pageNumber
              ? "bg-blue-500 text-black"
              : "text-gray-400"
          }`}
        >
          {pageNumber === null ? "..." : pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-6 h-6 bg-white text-black rounded-md shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
