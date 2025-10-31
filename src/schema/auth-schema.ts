import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const verifyOtpSchema = yup.object({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
