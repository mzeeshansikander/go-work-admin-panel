import { URL } from "@/services/api-base-url";
import { PATCH } from "@/services/axios-request-handler";
import { AcceptRejectResponse } from "@/types/response";
import { CustomAxiosErrorType } from "@/types/shared.types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAcceptRejectStrike = (
  id: string,
  type: "ACCEPT" | "REJECT"
): UseMutationResult<AcceptRejectResponse, CustomAxiosErrorType, void> => {
  const mutationFn = async (): Promise<AcceptRejectResponse> => {
    const response = await PATCH(URL.strikes.acceptRejectStrike(id, type), {});
    return response as AcceptRejectResponse;
  };

  return useMutation<AcceptRejectResponse, CustomAxiosErrorType, void>({
    mutationFn,

    onSuccess: (data) => {
      const res = data;

      if (res[0] !== null) {
        toast.success(`Strike ${type.toLowerCase()}ed successfully.`);
      } else {
        toast.error("Action failed. Please try again.");
      }
    },

    onError: (error: CustomAxiosErrorType) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";

      toast.error(errorMessage);
    },
  });
};
