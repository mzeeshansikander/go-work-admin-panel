"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useIncreaseExternalCountMutation } from "@/services/react-query/companies/increase-external-count";
import toast from "react-hot-toast";
import { IncreaseApiResponse } from "@/types/response";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../common/loading-spinner.component";

interface IncreaseMembersModalProps {
  onClose: () => void;
  companyId: string;
}

const IncreaseMembersModal: React.FC<IncreaseMembersModalProps> = ({
  onClose,
  companyId,
}) => {
  const [count, setCount] = useState<number>(0);
  const query = useQueryClient();

  const { mutateAsync, isPending } =
    useIncreaseExternalCountMutation(companyId);

  const handleIncrease = async () => {
    if (count === 0) {
      toast.error("Members count must be greater than 0");
      return;
    }

    await mutateAsync(
      { count: count.toString() },
      {
        onSuccess: (data) => {
          const res = data as IncreaseApiResponse;
          if (res[0] !== null) {
            toast.success("Members count increased successfully");
            query.invalidateQueries({ queryKey: ["company"] });
            onClose();
          } else {
            toast.error("An unknown error occurred.");
          }
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-[750px] w-[80%] items-center h-fit rounded-xl shadow-lg p-10 flex flex-col gap-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <RxCross2
            onClick={onClose}
            className="text-black text-[24px] cursor-pointer"
          />
        </div>
        <div className="w-full flex justify-center items-center flex-col gap-y-2">
          <p className="text-black text-center font-semibold text-[28px]">
            Manage External Candidate Access
          </p>
          <p className="text-[#626D6F] text-center text-[18px] text-ellipsis overflow-hidden wrap-break-word">
            Enable or increase the limit for external candidates. This allows
            companies to bring in additional participants beyond their internal
            team for specific roles or projects.
          </p>
        </div>
        <div className="w-full flex justify-between border rounded-xl p-2">
          <button>
            {" "}
            <AiOutlineMinusCircle
              onClick={() => {
                count > 0 && setCount(count - 1);
              }}
              className="text-primary text-[24px] mt-1 cursor-pointer"
            />
          </button>
          <p className="text-black text-[24px] font-semibold">{count}</p>
          <button>
            <FiPlusCircle
              onClick={() => {
                setCount(count + 1);
              }}
              className="text-primary text-[24px] mt-1 cursor-pointer"
            />
          </button>
        </div>
        <Button
          onClick={handleIncrease}
          type="submit"
          text={
            isPending ? <LoadingSpinner size={20} /> : "Add External Candidates"
          }
          className="rounded-lg text-white p-2 mt-2 w-full bg-primary h-[45px] text-md cursor-pointer"
        />
      </div>
    </div>
  );
};

export default IncreaseMembersModal;
