import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { ContractssResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUserContracts = (
  skip: number,
  take: number,
  shiftId: string,
  userId: string
): UseQueryResult<ContractssResponse, Error> => {
  const useGetUserContractsFn = async (): Promise<ContractssResponse> => {
    const response = await GET(
      URL.users.getUserContracts(skip, take, shiftId, userId)
    );
    return response as ContractssResponse;
  };

  return useQuery({
    queryFn: useGetUserContractsFn,
    queryKey: ["user-contracts", { skip, take, shiftId, userId }],
  });
};
