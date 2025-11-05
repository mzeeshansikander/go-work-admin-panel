import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { CompanyDetailsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompanyDetails = (
  id: string
): UseQueryResult<CompanyDetailsResponse, Error> => {
  const useGetCompanyDetailsFn = async (): Promise<CompanyDetailsResponse> => {
    const response = await GET(URL.companies.getCompanyDetails(id));
    return response as CompanyDetailsResponse;
  };

  return useQuery({
    queryFn: useGetCompanyDetailsFn,
    queryKey: ["company", { id }],
  });
};
