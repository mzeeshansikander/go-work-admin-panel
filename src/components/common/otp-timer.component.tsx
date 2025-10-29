import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OtpTimerProps {
  email?: string;
  initialTime?: number;
  onResend?: () => void;
}

const OtpTimer: React.FC<OtpTimerProps> = ({ initialTime = 30, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleResend = async () => {
    setIsResending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimeLeft(initialTime);
    setIsRunning(true);
    toast.success("Code resent successfully!");

    if (onResend) {
      onResend();
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="text-sm sm:text-base font-normal text-grey-80">
        Remaining Time:{" "}
        <span className="text-primary font-medium">
          00 : {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </span>
      </div>
      <div>
        <div className="text-sm sm:text-base font-medium text-grey-80">
          Didn&apos;t receive code?{" "}
          <span
            role="button"
            tabIndex={timeLeft > 0 || isResending ? -1 : 0}
            onClick={timeLeft > 0 || isResending ? undefined : handleResend}
            className={cn(
              "text-sm sm:text-base font-semibold text-primary cursor-pointer",
              timeLeft > 0 || isResending ? "opacity-70 cursor-not-allowed" : ""
            )}
            onKeyDown={(e) => {
              if (
                timeLeft === 0 &&
                !isResending &&
                (e.key === "Enter" || e.key === " ")
              ) {
                handleResend();
              }
            }}
            aria-disabled={timeLeft > 0 || isResending}
          >
            {isResending ? "Resending..." : "Resend"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtpTimer;
