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
};
