"use client";
import { ForgotPasswordProvider } from "@/context/forgot-password-context";
import ForgotPasswordView from "@/views/auth/forgot-password-view";
import ResetPasswordView from "@/views/auth/reset-password-view";
import VerifyOtpView from "@/views/auth/verify-otp-view";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [view, setView] = useState<"forgot" | "verify" | "reset">("forgot");
  return (
    <ForgotPasswordProvider>
      {view === "forgot" && (
        <ForgotPasswordView onNext={() => setView("verify")} />
      )}
      {view === "verify" && (
        <VerifyOtpView
          onBack={() => setView("forgot")}
          onNext={() => setView("reset")}
        />
      )}
      {view === "reset" && <ResetPasswordView />}
    </ForgotPasswordProvider>
  );
};

export default ForgotPassword;
