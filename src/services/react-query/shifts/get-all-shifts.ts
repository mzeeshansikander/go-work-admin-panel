import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { ShiftsDataResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetShifts = (
  skip: number,
  take: number,
  type: string,
  search?: string,
  companyId?: string
): UseQueryResult<ShiftsDataResponse, Error> => {
  const useGetShiftsFn = async (): Promise<ShiftsDataResponse> => {
    const response = await GET(
      URL.shifts.getAllShifts(skip, take, type, search, companyId)
    );
    return response as ShiftsDataResponse;
  };

  return useQuery({
    queryFn: useGetShiftsFn,
    queryKey: ["all-shifts", { skip, take, type, search, companyId }],
  });
};
