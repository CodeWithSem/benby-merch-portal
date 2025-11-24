import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

const Pagination = ({
  current_page,
  total_pages,
  on_page_change,
  variant = "compact",
}) => {
  const arrow_btn_classes = `
    flex items-center justify-center w-9 h-8 mx-1
    border border-gray-300 rounded-md 
    hover:bg-gray-100 
    disabled:text-gray-300 disabled:border-gray-200 disabled:bg-transparent outline-none
  `;

  const getPageNumbers = () => {
    const pages = [];

    if (total_pages <= 7) {
      for (let i = 1; i <= total_pages; i++) pages.push(i);
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
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total_pages - 1) pages.push("...");
      pages.push(total_pages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // =============== VARIANT 1: COMPACT ===============
  if (variant === "compact") {
    return (
      <div
        className="flex md:justify-end justify-center items-center gap-1 px-4 py-3 w-full"
        style={{ userSelect: "none" }}
      >
        {/* Previous */}
        <button
          onClick={() => on_page_change(current_page - 1)}
          disabled={current_page === 1}
          className={arrow_btn_classes}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Desktop: numbered pages */}
        <div className="hidden sm:flex items-center justify-center gap-1">
          {pages.map((page, idx) =>
            page === "..." ? (
              <span
                key={idx}
                className="w-9 h-8 flex items-center justify-center text-gray-500 text-sm select-none outline-none"
              >
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => on_page_change(page)}
                className={`min-w-9 h-8 rounded-md text-sm px-2 outline-none ${
                  current_page === page
                    ? "bg-sky-100 text-sky-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile: show Page X of Y */}
        <div className="sm:hidden flex items-center justify-center text-sm text-gray-600 font-medium px-2">
          Page {current_page} of {total_pages}
        </div>

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
  }

  // =============== VARIANT 2: SPREAD ===============
  return (
    <div
      className="flex justify-between items-center w-full px-4 py-3"
      style={{ userSelect: "none" }}
    >
      {/* Previous Button */}
      <Button
        variant="white"
        icon={ChevronLeft}
        icon_position="left"
        on_click={() => on_page_change(current_page - 1)}
        disabled={current_page === 1}
        className="flex items-center"
      >
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Desktop: numbered pages */}
      <div className="hidden sm:flex items-center justify-center gap-1">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="w-9 h-8 flex items-center justify-center text-gray-500 text-sm select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => on_page_change(page)}
              className={`min-w-9 h-8 rounded-md text-sm px-2 outline-none ${
                current_page === page
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Mobile: show "Page X of Y" */}
      <div className="sm:hidden flex items-center justify-center text-sm text-gray-600 font-medium">
        Page {current_page} of {total_pages}
      </div>

      {/* Next Button */}
      <Button
        variant="white"
        icon={ChevronRight}
        icon_position="right"
        on_click={() => on_page_change(current_page + 1)}
        disabled={current_page === total_pages}
        className="flex items-center"
      >
        <span className="hidden sm:inline">Next</span>
      </Button>
    </div>
  );
};

export default Pagination;
