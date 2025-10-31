import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { RatingData } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDashboardRatingData = (
  filterBy: string
): UseQueryResult<RatingData, Error> => {
  const useGetDashboardRatingDatan = async (): Promise<RatingData> => {
    const response = await GET(URL.dashboard.ratingData(filterBy));
    return response as RatingData;
  };

  return useQuery({
    queryFn: useGetDashboardRatingDatan,
    queryKey: ["rating-data", { filterBy }],
  });
};
