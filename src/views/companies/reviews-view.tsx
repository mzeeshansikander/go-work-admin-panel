"use client";

import Ratings from "@/components/companies/ratings";
import backButton from "../../../public/assets/icons/back-arrow.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Reviews from "@/components/companies/reviews";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanyReviews } from "@/services/react-query/companies/get-company-ratings";
import LoaderOverlay from "@/components/common/page-loader.component";

const ReviewsView = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [currentPage]);

  const { data, isPending } = useGetCompanyReviews(
    id,
    currentPage * rowsPerPage,
    rowsPerPage
  );

  const reviewData = data?.[0];

  if (isPending) {
    return <LoaderOverlay />;
  }

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex items-center gap-5 mb-6">
        <div
          onClick={() => {
            router.back();
          }}
          className="mt-5 rounded-full cursor-pointer"
        >
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
        <Ratings
          avgRating={reviewData?.avgRating || " "}
          ratingData={reviewData?.ratings || {}}
        />
        <Reviews
          reviews={reviewData?.reviews?.reviews || []}
          total={reviewData?.reviews?.meta?.total || 0}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default ReviewsView;
