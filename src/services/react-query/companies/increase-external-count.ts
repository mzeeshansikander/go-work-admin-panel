import { URL } from "@/services/api-base-url";
import { PATCH } from "@/services/axios-request-handler";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useIncreaseExternalCountMutation = (
  id: string
): UseMutationResult<
  unknown,
  Error,
  {
    count: string;
  }
> => {
  const useIncreaseExternalCountMutationFn = async (payload: {
    count: string;
  }): Promise<unknown> => {
    const response = await PATCH(
      URL.companies.increaseCompanyExternalCount(id),
      payload
    );
    return response;
  };

  return useMutation({
    mutationFn: useIncreaseExternalCountMutationFn,
  });
};
