import React from 'react';

export const ResultCard = ({ result }) => {
  const {
    name = 'No title',
    summary = '',
    description = 'No description',
    price,
    score,
    highlights = [],
    images,
    _id
  } = result;

  // Extract image URL from images object
  const imageUrl = images?.picture_url || images?.xl_picture_url || images?.medium_url;

  // Format price - handle both string and number types
  const formatPrice = (priceValue) => {
    if (!priceValue) return null;
    const numPrice = typeof priceValue === 'string' ? parseFloat(priceValue) : priceValue;
    return isNaN(numPrice) ? null : numPrice.toFixed(0);
  };

  const formattedPrice = formatPrice(price);

  // Format score to 1 decimal place
  const formattedScore = score ? score.toFixed(1) : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>

        {summary && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {summary}
          </p>
        )}

        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
        )}

        {highlights && highlights.length > 0 && (
          <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-2">
            <p className="text-xs text-gray-700 line-clamp-2">
              {highlights[0].texts?.map((t, i) => (
                <span
                  key={i}
                  className={t.type === 'hit' ? 'bg-yellow-200 font-semibold' : ''}
                >
                  {t.value}
                </span>
              ))}
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          {formattedPrice && (
            <div className="text-xl font-bold text-indigo-600">
              ${formattedPrice}
              <span className="text-sm font-normal text-gray-500">/night</span>
            </div>
          )}
          {formattedScore && (
            <span className="text-xs text-gray-400">
              score: {formattedScore}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
