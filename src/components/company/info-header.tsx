import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import company from "../../../public/assets/icons/company-logo.svg";

interface Props {
  name?: string;
  rating?: string;
  reviewCount?: number;
  profilePicture?: string;
}

const InfoHeaderComponent: FC<Props> = ({
  name = "Company Name",
  rating = "0.0",
  reviewCount = 0,
  profilePicture,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative aspect-[1] w-[105px] h-[105px]">
          <Image
            src={company}
            className="rounded-full object-cover"
            alt="company logo"
            fill
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[32px] font-semibold">{name}</div>

          <div className="flex flex-row gap-1 items-center">
            <FaStar className="text-yellow-500" />
            <span className="text-black mt-1 text-sm">{rating}</span>
            <span className="text-black mt-1 text-sm">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoHeaderComponent;
