import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { ShiftDetailsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetShiftDetails = (
  id: string
): UseQueryResult<ShiftDetailsResponse, Error> => {
  const useGetShiftDetailsFn = async (): Promise<ShiftDetailsResponse> => {
    const response = await GET(URL.shifts.getShiftDetails(id));
    return response as ShiftDetailsResponse;
  };

  return useQuery({
    queryFn: useGetShiftDetailsFn,
    queryKey: ["shift-details", { id }],
  });
};
