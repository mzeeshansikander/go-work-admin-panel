import React, { FC } from "react";
import InfoHeaderComponent from "./info-header";
import InitialInfoComponent from "./initial-info";
import OtherInfoComponent from "./other-info-component";
import { formatDate } from "@/utils/format-date-time-utils";

interface Props {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  languages?: string[];
  disability?: string;
  drivingLicense?: string;
  uniformSize?: string;
  shoesSize?: number;
  preferences?: string[];
  workExperience?: string[];
  professionalCertifications?: string[];
  rating?: number;
  reviewCount?: number;
  profilePicture?: string;
  userId?: string;
  chatId?: string;
  jobStatus?: string;
  gender?: string;
  isCrewMember?: boolean;
  isTeamMember?: boolean;
  strikeExist?: boolean;
  strikeEligible?: boolean;
}

const UserDetailsInfoComponent: FC<Props> = ({
  firstName = "",
  lastName = "",
  dateOfBirth = "",
  languages = [],
  disability = "NO",
  drivingLicense = "false",
  uniformSize = "",
  shoesSize = 0,
  preferences = [],
  workExperience = [],
  professionalCertifications = [],
  rating = 0,
  reviewCount = 0,
  profilePicture = "",
  userId = "",
  gender = "",
}) => {
  return (
    <div className="border border-grey-10 p-4 rounded-md">
      <InfoHeaderComponent
        fullName={`${firstName} ${lastName}`}
        rating={rating}
        reviewCount={reviewCount}
        profilePicture={profilePicture}
        userId={userId}
      />
      <InitialInfoComponent
        firstName={firstName}
        lastName={lastName}
        email={lastName}
        dateOfBirth={formatDate(dateOfBirth)}
        languages={languages}
        disability={disability}
        drivingLicense={drivingLicense}
        uniformSize={uniformSize}
        shoesSize={shoesSize}
        gender={gender}
      />
      <OtherInfoComponent title="Preferences" info_arr={preferences} />
      <OtherInfoComponent title="Work Experience" info_arr={workExperience} />
      <OtherInfoComponent
        title="Professional Certifications"
        info_arr={professionalCertifications}
      />
    </div>
  );
};

export default UserDetailsInfoComponent;
