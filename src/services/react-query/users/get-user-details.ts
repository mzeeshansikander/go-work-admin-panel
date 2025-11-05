import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { UserDetailsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUserDetails = (
  id: string,
  skip: number,
  take: number
): UseQueryResult<UserDetailsResponse, Error> => {
  const useGetUserDetailsFn = async (): Promise<UserDetailsResponse> => {
    const response = await GET(URL.users.getUserDetails(id, skip, take));
    return response as UserDetailsResponse;
  };

  return useQuery({
    queryFn: useGetUserDetailsFn,
    queryKey: ["user-details", { id, skip, take }],
  });
};
