import React, { FC } from "react";
import InfoHeaderComponent from "./info-header";
import InitialInfoComponent from "./initial-info";

interface Props {
  email?: string;
  contact?: string;
  industry?: string;
  shift?: number;
  country?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  location?: string;
  profilePicture?: string;
  description?: string;
  name?: string;
  rating?: string;
  reviewCount?: number;
  id?: string;
  maxTeamSize?: number;
  externalMembersQuota?: number;
}

const CompanyDetails: FC<Props> = ({
  name,
  profilePicture,
  rating,
  reviewCount,
  email,
  contact,
  industry,
  shift,
  country,
  city,
  street,
  zipCode,
  location,
  description,
  id,
  externalMembersQuota,
  maxTeamSize,
}) => {
  return (
    <div className="border border-grey-10 p-6 rounded-md">
      <InfoHeaderComponent
        name={name}
        profilePicture={profilePicture}
        rating={rating}
        reviewCount={reviewCount}
        id={id}
        externalMembersQuota={externalMembersQuota}
        maxTeamSize={maxTeamSize}
      />
      <InitialInfoComponent
        email={email}
        contact={contact}
        industry={industry}
        shift={shift}
        country={country}
        city={city}
        street={street}
        zipCode={zipCode}
        location={location}
        description={description}
      />
    </div>
  );
};

export default CompanyDetails;
