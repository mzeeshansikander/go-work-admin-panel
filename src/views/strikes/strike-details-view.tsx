"use client";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import LoaderOverlay from "@/components/common/page-loader.component";
import AcceptStrikeModal from "@/components/strikes/accept-strike-modal";
import Button from "@/components/ui/button";
import { useAcceptRejectStrike } from "@/services/react-query/strikes/accept-reject-strike";
import { useGetStrikes } from "@/services/react-query/strikes/get-all-strikes";
import { Strike } from "@/types/response";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";
import redStrike from "../../../public/assets/icons/red-strike-icon.svg";
import strikeIcon from "../../../public/assets/icons/strike_icon.png";
import whiteStrike from "../../../public/assets/icons/white-strike-icon.svg";
import toast from "react-hot-toast";

const StrikeDetailsView = () => {
  const params = useParams();
  const id = params.id as string;
  const status = useSearchParams().get("status");
  const router = useRouter();
  const query = useQueryClient();

  const [strikeId, setStrikeId] = useState<string>("");
  const [acceptModal, setAcceptModal] = useState<boolean>(false);

  const { data, isPending } = useGetStrikes(
    undefined,
    undefined,
    status?.toString(),
    undefined,
    id
  );

  const strikes = data?.[0]?.strikes;

  console.log(strikes);

  const strikeCount = data?.[0]?.strikes?.[0]?.strikesCount;
  console.log(strikeCount, "strikeCount");

  const { mutateAsync: acceptMutate, isPending: acceptPending } =
    useAcceptRejectStrike(strikeId, "ACCEPT");

  const { mutateAsync: rejectMutate, isPending: rejectPending } =
    useAcceptRejectStrike(strikeId, "REJECT");

  const acceptStrike = async (id: string) => {
    if (strikeCount === 3) {
      toast.error("This user has already been banned from this platform.");
      return;
    }

    if (strikeCount === 2) {
      setStrikeId(id);
      setAcceptModal(true);
    } else {
      setStrikeId(id);
      await acceptMutate();
      query.invalidateQueries({ queryKey: ["all-strikes"] });
      router.push("/strikes");
    }
  };

  return (
    <div className="w-full md:px-10 px-5">
      <div className="w-full flex justify-between">
        <div className="flex flex-row items-center gap-5 py-5">
          <div
            onClick={() => router.push("/strikes")}
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
          <h1 className="text-[28px] font-semibold">Strike Details</h1>
        </div>
      </div>

      <div className="w-full flex gap-x-3 px-6 py-6 bg-[#FCDBDB] text-ellipsis overflow-hidden wrap-break-word rounded-md">
        <Image src={strikeIcon} alt="" className="w-4 h-6" />
        <p className="text-[#F14D4D] text-[15px]">
          Three strikes lead to Suspension. Strikes are for cancellations,
          no-shows, leaving early, or unprofessional behavior. Stay reliable to
          keep job access!
        </p>
      </div>

      {/* Strike Section */}
      <div className="w-full flex flex-col gap-y-6 mt-10">
        {isPending ? (
          <LoaderOverlay />
        ) : (
          strikes &&
          strikes?.map((strike: Strike, index: number) => (
            <div key={index} className="space-y-5">
              <div className="flex md:flex-row flex-col justify-center md:justify-start items-center md:items-start  gap-3 text-[#51595A] text-[15px] md:text-[18px]">
                <Image
                  src={strike?.companyLogo}
                  alt=""
                  className="w-8 h-8 rounded-full"
                  height={32}
                  width={32}
                />
                <p className="mt-1"> Strike by {strike?.companyName} to</p>
                <Image
                  src={strike?.userProfile}
                  alt=""
                  className="w-8 h-8 rounded-full"
                  height={32}
                  width={32}
                />
                <p className="mt-1">{strike?.userName}</p>
                <div className="flex gap-3">
                  <div className="flex">
                    {Array.from({ length: 3 }).map((_, index) => {
                      const isRed = index >= 3 - strikeCount!;
                      return (
                        <Image
                          key={index}
                          src={isRed ? redStrike : whiteStrike}
                          alt={isRed ? "Active strike" : "Inactive strike"}
                          className="w-8 h-8"
                        />
                      );
                    })}
                  </div>
                  <p className="text-black mt-0.5">{strikeCount}/3</p>
                </div>
              </div>

              <div className="w-full rounded-xl border p-10 flex flex-col gap-4 text-ellipsis overflow-hidden wrap-break-word">
                <p className="font-semibold text-black text-[28px]">
                  Reason for Strike:
                </p>
                <p className="text-[#51595A] text-[16px]">{strike?.reason}</p>
              </div>

              {!strike?.isApproved && (
                <div className="w-full flex gap-x-3 justify-end mt-5">
                  <Button
                    onClick={() => acceptStrike(strike?.id)}
                    text={
                      acceptPending ? (
                        <LoadingSpinner size={20} color="#F14D4D" />
                      ) : (
                        "Accept"
                      )
                    }
                    className="bg-primary min-w-fit min-h-fit rounded-md text-white py-2 px-8 cursor-pointer"
                  />
                  <Button
                    onClick={() => {
                      setStrikeId(strike.id);
                      rejectMutate();
                      query.invalidateQueries({ queryKey: ["all-strikes"] });
                      router.push("/strikes");
                    }}
                    text={
                      rejectPending ? (
                        <LoadingSpinner size={20} color="#F14D4D" />
                      ) : (
                        "Reject"
                      )
                    }
                    className="bg-white border border-[#F14D4D] min-w-fit min-h-fit rounded-md text-[#F14D4D] py-2 px-8 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {acceptModal && (
        <AcceptStrikeModal
          onClose={() => setAcceptModal(false)}
          strikeId={strikeId}
        />
      )}
    </div>
  );
};

export default StrikeDetailsView;
