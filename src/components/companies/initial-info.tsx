import Image from "next/image";
import React, { FC } from "react";
import email_icon from "../../../public/assets/icons/sms.svg";
import call_icon from "../../../public/assets/icons/call.svg";
import industry_icon from "../../../public/assets/icons/industry.svg";
import shift_icon from "../../../public/assets/icons/shift_icon.png";
import globe_icon from "../../../public/assets/icons/globe.svg";
import city_icon from "../../../public/assets/icons/city.svg";
import zip_icon from "../../../public/assets/icons/zip.svg";
import street_icon from "../../../public/assets/icons/location.svg";

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
  description?: string;
}

const InitialInfoComponent: FC<Props> = ({
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
}) => {
  return (
    <div className="flex flex-wrap my-5 gap-y-8 mt-20">
      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={email_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Email</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{email}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={call_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Contact Number</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{contact}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={industry_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Industry Type</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{industry}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={shift_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Shifts Posted</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{shift}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={globe_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Country</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{country}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={city_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">City</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{city}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={city_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Street</div>
        </div>
        <div className="text-grey-100 text-md font-medium">
          {street || "N/A"}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={zip_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Zip Code</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{zipCode}</div>
      </div>

      <div className="flex flex-col gap-3 md:basis-1/4 basis-1/2">
        <div className="flex gap-1">
          <Image src={street_icon} alt="" className="w-6 h-6" />
          <div className="text-sm mt-1 text-[#626D6F]">Location</div>
        </div>
        <div className="text-grey-100 text-md font-medium">{location}</div>
      </div>

      <div className="w-full mt-5 flex flex-col gap-y-2">
        <p className="text-[#626D6F] text-[14px] font-semibold">
          Company Details
        </p>
        <p className="text-[#25292A] text-[16px]">{description}</p>
      </div>
    </div>
  );
};

export default InitialInfoComponent;
