"use client";
import LoaderOverlay from "@/components/common/page-loader.component";
import VerifiedContractCard from "@/components/users/contract";
import { useGetUserContracts } from "@/services/react-query/users/get-user-contracts";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";

const ContractsView = () => {
  const [take] = useState<number>(10);
  const [loadedContracts, setLoadedContracts] = useState<number>(10);

  const router = useRouter();
  const id = useParams().id as string;
  const shiftId = useSearchParams().get("shiftId");

  const { data, isPending } = useGetUserContracts(
    0,
    loadedContracts,
    shiftId as string,
    id
  );

  const handleLoadMore = () => {
    setLoadedContracts((prev) => prev + take);
  };

  const hasMore = data?.[0] && loadedContracts < data[0].meta.total;

  return (
    <div className="w-full">
      <div className="flex items-center gap-5 py-5 px-5 md:px-10">
        <div className="cursor-pointer" onClick={() => router.back()}>
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
        {isPending ? (
          <LoaderOverlay />
        ) : data?.[0]?.contracts && data[0].contracts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data[0].contracts.map((contract) => (
                <VerifiedContractCard
                  key={contract.id}
                  companyContractName={contract.companyContract.key}
                  companyContractUrl={contract.companyContract.url}
                  userContractName={contract.userContract.key}
                  userContractUrl={contract.userContract.url}
                  isVerified={contract.has_user_uploaded}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={handleLoadMore}
                  disabled={isPending}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? <LoaderOverlay /> : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-500 text-lg">No contracts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractsView;
