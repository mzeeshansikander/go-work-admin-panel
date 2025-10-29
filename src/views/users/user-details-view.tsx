"use client";
import Image from "next/image";
import backButton from "../../../public/assets/icons/back-arrow.png";
import UserDetailsInfoComponent from "@/components/users/user-details-info";
import RatingsReviewComponent from "@/components/users/ratings-reviews";
import Button from "@/components/ui/button";

const UserDetailsView = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between px-5 md:px-10">
        <div className="flex flex-row items-center gap-5 py-5">
          <div className="cursor-pointer">
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
        <Button
          text={"View Contract Details"}
          className="bg-primary rounded-lg text-white py-2 px-3 mt-4"
        />
      </div>

      <div className="w-full px-5 md:px-10">
        <UserDetailsInfoComponent
          profilePicture="/placeholder.jpg"
          firstName="John"
          lastName="Doe"
          dateOfBirth="1990-01-01"
          languages={["English", "Spanish"]}
          disability="NO"
          drivingLicense="true"
          uniformSize="M"
          shoesSize={42}
          preferences={["Morning shifts", "Outdoor events"]}
          workExperience={["Event Staff - 2 years", "Security - 1 year"]}
          professionalCertifications={["First Aid", "Crowd Control"]}
          rating={4.8}
          reviewCount={24}
          userId="123"
          chatId="chat_123"
          jobStatus="PENDING"
          gender="MALE"
        />

        <RatingsReviewComponent />
      </div>
    </div>
  );
};

export default UserDetailsView;
