import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { DropdownCompaniesDataResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompaniesDropdown = (
  skip: number,
  take: number
): UseQueryResult<DropdownCompaniesDataResponse, Error> => {
  const useGetCompaniesDropdownFn =
    async (): Promise<DropdownCompaniesDataResponse> => {
      const response = await GET(
        URL.companies.getCompaniesDropdown(skip, take)
      );
      return response as DropdownCompaniesDataResponse;
    };

  return useQuery({
    queryFn: useGetCompaniesDropdownFn,
    queryKey: ["companies-dropdown", { skip, take }],
  });
};
