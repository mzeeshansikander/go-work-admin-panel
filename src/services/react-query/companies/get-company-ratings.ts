import { URL } from "@/services/api-base-url";
import { GET } from "@/services/axios-request-handler";
import { CompanyReviewsResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCompanyReviews = (
  id: string,
  skip: number,
  take: number
): UseQueryResult<CompanyReviewsResponse, Error> => {
  const useGetCompanyReviewsFn = async (): Promise<CompanyReviewsResponse> => {
    const response = await GET(URL.companies.getCompanyRatings(id, skip, take));
    return response as CompanyReviewsResponse;
  };

  return useQuery({
    queryFn: useGetCompanyReviewsFn,
    queryKey: ["company-reviews", { id, skip, take }],
  });
};
