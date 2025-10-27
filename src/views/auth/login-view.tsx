"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import React from "react";

const LoginView = () => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start">
        <h1 className="text-[30px] text-[#212636] text-center font-bold">
          Login
        </h1>
      </div>
      <form className="flex flex-col gap-y-3 w-full mt-5 lg:ml-[200px] ml-20">
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="e.g alexjohn@example.com"
          required={true}
          className="lg:w-[75%] w-[80%] h-[42px] px-3 py-2 "
        />
        <PasswordInput
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          required={true}
          className="lg:w-[75%] w-[80%] h-[42px] px-1 py-2 "
        />
        <div className="lg:w-[75%] w-[80%] flex justify-end">
          <p
            onClick={() => {
              router.push("/forgot-password");
            }}
            className="text-primary text-[14px] font-bold cursor-pointer"
          >
            Forgot Password?
          </p>
        </div>
        <div className="lg:w-[75%] w-[80%]">
          <Button
            type="submit"
            text={"Login"}
            className="rounded-lg bg-primary p-2 mt-2 text-[15px] w-full h-[45px] text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginView;
