"use client";

import Ratings from "@/components/companies/ratings";
import backButton from "../../../public/assets/icons/back-arrow.png";
import Image from "next/image";
import React from "react";
import Reviews from "@/components/companies/reviews";

// Dummy data
const dummyResponse = {
  avgRating: "4.8",
  ratings: {
    "5": 78,
    "4": 15,
    "3": 5,
    "2": 1,
    "1": 1,
  },
  reviews: {
    reviews: [
      {
        id: 1,
        stars: 5,
        message: "Outstanding service! The team was professional and on time.",
      },
      {
        id: 2,
        stars: 4,
        message: "Good experience overall. Minor delay in setup.",
      },
      {
        id: 3,
        stars: 5,
        message: "Highly recommend. Best crew we've worked with.",
      },
      {
        id: 4,
        stars: 5,
        message: "Flawless execution. Will book again for next event.",
      },
      {
        id: 5,
        stars: 3,
        message: "Average. Communication could be improved.",
      },
      {
        id: 6,
        stars: 5,
        message: "Perfect from start to finish. Thank you!",
      },
    ],
    meta: { total: 100 },
  },
};

const ReviewsView = () => {
  const response = dummyResponse;

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-5 mb-6">
        <div className="hover:bg-gray-100 mt-5 rounded-full cursor-pointer">
          <Image
            src={backButton}
            alt="back"
            width={34}
            height={34}
            className="w-[34px] h-[34px]"
          />
        </div>
        <h1 className="text-2xl md:text-3xl mt-5 font-semibold">
          All Ratings and Reviews
        </h1>
      </div>

      <div className="space-y-6">
        <Ratings avgRating={response.avgRating} ratingData={response.ratings} />
        <Reviews
          reviews={response.reviews.reviews}
          total={response.reviews.meta.total}
        />
      </div>
    </div>
  );
};

export default ReviewsView;
