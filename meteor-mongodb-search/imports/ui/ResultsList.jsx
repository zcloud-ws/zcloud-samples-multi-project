import React from 'react';
import { ResultCard } from './ResultCard.jsx';

export const ResultsList = ({ results = [], loading = false, emptyMessage = "No results found" }) => {
  if (!results || results.length === 0) {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {emptyMessage}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try searching with different terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {results.length} {results.length === 1 ? 'result found' : 'results found'}
        </span>
        {loading && (
          <div className="flex items-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
            Searching...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <ResultCard key={result._id || index} result={result} />
        ))}
      </div>
    </div>
  );
};
