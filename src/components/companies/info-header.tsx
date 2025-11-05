import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import placeholder from "../../../public/assets/icons/individual_icon.png";
import { useRouter } from "next/navigation";

interface Props {
  name?: string;
  rating?: string;
  reviewCount?: number;
  profilePicture?: string;
  id?: string;
}

const InfoHeaderComponent: FC<Props> = ({
  name,
  rating,
  reviewCount,
  profilePicture,
  id,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
        <div
          onClick={() => router.back()}
          className="relative aspect-[1] w-[105px] h-[105px]"
        >
          <Image
            src={profilePicture || placeholder}
            className="rounded-full object-cover"
            alt="company logo"
            fill
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[32px] font-semibold">{name}</div>

          <div
            className="flex flex-row gap-1 items-center cursor-pointer w-fit"
            onClick={() => router.push(`/companies/${id}/reviews`)}
          >
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
