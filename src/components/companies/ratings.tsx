"use client";

import React from "react";
import { FaStar } from "react-icons/fa6";

interface RatingData {
  [key: string]: number;
}

interface RatingsProps {
  ratingData: RatingData;
  avgRating: string;
}

const Ratings: React.FC<RatingsProps> = ({ ratingData, avgRating }) => {
  const totalRatings = Object.values(ratingData).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className={`w-full border border-grey-20 p-4 bg-white rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-primary font-bold">Ratings</h2>
        <div className="flex items-center gap-1">
          <FaStar size={18} className="text-yellow-500" />
          <div className="text-[16px] font-semibold">{avgRating}</div>
        </div>
      </div>

      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = ratingData[stars.toString()] || 0;
          const percentage =
            totalRatings > 0 ? (count / totalRatings) * 100 : 0;

          return (
            <div key={stars} className="flex items-center">
              <span className="w-8 text-sm font-medium text-gray-700">
                {stars}.0
              </span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-sm text-gray-600 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ratings;
