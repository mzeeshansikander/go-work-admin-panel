import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useGetUserReviews } from "@/services/react-query/users/get-all-user-reviews";
import { useParams, useRouter } from "next/navigation";
import LoaderOverlay from "../common/page-loader.component";
import TableFoot from "../common/table-footer";

const RatingsReviewComponent: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [currentPage]);

  const { data, isPending } = useGetUserReviews(
    id,
    currentPage * rowsPerPage,
    rowsPerPage
  );

  const reviewData = data?.[0];

  if (isPending) {
    return <LoaderOverlay />;
  }

  return (
    <div className="my-6">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="text-[24px] font-semibold">Ratings & Reviews</div>
      </div>

      <div className="flex flex-wrap my-8 gap-y-8 gap-x-8">
        {reviewData && reviewData?.reviews?.reviews?.length > 0 ? (
          reviewData?.reviews?.reviews?.map((item, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 md:basis-1/3 md:max-w-[30.33%] border-b border-b-grey-10 border-dashed pb-2"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center gap-1">
                    <FaStar size={18} className="text-yellow-500" />
                    <div className="text-[16px] font-semibold">
                      {item.stars}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-grey-100">{item.message}</div>
            </div>
          ))
        ) : (
          <p className="text-grey-60 text-sm">No reviews yet.</p>
        )}
      </div>
      <div className="w-full flex justify-end">
        <TableFoot
          currentPage={currentPage}
          rowsOption={[5, 10, 20]}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          total={reviewData?.reviews?.meta?.total ?? 10}
        />
      </div>
    </div>
  );
};

export default RatingsReviewComponent;
