import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm text-gray-300">
            Developed by
          </span>
          <a
            href="https://www.quave.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/images_logo.svg"
              alt="Quave Cloud"
              className="h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
