"use client";

import { CompanyReview } from "@/types/response";
import React from "react";
import { FaStar } from "react-icons/fa6";
import TableFoot from "../common/table-footer";

interface ReviewsProps {
  reviews: CompanyReview[];
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  total,
  setCurrentPage,
  setRowsPerPage,
  currentPage,
  rowsPerPage,
}) => {
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

      <div className="w-full flex justify-end mt-10">
        <TableFoot
          currentPage={currentPage}
          rowsOption={[5, 10, 20]}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          total={total ?? 10}
        />
      </div>
    </div>
  );
};

export default Reviews;
