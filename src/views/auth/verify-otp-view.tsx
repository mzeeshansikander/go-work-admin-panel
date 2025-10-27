import OtpTimer from "@/components/common/otp-timer.component";
import Button from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import React, { useState } from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";

interface VerifyOtpViewProps {
  onNext: () => void;
  onBack: () => void;
}

const VerifyOtpView: React.FC<VerifyOtpViewProps> = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="h-full w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-8">
        <Image
          src={backButton}
          alt="Back Button"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
          onClick={onBack}
        />
      </div>

      {/* Header */}
      <div className="w-full flex flex-col justify-start mb-8">
        <h1 className="font-semibold text-2xl sm:text-3xl lg:text-[32px] mb-2">
          Verification Code
        </h1>
        <p className="text-grey-80 text-sm sm:text-base">
          Enter the code sent to abc@gmail.com
        </p>
      </div>

      {/* OTP Input Section */}
      <div className="w-full">
        <div className="w-full mb-6">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            name="otp"
            value={otp}
            onChange={(newValue) => {
              if (/^\d*$/.test(newValue)) {
                setOtp(newValue);
              }
            }}
          >
            <InputOTPGroup className="flex justify-start items-center gap-2 sm:gap-3">
              <InputOTPSlot
                index={0}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <InputOTPSlot
                index={1}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <InputOTPSlot
                index={2}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <InputOTPSlot
                index={3}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <InputOTPSlot
                index={4}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <InputOTPSlot
                index={5}
                className="bg-grey-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Continue Button */}
        <div className="w-full mb-6">
          <Button
            onClick={onNext}
            text="Continue"
            type="submit"
            className="w-full sm:w-[70%] md:w-[50%] lg:w-[55%] py-3 sm:py-4 text-sm sm:text-base"
          />
        </div>

        {/* OTP Timer */}
        <div className="w-full lg:ml-30 ml-10">
          <OtpTimer email="abc@gmail.com" initialTime={30} />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpView;
