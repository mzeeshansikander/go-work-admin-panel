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
