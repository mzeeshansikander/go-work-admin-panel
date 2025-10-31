"use client";
import { useForgotPassword } from "@/context/forgot-password-context";
import Button from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import { Formik, Form } from "formik";
import OtpTimer from "@/components/common/otp-timer.component";
import backButton from "../../../public/assets/icons/back-arrow.png";
import { useVerifyOtpMutation } from "@/services/react-query/auth/verify-otp";
import { useForgotPasswordMutation } from "@/services/react-query/auth/forgot-password";
import { verifyOtpSchema } from "@/schema/auth-schema";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import { VerifyOtpApiResponse } from "@/types/response";
import toast from "react-hot-toast";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const VerifyOtpView: React.FC<Props> = ({ onNext, onBack }) => {
  const { email, otp, setOtp } = useForgotPassword();
  const verifyMut = useVerifyOtpMutation();
  const resendMut = useForgotPasswordMutation();

  return (
    <div className="h-full w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full flex justify-start mb-8">
        <Image
          src={backButton}
          alt="Back"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
          onClick={onBack}
        />
      </div>

      <div className="w-full flex flex-col justify-start mb-8">
        <h1 className="font-semibold text-2xl sm:text-3xl lg:text-[32px] mb-2">
          Verification Code
        </h1>
        <p className="text-grey-80 text-sm sm:text-base">
          Enter the code sent to {email}
        </p>
      </div>

      <Formik
        initialValues={{ otp: otp }}
        validationSchema={verifyOtpSchema}
        enableReinitialize
        onSubmit={({ otp }, { setSubmitting }) => {
          verifyMut.mutate(
            { email, code: otp },
            {
              onSuccess: (data) => {
                const res = data as VerifyOtpApiResponse;
                if (res?.[0] !== null) {
                  setOtp(otp);
                  onNext();
                  toast.success("Otp verified succesfully");
                } else {
                  toast.error("Otp verification failed");
                }
              },
              onSettled: () => setSubmitting(false),
            }
          );
        }}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="w-full">
            <div className="w-full mb-6">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={values.otp}
                onChange={(v) => {
                  if (/^\d*$/.test(v)) {
                    setFieldValue("otp", v);
                  }
                }}
              >
                <InputOTPGroup className="flex justify-start items-center gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {touched.otp && errors.otp && (
                <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
              )}
            </div>

            <div className="w-full mb-6">
              <Button
                type="submit"
                disabled={isSubmitting || verifyMut.isPending}
                text={
                  isSubmitting || verifyMut.isPending ? (
                    <LoadingSpinner size={20} />
                  ) : (
                    "Continue"
                  )
                }
                className="w-full sm:w-[70%] md:w-[50%] lg:w-[55%] py-3 sm:py-4 text-sm sm:text-base cursor-pointer"
              />
            </div>

            <div className="w-full flex justify-center">
              <OtpTimer
                email={email}
                initialTime={30}
                onResend={() => {
                  resendMut.mutate({ email });
                }}
                disabled={resendMut.isPending}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOtpView;
