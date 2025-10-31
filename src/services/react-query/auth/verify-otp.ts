import { URL } from "@/services/api-base-url";
import { POST } from "@/services/axios-request-handler";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useVerifyOtpMutation = (): UseMutationResult<
  unknown,
  Error,
  {
    email: string;
    code: string;
  }
> => {
  const verifyOtpMutation = async (payload: {
    code: string;
    email: string;
  }): Promise<unknown> => {
    const requestPayload = {
      code: payload.code,
      email: payload.email,
      userType: "ADMIN",
      type: "PASSWORD_RESET",
    };
    const response = await POST(URL.auth.verifyOtp, requestPayload);
    return response;
  };

  return useMutation({
    mutationFn: verifyOtpMutation,
  });
};
