const IS_LIVE = true;

// Local URL

const LOCAL_URL = "http://localhost:8000" as string;

// Deployed URL
const LIVE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

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

    getCompanyDetails: (id: string) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);

      return `${BASE_URL}/admin/company/${id}`;
    },

    getCompanyRatings: (id: string, skip: number, take: number) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/companies/${id}/ratings?${params.toString()}`;
    },

    getCompaniesDropdown: (skip: number, take: number, search: string) => {
      const params = new URLSearchParams();

      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (search) params.append("search", search);

      return `${BASE_URL}/admin/dropdown-companies?${params.toString()}`;
    },

    getCompanyMembers: (
      id: string,
      skip: number,
      take: number,
      search?: string
    ) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);
      if (search) params.append("search", search);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/companies/${id}/team-crew-members?${params.toString()}`;
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

    getUserRatings: (id: string, skip: number, take: number) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/users/${id}/ratings?${params.toString()}`;
    },

    getUserDetails: (id: string, skip: number, take: number) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/user/${id}?${params.toString()}`;
    },

    getUserContracts: (
      skip: number,
      take: number,
      shiftId: string,
      userId: string
    ) => {
      const params = new URLSearchParams();

      if (shiftId) params.append("shiftId", shiftId);
      if (userId) params.append("userId", userId);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());

      return `${BASE_URL}/admin/user-contracts/${shiftId}/${userId}?${params.toString()}`;
    },
  },

  events: {
    getAllEvents: (
      skip: number,
      take: number,
      type: string,
      search?: string,
      companyId?: string
    ) => {
      const params = new URLSearchParams();

      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (type) params.append("type", type);
      if (search) params.append("search", search);
      if (companyId) params.append("companyId", companyId);

      return `${BASE_URL}/admin/events?${params.toString()}`;
    },

    getEventDetails: (
      id: string,
      skip: number,
      take: number,
      shiftType: string
    ) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id);
      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (shiftType) params.append("shiftType", shiftType);

      return `${BASE_URL}/admin/event/${id}?${params.toString()}`;
    },
  },

  shifts: {
    getAllShifts: (
      skip: number,
      take: number,
      type: string,
      search?: string,
      companyId?: string
    ) => {
      const params = new URLSearchParams();

      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (type) params.append("type", type);
      if (search) params.append("search", search);
      if (companyId) params.append("companyId", companyId);

      return `${BASE_URL}/admin/shifts?${params.toString()}`;
    },

    getShiftDetails: (id: string) => {
      const params = new URLSearchParams();

      if (id) params.append("id", id.toString());

      return `${BASE_URL}/admin/shift/${id}`;
    },

    getShiftUsers: (
      id: string,
      skip: number,
      take: number,
      userType: string,
      search?: string
    ) => {
      const params = new URLSearchParams();

      if (skip !== undefined && skip !== null)
        params.append("skip", skip.toString());
      if (take !== undefined && take !== null)
        params.append("take", take.toString());
      if (userType) params.append("userType", userType);
      if (search) params.append("search", search);
      if (id) params.append("id", id);

      return `${BASE_URL}/admin/shift/${id}/users?${params.toString()}`;
    },
  },
};
