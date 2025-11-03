import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GET } from "@/services/axios-request-handler";
import { URL } from "@/services/api-base-url";
import { StrikesResponse } from "@/types/response";

export const useGetStrikes = (
  skip?: number,
  take?: number,
  status?: string,
  search?: string,
  userId?: string
): UseQueryResult<StrikesResponse, Error> => {
  const useGetStrikesFn = async (): Promise<StrikesResponse> => {
    const response = await GET(
      URL.strikes.getStrikes(skip, take, status, search, userId)
    );
    return response as StrikesResponse;
  };

  return useQuery({
    queryFn: useGetStrikesFn,
    queryKey: ["all-strikes", { skip, take, status, search, userId }],
  });
};
