import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { EventsDataResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetEvents = (
  skip: number,
  take: number,
  type: string,
  search?: string,
  companyId?: string
): UseQueryResult<EventsDataResponse, Error> => {
  const useGetEventsFn = async (): Promise<EventsDataResponse> => {
    const response = await GET(
      URL.events.getAllEvents(skip, take, type, search, companyId)
    );
    return response as EventsDataResponse;
  };

  return useQuery({
    queryFn: useGetEventsFn,
    queryKey: ["all-events", { skip, take, type, search, companyId }],
  });
};
