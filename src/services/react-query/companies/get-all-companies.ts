import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { CompaniesResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompanies = (
  skip: number,
  take: number,
  search?: string
): UseQueryResult<CompaniesResponse, Error> => {
  const useGetCompaniesFn = async (): Promise<CompaniesResponse> => {
    const response = await GET(URL.companies.getCompanies(skip, take, search));
    return response as CompaniesResponse;
  };

  return useQuery({
    queryFn: useGetCompaniesFn,
    queryKey: ["all-companies", { skip, take, search }],
  });
};
