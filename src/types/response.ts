export type ApiSuccess<T> = [T, null];
export type ApiError = [null, { message: string; statusCode: number }];
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export const isError = <T>(res: ApiResponse<T>): res is ApiError =>
  res[0] === null;
export const isSuccess = <T>(res: ApiResponse<T>): res is ApiSuccess<T> =>
  res[0] !== null;

export interface LoginResponse {
  message: string;
  token: string;
  admin: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export type LoginApiResponse = [LoginResponse | null];

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export type SendOtpApiResponse = [SendOtpResponse | null];

export interface VerifyOtpResponse {
  statusCode: number;
  message: string;
}

export type VerifyOtpApiResponse = [VerifyOtpResponse | null];

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export type PasswordResetApiResponse = [PasswordResetResponse | null];

export interface DashboardCardsData {
  totalCandidates: number;
  totalCompanies: number;
  totalEvents: number;
}

export interface EventsData {
  ongoingEventsCount: number;
  pastEventsCount: number;
}

export interface RatingData {
  averageRating: number;
}

export type SubscribedCompaniesData = [{ date: string; count: number }];

export interface Strike {
  id: string;
  reason: string;
  date: string;
  companyName: string;
  userName: string;
  userId: string;
  isApproved: string;
  companyLogo: string;
  userProfile: string;
}

export interface StrikesData {
  strikes: Strike[];
  meta: {
    skip: number;
    take: number;
    total: number;
  };
}

export type StrikesResponse = [StrikesData | null];

export type AcceptRejectResponse = [{ success: boolean } | null];

export interface Company {
  id: string;
  name: string;
  postedShifts: number;
  subscriptionPlan: null;
  logo: string;
  location: string;
  email: string;
  rating: number;
  reviewsCount: number;
}

export interface CompaniesData {
  companies: Company[];
  meta: {
    skip: number;
    take: number;
    total: number;
  };
}

export type CompaniesResponse = [CompaniesData | null];

export interface User {
  id: string;
  profilePicture: string;
  fullName: string;
  email: string;
  dob: string;
  rating: number;
  reviewsCount: number;
  isCrewMember?: boolean;
  isTeamMember?: boolean;
}

export interface UsersData {
  users: User[];
  meta: {
    skip: number;
    take: number;
    total: number;
  };
}

export type UsersResponse = [UsersData | null];

export interface CompanyDetails {
  id: string;
  name: string;
  logo: string;
  email: string;
  contactNumber: string;
  industryType: string;
  shiftsPosted: number;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  cifCode: string;
  location: string;
  details: string;
  rating: string;
  reviewsCount: number;
}

export type CompanyDetailsResponse = [CompanyDetails | null];

export interface Ratings {
  [key: string]: number;
}

export interface CompanyReview {
  id: string;
  message: string;
  stars: string;
}

export interface CompanyReviews {
  reviews: CompanyReview[];
  meta: {
    skip: number;
    take: number;
    total: number;
  };
}

export interface CompanyReviewsData {
  ratings: Ratings;
  avgRating: string;
  reviews: CompanyReviews;
}

export type CompanyReviewsResponse = [CompanyReviewsData | null];
export interface UserReview {
  id: string;
  message: string;
  stars: string;
}

export interface UserReviews {
  reviews: UserReview[];
  meta: {
    skip: number;
    take: number;
    total: number;
  };
}

export interface UserReviewsData {
  ratings: Ratings;
  avgRating: string;
  reviews: CompanyReviews;
}

export type UserReviewsResponse = [UserReviewsData | null];
