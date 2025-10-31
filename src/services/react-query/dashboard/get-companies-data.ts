import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { SubscribedCompaniesData } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompaniesData = (
  filterBy: string
): UseQueryResult<SubscribedCompaniesData, Error> => {
  const useGetCompaniesDatafn = async (): Promise<SubscribedCompaniesData> => {
    const response = await GET(URL.dashboard.companiesData(filterBy));
    return response as SubscribedCompaniesData;
  };

  return useQuery({
    queryFn: useGetCompaniesDatafn,
    queryKey: ["companies-data", { filterBy }],
  });
};
