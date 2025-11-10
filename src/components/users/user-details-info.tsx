import { FC } from "react";
import InfoHeaderComponent from "./info-header";
import InitialInfoComponent from "./initial-info";
import OtherInfoComponent from "./other-info-component";

interface Props {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  dateOfBirth?: string;
  languages?: string[];
  disability?: string;
  drivingLicense?: string[];
  uniformSize?: string;
  shoesSize?: number;
  preferences?: string[];
  workExperience?: string[];
  professionalCertifications?: string[];
  rating?: string;
  reviewCount?: number;
  strikesCount?: number;
  profilePicture?: string;
  userId?: string;
  gender?: string;
  isCrewMember?: boolean;
  isTeamMember?: boolean;
  strikeExist?: boolean;
  strikeEligible?: boolean;
}

const UserDetailsInfoComponent: FC<Props> = ({
  firstName,
  lastName,
  dateOfBirth,
  languages,
  disability,
  drivingLicense,
  uniformSize,
  shoesSize,
  preferences,
  workExperience,
  professionalCertifications,
  rating,
  reviewCount,
  strikesCount,
  profilePicture,
  userId,
  gender,
  email,
  contactNumber,
}) => {
  return (
    <div className="border border-grey-10 p-4 rounded-md">
      <InfoHeaderComponent
        fullName={`${firstName} ${lastName}`}
        rating={rating}
        reviewCount={reviewCount}
        profilePicture={profilePicture}
        userId={userId}
        strikesCount={strikesCount}
      />
      <InitialInfoComponent
        firstName={firstName}
        lastName={lastName}
        email={email}
        dateOfBirth={dateOfBirth}
        languages={languages}
        disability={disability}
        drivingLicense={drivingLicense}
        uniformSize={uniformSize}
        shoesSize={shoesSize}
        gender={gender}
        contactNumber={contactNumber}
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
