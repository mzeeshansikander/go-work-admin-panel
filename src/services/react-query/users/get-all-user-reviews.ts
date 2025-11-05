import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { UserReviewsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUserReviews = (
  id: string,
  skip: number,
  take: number
): UseQueryResult<UserReviewsResponse, Error> => {
  const useGetUserReviewsFn = async (): Promise<UserReviewsResponse> => {
    const response = await GET(URL.users.getUserRatings(id, skip, take));
    return response as UserReviewsResponse;
  };

  return useQuery({
    queryFn: useGetUserReviewsFn,
    queryKey: ["user-reviews", { id, skip, take }],
  });
};
