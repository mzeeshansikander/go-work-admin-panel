"use client";
import { useForgotPassword } from "@/context/forgot-password-context";
import Button from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/services/react-query/auth/reset-password";
import { resetPasswordSchema } from "@/schema/auth-schema";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import { PasswordResetApiResponse } from "@/types/response";
import toast from "react-hot-toast";

const ResetPasswordView = () => {
  const { email, otp } = useForgotPassword();
  const mutation = useResetPasswordMutation();
  const router = useRouter();

  return (
    <div className="h-full flex flex-col justify-center items-center border-2 px-16">
      <div className="w-full flex flex-col justify-start mt-3 ml-3 lg:ml-10">
        <h1 className="font-semibold text-[32px]">Set New Password</h1>
        <p className="text-[#51595A] text-[16px]">
          Enter a New Password and Remember it
        </p>
      </div>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(
            {
              email,
              code: otp,
              password: values.password,
              confirmPassword: values.confirmPassword,
            },
            {
              onSuccess: (data) => {
                const res = data as PasswordResetApiResponse;
                if (res?.[0] !== null) {
                  router.push("/login");
                  toast.success("Password reset sucessfully");
                } else {
                  toast.error("Password reset failed.");
                }
              },
              onSettled: () => setSubmitting(false),
            }
          );
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-y-6 w-full mt-5 ml-3 lg:ml-10">
            <Field
              as={PasswordInput}
              name="password"
              label="New Password"
              placeholder="Enter new password"
              required
              className="lg:w-[65%] w-[95%] h-14 px-1 py-2"
              error={touched.password && errors.password}
            />

            <Field
              as={PasswordInput}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter confirm password"
              required
              className="lg:w-[65%] w-[95%] h-14 px-1 py-2"
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <div className="lg:w-[65%] w-[95%]">
              <Button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                text={
                  isSubmitting || mutation.isPending ? (
                    <LoadingSpinner size={20} />
                  ) : (
                    "Save Password"
                  )
                }
                className="rounded-xl bg-primary p-2 w-full h-14 text-white cursor-pointer"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordView;
