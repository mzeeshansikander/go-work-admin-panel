import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";

import reviewer1 from "../../../public/assets/icons/man.svg";
import reviewer2 from "../../../public/assets/icons/man.svg";

interface ReviewItem {
  ratings: {};
  reviewerProfile?: string | StaticImageData;
  reviewerName?: string;
  stars?: number;
  reviewCount?: string;
  message?: string;
}

interface Props {
  ratings_arr?: ReviewItem[];
}

const RatingsReviewComponent: FC<Props> = ({
  ratings_arr = [
    {
      reviewerProfile: reviewer1 || "/reviewer1.jpg",
      reviewerName: "Sarah Mitchell",
      stars: 5,
      reviewCount: "12 reviews",
      message: "Excellent communication and very punctual. Highly recommend!",
    },
    {
      reviewerProfile: reviewer2 || "/reviewer2.jpg",
      reviewerName: "James Carter",
      stars: 4,
      reviewCount: "8 reviews",
      message: "Did a great job managing the crowd. Would hire again.",
    },
    {
      reviewerProfile: "/reviewer3.jpg",
      reviewerName: "Emily Zhang",
      stars: 5,
      reviewCount: "15 reviews",
      message: "Professional, reliable, and friendly. Top performer!",
    },
  ],
}) => {
  return (
    <div className="my-6">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="text-[24px] font-semibold">Ratings & Reviews</div>
        <div className="text-sm font-normal text-primary cursor-pointer hover:underline">
          See All
        </div>
      </div>

      <div className="flex flex-wrap my-5 gap-y-8 gap-x-8">
        {ratings_arr.length > 0 ? (
          ratings_arr.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 md:basis-1/3 md:max-w-[30.33%] border-b border-b-grey-10 border-dashed pb-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="relative aspect-square w-[22px] h-[22px] rounded-full overflow-hidden">
                      <Image
                        src={item.reviewerProfile || "/default-avatar.jpg"}
                        fill
                        className="object-cover"
                        alt="Reviewer"
                      />
                    </div>
                    <div className="text-md font-medium">
                      {item.reviewerName}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <FaStar size={18} className="text-primary" />
                    <div className="text-[16px] font-semibold">
                      {item.stars}
                    </div>
                  </div>
                </div>
                <div className="text-[12px] font-normal text-grey-60">
                  {item.reviewCount}
                </div>
              </div>
              <div className="text-sm text-grey-100">{item.message}</div>
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
