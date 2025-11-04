import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { UsersResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUsers = (
  skip: number,
  take: number,
  search?: string
): UseQueryResult<UsersResponse, Error> => {
  const useGetUsersFn = async (): Promise<UsersResponse> => {
    const response = await GET(URL.users.getUsers(skip, take, search));
    return response as UsersResponse;
  };

  return useQuery({
    queryFn: useGetUsersFn,
    queryKey: ["all-users", { skip, take, search }],
  });
};
