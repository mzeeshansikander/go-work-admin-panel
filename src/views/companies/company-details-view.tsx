"use client";
import React from "react";
import Image from "next/image";
import backButton from "../../../public/assets/icons/back-arrow.png";
import CompanyDetails from "@/components/company/company-details";
import TeamCrewTable from "@/components/companies/team-crew-table";

const CompanyDetailsView = () => {
  return (
    <div className="w-full px-5 md:px-10">
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
        <h1 className="text-[28px] font-semibold">Company Details</h1>
      </div>

      <CompanyDetails
        name="EventMasters Ltd."
        profilePicture="/logos/eventmasters.png"
        rating="4.9"
        reviewCount={128}
        email="contact@eventmasters.co.uk"
        contact="+44 20 7946 0858"
        industry="Event Staffing & Hospitality"
        shift={128}
        country="United Kingdom"
        city="London"
        street="12 Oxford Street"
        zipCode="SW1A 1AA"
        location="12 Oxford Street, London SW1A 1AA"
        description="Leading provider of professional event staff across the UK. We supply trained stewards, security, and hospitality personnel for concerts, festivals, and corporate events. Trusted by over 500+ event organizers annually."
      />

      <h1 className="text-[28px] font-semibold my-10">Team / Crew Members</h1>

      {/* Team Crew Table */}
      <TeamCrewTable />
    </div>
  );
};

export default CompanyDetailsView;
