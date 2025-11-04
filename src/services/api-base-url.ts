const IS_LIVE = true;

// Local URL

const LOCAL_URL = "http://localhost:8000" as string;

// Deployed URL
const LIVE_URL = "https://staging-api-gowork.zenkoders.com" as string;

export const BASE_URL = IS_LIVE ? LIVE_URL : LOCAL_URL;

export const URL = {
  auth: {
    login: `${BASE_URL}/admin/sign-in`,

    sendOtp: `${BASE_URL}/auth/resend-otp`,

    verifyOtp: `${BASE_URL}/auth/verify-otp`,

    resetPassword: `${BASE_URL}/auth/reset-password`,
  },

  dashboard: {
    cardsData: `${BASE_URL}/admin/dashboard/cards-data`,

    eventsData: (filterBy: string) =>
      `${BASE_URL}/admin/dashboard/events-by-status-data?filterBy=${filterBy}`,

    ratingData: (filterBy: string) =>
      `${BASE_URL}/admin/dashboard/average-ratings-data?filterBy=${filterBy}`,

    companiesData: (filterBy: string) =>
      `${BASE_URL}/admin/dashboard/subscribed-companies-data?filterBy=${filterBy}`,
  },

  strikes: {
    getStrikes: (
      skip?: number,
      take?: number,
      status?: string,
      search?: string,
      userId?: string
    ) => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (status) params.append("status", status.toString());
      if (userId) params.append("userId", userId.toString());

      return `${BASE_URL}/admin/strikes?${params.toString()}`;
    },

    acceptRejectStrike: (id: string, type: string) => {
      const params = new URLSearchParams();

      if (type) params.append("type", type);
      return `${BASE_URL}/admin/strikes/${id}?${params.toString()}`;
    },
  },

  companies: {
    getCompanies: (skip: number, take: number, search?: string) => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/companies?${params.toString()}`;
    },
  },

  users: {
    getUsers: (skip: number, take: number, search?: string) => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/users?${params.toString()}`;
    },
  },
};
