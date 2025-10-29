import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import user from "../../../public/assets/icons/man.svg";

interface Props {
  userId?: string;
  fullName?: string;
  rating?: number;
  reviewCount?: number;
  profilePicture?: string;
}

const InfoHeaderComponent: FC<Props> = ({
  fullName = "",
  rating = 0,
  reviewCount = 0,
}) => {
  return (
    <div className="flex md:flex-row flex-col gap-y-8 md:justify-between md:items-center">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative aspect-[1] w-10 h-10">
          <Image
            src={user}
            fill
            className="rounded-full object-cover"
            alt="profile_image"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="md:text-[20px] text-[12px] font-semibold">
            {fullName}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <FaStar className="text-primary" />
            <span className="text-grey-50 text-sm">{rating}</span>
            <span className="text-grey-50 text-sm">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoHeaderComponent;
