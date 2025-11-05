"use client";
import { useAcceptRejectStrike } from "@/services/react-query/strikes/accept-reject-strike";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingSpinner from "../common/loading-spinner.component";
import Button from "../ui/button";

interface AcceptModalProps {
  onClose: () => void;
  strikeId: string;
}

const AcceptStrikeModal: React.FC<AcceptModalProps> = ({
  onClose,
  strikeId,
}) => {
  const { mutateAsync: acceptMutate, isPending: acceptPending } =
    useAcceptRejectStrike(strikeId, "ACCEPT");

  const router = useRouter();
  const query = useQueryClient();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-[700px] w-[80%] items-center h-fit rounded-xl shadow-lg p-10 flex flex-col gap-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center items-center flex-col gap-y-2">
          <p className="text-[#F14D4D] text-center font-semibold text-[28px]">
            Warning
          </p>
          <p className="text-[#626D6F] text-center text-[18px] text-ellipsis overflow-hidden wrap-break-word">
            The user has already received two strikes. Accepting this will issue
            the third, which automatically triggers a permanent suspension of
            their account. Make sure this decision is final.
          </p>
        </div>
        <div className="flex w-full gap-x-5">
          <Button
            type="submit"
            text={"Dismiss"}
            className="rounded-lg bg-white p-2 mt-2 w-1/2 border border-primary h-[45px] text-primary text-md cursor-pointer"
            onClick={onClose}
          />
          <Button
            onClick={() => {
              acceptMutate();
              query.invalidateQueries({ queryKey: ["all-strikes"] });
              router.push("/strikes");
            }}
            text={
              acceptPending ? (
                <LoadingSpinner color="white" size={20} />
              ) : (
                "Accept"
              )
            }
            type="submit"
            className="rounded-lg bg-[#F14D4D] p-2 mt-2 w-1/2 h-[45px] text-white text-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AcceptStrikeModal;
