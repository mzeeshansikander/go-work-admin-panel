import { URL } from "@/services/api-base-url";
import { POST } from "@/services/axios-request-handler";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useLoginMutation = (): UseMutationResult<
  unknown,
  Error,
  {
    email: string;
    password: string;
  }
> => {
  const useLoginFn = async (payload: {
    email: string;
    password: string;
  }): Promise<unknown> => {
    const response = await POST(URL.auth.login, payload);
    return response;
  };

  return useMutation({
    mutationFn: useLoginFn,
  });
};
