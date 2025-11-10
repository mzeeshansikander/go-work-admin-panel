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
  maxTeamSize?: number;
  externalMembersQuota?: number;
}

const InfoHeaderComponent: FC<Props> = ({
  name,
  rating,
  reviewCount,
  profilePicture,
  id,
  maxTeamSize,
  externalMembersQuota,
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
      <div className="flex gap-x-3">
        <div className="w-fit min-h-fit flex gap-x-1.5 bg-[#6C38B21A] rounded-md py-2 px-6">
          <p className="text-[#6C38B2] text-[16px] font-semibold">
            Team Members
          </p>
          <p className="text-[#6C38B2] text-[16px] font-semibold">
            {maxTeamSize}
          </p>
        </div>
        <div className="w-fit min-h-fit flex gap-x-1.5 bg-[#0071BC1A] rounded-md py-2 px-6">
          <p className="text-primary text-[16px] font-semibold">
            External Candidates
          </p>
          <p className="text-primary text-[16px] font-semibold">
            {externalMembersQuota}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoHeaderComponent;
