import React from "react";
import githubLogo from "../assets/github-icon.png";

export default function form({ handleSubmit }) {
  return (
    <div className="flex items-center rounded-full justify-center my-6 md:my-12 px-4">
      <div className="relative w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <img
              className="w-6 h-6 md:w-8 md:h-8"
              src={githubLogo}
              alt="GitHub logo"
            />
          </div>

          <input
            className="w-full py-2 md:py-3 pl-12 pr-20 rounded-full border border-gray-300 bg-amber-50 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="search"
            placeholder="Search GitHub users..."
          />

          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
