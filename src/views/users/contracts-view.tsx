// app/contracts/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";
import VerifiedContractCard from "@/components/users/contract";

const contracts = [
  {
    companyContractName: "Permanent_Employment_Contract.pdf",
    userContractName: "Signed_Agreement_John_Doe.pdf",
    fullName: "John Doe",
  },
  {
    companyContractName: "Staffing_Agreement_2025.pdf",
    userContractName: "Signed_Staffing_John_Doe.pdf",
    fullName: "John Doe",
  },
  {
    companyContractName: "Event_Crew_Contract.pdf",
    userContractName: "Signed_Crew_Contract_Sarah.pdf",
    fullName: "Sarah Connor",
  },
  {
    companyContractName: "Hospitality_Staff_Contract.pdf",
    userContractName: "Signed_Hospitality_Contract.pdf",
    fullName: "Alex Rivera",
  },
];

const ContractsView = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-5 py-5 px-5 md:px-10">
        <div className="cursor-pointer">
          <Image
            src={backButton}
            alt="back"
            width={34}
            height={34}
            className="w-[34px] h-[34px]"
          />
        </div>
        <h1 className="text-[28px] font-semibold">Contract Details</h1>
      </div>

      <div className="px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contracts.map((contract, index) => (
            <VerifiedContractCard
              key={index}
              companyContractName={contract.companyContractName}
              userContractName={contract.userContractName}
              fullName={contract.fullName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractsView;
