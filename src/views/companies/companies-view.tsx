"use client";
import CompaniesTable from "@/components/companies/company-table";
import React from "react";

const CompaniesView = () => {
  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">Companies</p>
      </div>

      {/* Companies Table */}
      <CompaniesTable />
    </div>
  );
};

export default CompaniesView;
