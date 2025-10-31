import { URL } from "@/services/api-base-url";
import { POST } from "@/services/axios-request-handler";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useForgotPasswordMutation = (): UseMutationResult<
  unknown,
  Error,
  {
    email: string;
  }
> => {
  const forgotPasswordFn = async (payload: {
    email: string;
  }): Promise<unknown> => {
    const requestPayload = {
      email: payload.email,
      userType: "ADMIN",
      type: "PASSWORD_RESET",
    };
    const response = await POST(URL.auth.sendOtp, requestPayload);
    return response;
  };

  return useMutation({
    mutationFn: forgotPasswordFn,
  });
};
