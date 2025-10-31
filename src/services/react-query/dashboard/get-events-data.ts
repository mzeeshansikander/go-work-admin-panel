import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { EventsData } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDashboardEventsData = (
  filterBy: string
): UseQueryResult<EventsData, Error> => {
  const useGetDashboardEventsDataFn = async (): Promise<EventsData> => {
    const response = await GET(URL.dashboard.eventsData(filterBy));
    return response as EventsData;
  };

  return useQuery({
    queryFn: useGetDashboardEventsDataFn,
    queryKey: ["events-data", { filterBy }],
  });
};
