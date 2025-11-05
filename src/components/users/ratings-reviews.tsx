import { Review } from "@/types/response";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import placeholder from "../../../public/assets/icons/individual_icon.png";

interface Props {
  reviews: Review[];
}

const RatingsReviewComponent: FC<Props> = ({ reviews }) => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  return (
    <div className="my-6">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="text-[24px] font-semibold">Ratings & Reviews</div>
        <div
          onClick={() => router.push(`/users/${id}/reviews`)}
          className="text-sm font-normal text-primary cursor-pointer hover:underline"
        >
          See All
        </div>
      </div>

      <div className="flex flex-wrap my-8 gap-y-8 gap-x-8">
        {reviews?.length > 0 ? (
          reviews?.map((item: Review, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 md:basis-1/3 md:max-w-[30.33%] border-b border-b-grey-10 border-dashed pb-2"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="relative aspect-square w-[22px] h-[22px] rounded-full overflow-hidden">
                      <Image
                        src={item?.reviewerProfile || placeholder}
                        fill
                        className="object-cover"
                        alt="Reviewer"
                      />
                    </div>
                    <div className="text-md font-medium">
                      {item?.reviewerName}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <FaStar size={18} className="text-yellow-500" />
                    <div className="text-[16px] font-semibold">
                      {item?.stars}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-grey-100">{item?.message}</div>
            </div>
          ))
        ) : (
          <p className="text-grey-60 text-sm">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RatingsReviewComponent;
