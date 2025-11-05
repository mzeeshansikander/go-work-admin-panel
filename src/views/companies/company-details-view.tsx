"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import backButton from "../../../public/assets/icons/back-arrow.png";
import CompanyDetails from "@/components/companies/company-details";
import TeamCrewTable from "@/components/companies/team-crew-table";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanyDetails } from "@/services/react-query/companies/get-company-details";
import LoaderOverlay from "@/components/common/page-loader.component";
import { useGetCompanyMembers } from "@/services/react-query/companies/get-company-members";
import { UsersData } from "@/types/response";

const CompanyDetailsView = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data: memberData, isPending: memberPending } = useGetCompanyMembers(
    id,
    currentPage * rowsPerPage,
    rowsPerPage,
    searchTerm
  );

  const { data, isPending } = useGetCompanyDetails(id);

  const companyData = data?.[0];

  if (isPending) {
    return <LoaderOverlay />;
  }

  return (
    <div className="w-full px-5 md:px-10">
      <div className="flex flex-row items-center gap-5 py-5">
        <div
          onClick={() => {
            router.push("/companies");
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
        <h1 className="text-[28px] font-semibold">Company Details</h1>
      </div>

      <CompanyDetails
        name={companyData?.name}
        profilePicture={companyData?.logo}
        rating={companyData?.rating}
        reviewCount={companyData?.reviewsCount}
        email={companyData?.email}
        contact={companyData?.contactNumber}
        industry={companyData?.industryType}
        shift={companyData?.shiftsPosted}
        country={companyData?.country}
        city={companyData?.city}
        street={companyData?.street}
        zipCode={companyData?.zipCode}
        location={companyData?.location}
        description={companyData?.details}
        id={companyData?.id}
      />

      <h1 className="text-[28px] font-semibold my-10">Team / Crew Members</h1>

      {/* Team Crew Table */}
      <TeamCrewTable
        data={memberData?.[0] as UsersData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isPending={memberPending}
      />
    </div>
  );
};

export default CompanyDetailsView;
