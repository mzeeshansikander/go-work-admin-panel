import React, { FC } from "react";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  languages?: string[];
  disability?: string;
  drivingLicense?: string;
  uniformSize?: string;
  shoesSize?: number;
  jobStatus?: string;
  gender?: string;
  email?: string;
}

const InitialInfoComponent: FC<UserProfile> = ({
  dateOfBirth = "",
  disability = "NO",
  drivingLicense = "false",
  firstName = "",
  lastName = "",
  languages = [],
  uniformSize = "",
  shoesSize = 0,
  gender = "",
}) => {
  return (
    <div className="flex flex-wrap my-5 gap-y-8">
      <div className="flex flex-col gap-2 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">First Name</div>
        <div className="text-grey-100 text-sm font-medium">{firstName}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Last Name</div>
        <div className="text-grey-100 text-sm font-medium">{lastName}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Date of Birth</div>
        <div className="text-grey-100 text-sm font-medium">{dateOfBirth}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Languages</div>
        <div className="text-grey-100 text-sm font-medium">
          {languages.join(", ")}
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Email</div>
        <div className="text-grey-100 text-sm font-medium">
          Jhondoe@gmail.com
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Contact Number</div>
        <div className="text-grey-100 text-sm font-medium">+34 612 345 678</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Disability</div>
        <div className="text-grey-100 text-sm font-medium">{disability}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Driving License</div>
        <div className="text-grey-100 text-sm font-medium">
          {drivingLicense === "true" ? "Yes" : "No"}
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Uniform Size</div>
        <div className="text-grey-100 text-sm font-medium">{uniformSize}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Shoes Size</div>
        <div className="text-grey-100 text-sm font-medium">{shoesSize}</div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2 md:basis-1/4">
        <div className="text-sm text-grey-60">Gender</div>
        <div className="text-grey-100 text-sm font-medium">
          {gender === "MALE" ? "Male" : "Female"}
        </div>
      </div>
    </div>
  );
};

export default InitialInfoComponent;
