"use client";
import Image from "next/image";
import backButton from "../../../public/assets/icons/back-arrow.png";
import UserDetailsInfoComponent from "@/components/users/user-details-info";
import RatingsReviewComponent from "@/components/users/ratings-reviews";
import Button from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetUserDetails } from "@/services/react-query/users/get-user-details";
import LoaderOverlay from "@/components/common/page-loader.component";
import { Review } from "@/types/response";

const UserDetailsView = () => {
  const params = useParams();
  const id = params.id as string;

  const fromShift = useSearchParams().get("fromShift");
  const shiftId = useSearchParams().get("shiftId");
  const router = useRouter();

  const { data, isPending } = useGetUserDetails(id, 0, 6);

  const userData = data?.[0];

  if (isPending) {
    return <LoaderOverlay />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between px-5 md:px-10">
        <div className="flex flex-row items-center gap-5 py-5">
          <div
            onClick={() => {
              fromShift === "true"
                ? router.push(`/shifts/${shiftId}`)
                : router.push("/users");
            }}
            className="cursor-pointer"
          >
            <Image
              src={backButton}
              alt="back"
              width={34}
              height={34}
              className="w-[34px] h-[34px]"
            />
          </div>
          <h1 className="text-[28px] font-semibold">User Details</h1>
        </div>
        {fromShift === "true" && (
          <Button
            onClick={() =>
              router.push(`/users/${id}/contract?shiftId=${shiftId}`)
            }
            text={"View Contract Details"}
            className="bg-primary rounded-lg text-white py-2 px-3 mt-4 cursor-pointer"
          />
        )}
      </div>

      <div className="w-full px-5 md:px-10">
        <UserDetailsInfoComponent
          profilePicture={userData?.profilePicture}
          firstName={userData?.firstName}
          lastName={userData?.lastName}
          dateOfBirth={userData?.dob}
          languages={userData?.languages}
          disability={userData?.disability === true ? "Yes" : "No"}
          drivingLicense={userData?.drivingLicense}
          uniformSize={userData?.uniformSize}
          shoesSize={userData?.shoesSize}
          preferences={userData?.preferences}
          workExperience={userData?.workExperience}
          professionalCertifications={userData?.professionalCertifications}
          rating={userData?.rating}
          reviewCount={userData?.reviewsCount}
          strikesCount={userData?.strikesCount}
          userId={userData?.id}
          gender={userData?.gender}
        />

        <RatingsReviewComponent
          reviews={userData?.reviews?.reviews as Review[]}
        />
      </div>
    </div>
  );
};

export default UserDetailsView;
