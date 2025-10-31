"use client";
import { useForgotPassword } from "@/context/forgot-password-context";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import backButton from "../../../public/assets/icons/back-arrow.png";
import { useForgotPasswordMutation } from "@/services/react-query/auth/forgot-password";
import { forgotPasswordSchema } from "@/schema/auth-schema";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import { SendOtpApiResponse } from "@/types/response";
import toast from "react-hot-toast";

interface Props {
  onNext: () => void;
}

const ForgotPasswordView: React.FC<Props> = ({ onNext }) => {
  const router = useRouter();
  const { setEmail } = useForgotPassword();
  const mutation = useForgotPasswordMutation();

  return (
    <div className="h-full flex flex-col justify-center items-center border-2 px-16">
      <div className="w-full flex justify-start">
        <Image
          src={backButton}
          alt="Back"
          className="w-10 h-10 ml-3 top-1 absolute mt-10 cursor-pointer"
          onClick={() => router.push("/login")}
        />
      </div>

      <div className="w-full flex flex-col justify-start mt-3 ml-3 lg:ml-10">
        <h1 className="font-semibold text-[32px]">Forgot Password</h1>
        <p className="text-[#51595A] text-[16px]">
          Enter an email that is associated with your account
        </p>
      </div>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={({ email }, { setSubmitting }) => {
          mutation.mutate(
            { email },
            {
              onSuccess: (data) => {
                const res = data as SendOtpApiResponse;
                if (res?.[0] !== null) {
                  setEmail(email);
                  onNext();
                  toast.success("Otp sent successfully.");
                } else {
                  toast.error("Otp failed.");
                }
              },
              onSettled: () => setSubmitting(false),
            }
          );
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-y-3 w-full mt-5 ml-3 lg:ml-10">
            <Field
              as={Input}
              type="email"
              name="email"
              label="Email"
              placeholder="e.g alexjohn@example.com"
              required
              className="lg:w-[65%] w-[90%] h-14 px-3 py-2"
              error={touched.email && errors.email}
            />

            <div className="lg:w-[65%] w-[90%]">
              <Button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                text={
                  isSubmitting || mutation.isPending ? (
                    <LoadingSpinner size={20} />
                  ) : (
                    "Continue"
                  )
                }
                className="rounded-lg bg-primary p-2 w-full h-14 text-white cursor-pointer"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordView;
