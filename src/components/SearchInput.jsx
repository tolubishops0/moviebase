import React from "react";

function SearchInput({ setSearchkey, searchMovies, isDarkMode }) {
  return (
    <div className="py-2 flex items-center justify-center gap-3 flex-col md:flex-row md:justify-between md:py-3 md:px-3 md:items-center">
      <div className="text-sm md:text-lg font-semibold italic text-center">
        ThE mOvIe BaSe
      </div>

      <form onSubmit={searchMovies}>
        <div
          className={`${
            isDarkMode ? "border-[white]" : "border-[#201E20] "
          } flex border-2 rounded`}
        >
          <input
            onChange={(event) => setSearchkey(event.target.value)}
            type="text"
            className={`${
              isDarkMode
                ? "bg-[#201E20] placeholder:text-[white]"
                : "bg-[#c9c3c3] placeholder:text-[#201E20]"
            } placeholder:text-sm p-1 sm:px-4 sm:py-2 rounded-sm focus:outline-0`}
            placeholder="Search..."
          />
          <button
            className={`${
              isDarkMode ? "border-[white]" : "border-[#201E20] "
            } flex items-center justify-center px-4 border-l`}
          >
            {/* <button className="flex items-center justify-center px-4 border-l"> */}
            <svg
              className="w-6 h-4 md:h-6 "
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
