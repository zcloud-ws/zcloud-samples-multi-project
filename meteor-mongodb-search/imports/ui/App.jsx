import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { SearchBar } from './SearchBar.jsx';
import { ResultsList } from './ResultsList.jsx';
import { Footer } from './Footer.jsx';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  // Debounce search - wait 300ms after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Perform search using Meteor method
  const performSearch = async (term) => {
    setLoading(true);
    try {
      const searchResults = await Meteor.callAsync('listings.search', term);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Airbnb Listings Search
            </h1>
            <p className="text-gray-600">
              Search and discover unique places to stay
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Demo data from Airbnb sample database
            </div>
          </div>

          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by name, description, or summary..."
            />
          </div>

          <ResultsList
            results={results}
            loading={loading}
            emptyMessage="No listings found"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
