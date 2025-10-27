import React, { createContext, useContext, useState } from "react";

interface ForgotPasswordContextType {
  email: string;
  otp: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
}

const ForgotPasswordContext = createContext<
  ForgotPasswordContextType | undefined
>(undefined);

export const ForgotPasswordProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  return (
    <ForgotPasswordContext.Provider value={{ email, otp, setEmail, setOtp }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error(
      "useForgotPassword must be used within a ForgotPasswordProvider"
    );
  }
  return context;
};
