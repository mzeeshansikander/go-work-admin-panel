import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { UsersResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetShiftUsers = (
  id: string,
  skip: number,
  take: number,
  userType: string,
  search?: string
): UseQueryResult<UsersResponse, Error> => {
  const useGetShiftUsersFn = async (): Promise<UsersResponse> => {
    const response = await GET(
      URL.shifts.getShiftUsers(id, skip, take, userType, search)
    );
    return response as UsersResponse;
  };

  return useQuery({
    queryFn: useGetShiftUsersFn,
    queryKey: ["shift-users", { id, skip, take, userType, search }],
  });
};
