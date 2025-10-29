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
}

const defaultProps: Props = {
  name: "EventMasters Ltd.",
  profilePicture: "/company-logo.png",
  rating: "4.9",
  reviewCount: 128,
  email: "contact@eventmasters.co.uk",
  contact: "+44 20 1234 5678",
  industry: "Event Staffing",
  shift: 128,
  country: "United Kingdom",
  city: "London",
  street: "12 Oxford Street",
  zipCode: "SW1A 1AA",
  location: "12 Oxford Street, London SW1A 1AA",
  description:
    "Leading provider of professional event staff across the UK. We supply trained stewards, security, and hospitality personnel for concerts, festivals and corporate events.",
};

const CompanyDetails: FC<Props> = (props) => {
  const {
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
  } = { ...defaultProps, ...props };

  return (
    <div className="border border-grey-10 p-6 rounded-md">
      <InfoHeaderComponent
        name={name}
        profilePicture={profilePicture}
        rating={rating}
        reviewCount={reviewCount}
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
