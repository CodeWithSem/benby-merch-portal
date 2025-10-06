import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ current_page, total_pages, on_page_change }) => {
  const arrow_btn_classes = `
    flex items-center justify-center w-9 h-9 
    border border-gray-300 rounded-md 
    hover:bg-gray-100 
    disabled:text-gray-300 disabled:border-gray-200 disabled:bg-transparent
  `;

  const getPageNumbers = () => {
    const pages = [];

    if (total_pages <= 7) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, current_page - 2);
      let end = Math.min(total_pages - 1, current_page + 2);

      if (current_page <= 3) {
        start = 2;
        end = 5;
      } else if (current_page >= total_pages - 2) {
        start = total_pages - 4;
        end = total_pages - 1;
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < total_pages - 1) pages.push("...");
      pages.push(total_pages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className="flex md:justify-end justify-center items-center gap-1 px-4 py-3"
      style={{ userSelect: "none" }}
    >
      {/* Prev */}
      <button
        onClick={() => on_page_change(current_page - 1)}
        disabled={current_page === 1}
        className={arrow_btn_classes}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Numbers + Ellipsis */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="w-9 h-9 flex items-center justify-center text-gray-500 text-sm select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => on_page_change(page)}
            className={`w-9 h-9 rounded-md text-sm 
              ${
                current_page === page
                  ? "bg-sky-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => on_page_change(current_page + 1)}
        disabled={current_page === total_pages}
        className={arrow_btn_classes}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
