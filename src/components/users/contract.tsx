import Image from "next/image";
import React, { FC } from "react";
import verified_pdf_icon from "../../../public/assets/icons/verified_pdf_icon.png";
import pdf_icon from "../../../public/assets/icons/pdf_icon.png";
import document_download_icon from "../../../public/assets/icons/document-download.svg";
import { FaCheck } from "react-icons/fa6";

interface VerifiedContractCardProps {
  companyContractName: string;
  userContractName: string;
  fullName: string;
}

const VerifiedContractCard: FC<VerifiedContractCardProps> = ({
  companyContractName,
  userContractName,
}) => {
  return (
    <div className="flex flex-col gap-3 p-5 border border-grey-10 rounded-md bg-[#0071BC1A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[25px] h-5">
            <Image src={verified_pdf_icon} alt="verified pdf" />
          </div>
          <span className="text-[16px] font-medium text-primary underline-offset-2 underline">
            {companyContractName}
          </span>
        </div>
        <FaCheck size={20} className={`text-primary-green-50`} />
      </div>

      <div className="flex items-center justify-between gap-2 bg-white rounded-md px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5">
            <Image src={pdf_icon} alt="pdf" />
          </div>
          <span className="text-md font-medium text-primary underline-offset-2 underline">
            {userContractName}
          </span>
        </div>
        <div className="w-6 h-6 cursor-pointer">
          <Image src={document_download_icon} alt="download" />
        </div>
      </div>
    </div>
  );
};

export default VerifiedContractCard;
