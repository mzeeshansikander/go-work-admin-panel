import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { UsersResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompanyMembers = (
  id: string,
  skip: number,
  take: number,
  search?: string
): UseQueryResult<UsersResponse, Error> => {
  const useGetCompanyMembersFn = async (): Promise<UsersResponse> => {
    const response = await GET(
      URL.companies.getCompanyMembers(id, skip, take, search)
    );
    return response as UsersResponse;
  };

  return useQuery({
    queryFn: useGetCompanyMembersFn,
    queryKey: ["company-members", { id, skip, take, search }],
  });
};
