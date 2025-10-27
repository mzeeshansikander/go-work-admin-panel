"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";
import { useRouter } from "next/navigation";

interface ForgotPasswordViewProps {
  onNext: () => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNext }) => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col justify-center items-center border-2 px-16 ">
      <div className="w-full flex justify-start">
        <Image
          src={backButton}
          alt="Back Button"
          className="w-10 h-10 ml-3 top-1 absolute mt-10 cursor-pointer"
          onClick={() => router.push("/login")}
        />
      </div>
      <div className="w-full flex flex-col justify-start mt-3 ml-3 lg:ml-10">
        <h1 className=" font-semibold text-[32px] ">Forgot Password</h1>
        <p className="text-[#51595A] text-[16px] ">
          Enter an email that is associated with your account
        </p>
      </div>
      <form className="flex flex-col gap-y-3 w-full mt-5 ml-3 lg:ml-10">
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="e.g alexjohn@example.com"
          required={true}
          className="lg:w-[65%] w-[90%] h-14 px-3 py-2 "
        />
        <div className="lg:w-[65%] w-[90%]">
          <Button
            type="button"
            onClick={onNext}
            text={"Continue"}
            className="rounded-lg bg-primary p-2 w-full h-14 text-white cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordView;
