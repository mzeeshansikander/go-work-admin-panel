import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { EventDetailsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetEventDetails = (
  id: string,
  skip: number,
  take: number,
  shiftType: string
): UseQueryResult<EventDetailsResponse, Error> => {
  const useGetEventDetailsFn = async (): Promise<EventDetailsResponse> => {
    const response = await GET(
      URL.events.getEventDetails(id, skip, take, shiftType)
    );
    return response as EventDetailsResponse;
  };

  return useQuery({
    queryFn: useGetEventDetailsFn,
    queryKey: ["event-details", { id, skip, take, shiftType }],
  });
};
