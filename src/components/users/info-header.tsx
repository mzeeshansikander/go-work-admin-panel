import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import placeholder from "../../../public/assets/icons/individual_icon.png";
import { useRouter } from "next/navigation";
import redStrike from "../../../public/assets/icons/red-strike-icon.svg";
import whiteStrike from "../../../public/assets/icons/white-strike-icon.svg";
interface Props {
  userId?: string;
  fullName?: string;
  rating?: string;
  reviewCount?: number;
  strikesCount?: number;
  profilePicture?: string;
}

const InfoHeaderComponent: FC<Props> = ({
  fullName,
  rating,
  reviewCount,
  profilePicture,
  userId,
  strikesCount,
}) => {
  const router = useRouter();

  return (
    <div className="flex md:flex-row flex-col gap-y-8 md:justify-between md:items-center">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative aspect-[1] w-10 h-10">
          <Image
            src={profilePicture || placeholder}
            fill
            className="rounded-full object-cover"
            alt="profile_image"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="md:text-[20px] text-[12px] font-semibold">
            {fullName}
          </div>
          <div
            onClick={() => router.push(`/users/${userId}/reviews`)}
            className="flex flex-row gap-1 items-center cursor-pointer w-fit"
          >
            <FaStar className="text-yellow-500" />
            <span className="text-grey-50 text-sm mt-0.5">{rating}</span>
            <span className="text-grey-50 text-sm mt-0.5">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="flex gap-3 -mt-6">
          <div className="flex">
            {Array.from({ length: 3 }).map((_, index) => {
              const isRed = index >= 3 - strikesCount!;
              return (
                <Image
                  key={index}
                  src={isRed ? redStrike : whiteStrike}
                  alt={isRed ? "Active strike" : "Inactive strike"}
                  className="w-6 h-6"
                />
              );
            })}
          </div>
          <p className="text-black mt-0.5">{strikesCount}/3</p>
        </div>
      </div>
    </div>
  );
};

export default InfoHeaderComponent;
