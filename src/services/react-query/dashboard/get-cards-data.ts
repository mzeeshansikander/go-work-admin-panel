import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GET } from "@/services/axios-request-handler";
import { URL } from "@/services/api-base-url";
import { DashboardCardsData } from "@/types/response";

export const useGetDashboardCardsData = (): UseQueryResult<
  DashboardCardsData,
  Error
> => {
  const useGetDashboardCardsDataFn = async (): Promise<DashboardCardsData> => {
    const response = await GET(URL.dashboard.cardsData);
    return response as DashboardCardsData;
  };

  return useQuery({
    queryFn: useGetDashboardCardsDataFn,
    queryKey: ["cards-data"],
  });
};
