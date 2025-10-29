"use client";

import React from "react";
import { FaStar } from "react-icons/fa6";

interface Review {
  id: number;
  stars: number;
  message: string;
}

interface ReviewsProps {
  reviews: Review[];
  total: number;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, total }) => {
  const hasMoreReviews = reviews.length < total;

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-8">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-2 md:basis-1/3 md:max-w-[30.33%] border-b border-b-grey-10 pb-4"
            >
              <div className="flex items-center gap-3">
                <FaStar size={18} className="text-yellow-500" />
                <div className="text-[16px] font-semibold">{review.stars}</div>
              </div>
              <p className="text-sm text-gray-700">{review.message}</p>
            </div>
          ))
        )}
      </div>

      {hasMoreReviews && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
