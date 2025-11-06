import Image from "next/image";
import React, { FC, useState } from "react";
import verified_pdf_icon from "../../../public/assets/icons/verified_pdf_icon.png";
import pdf_icon from "../../../public/assets/icons/pdf_icon.png";
import document_download_icon from "../../../public/assets/icons/document-download.svg";
import { FaCheck } from "react-icons/fa6";
import LoadingSpinner from "../common/loading-spinner.component";

interface VerifiedContractCardProps {
  companyContractName: string;
  companyContractUrl: string;
  userContractName: string;
  userContractUrl: string;
  isVerified: boolean;
}

const VerifiedContractCard: FC<VerifiedContractCardProps> = ({
  companyContractName,
  companyContractUrl,
  userContractName,
  userContractUrl,
  isVerified,
}) => {
  const [isDownloading, setIsDownloading] = useState<{
    company: boolean;
    user: boolean;
  }>({ company: false, user: false });

  const handleDownload = async (
    url: string,
    filename: string,
    type: "company" | "user"
  ) => {
    try {
      setIsDownloading((prev) => ({ ...prev, [type]: true }));

      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setIsDownloading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleCompanyContractClick = () => {
    if (!isDownloading.company) {
      window.open(companyContractUrl, "_blank");
    }
  };

  const handleUserContractClick = () => {
    if (!isDownloading.user) {
      window.open(userContractUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 border border-grey-10 rounded-md bg-[#0071BC1A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-[25px] h-5 shrink-0">
            <Image src={verified_pdf_icon} alt="verified pdf" />
          </div>
          <span
            onClick={handleCompanyContractClick}
            className="text-[16px] font-medium text-primary underline-offset-2 underline cursor-pointer hover:text-primary/80 transition-colors truncate"
            title={companyContractName}
          >
            {companyContractName}
          </span>
        </div>
        {isVerified && (
          <FaCheck size={20} className="text-primary-green-50 shrink-0 ml-2" />
        )}
      </div>

      <div className="flex items-center justify-between gap-2 bg-white rounded-md px-3 py-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-5 h-5 shrink-0">
            <Image src={pdf_icon} alt="pdf" />
          </div>
          <span
            onClick={handleUserContractClick}
            className="text-md font-medium text-primary underline-offset-2 underline cursor-pointer hover:text-primary/80 transition-colors truncate"
            title={userContractName}
          >
            {userContractName}
          </span>
        </div>
        <button
          onClick={() =>
            handleDownload(userContractUrl, userContractName, "user")
          }
          disabled={isDownloading.user}
          className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title="Download contract"
          aria-label="Download user contract"
        >
          {isDownloading.user ? (
            <LoadingSpinner size={20} color={"#0071BC"} />
          ) : (
            <Image src={document_download_icon} alt="download" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifiedContractCard;
