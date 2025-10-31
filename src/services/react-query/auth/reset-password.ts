import { URL } from "@/services/api-base-url";
import { POST } from "@/services/axios-request-handler";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useResetPasswordMutation = (): UseMutationResult<
  unknown,
  Error,
  {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
  }
> => {
  const resetPasswordFn = async (payload: {
    code: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<unknown> => {
    const requestPayload = {
      code: payload.code,
      email: payload.email,
      userType: "ADMIN",
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    };
    const response = await POST(URL.auth.resetPassword, requestPayload);
    return response;
  };

  return useMutation({
    mutationFn: resetPasswordFn,
  });
};
