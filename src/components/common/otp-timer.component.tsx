"use client";
import { useEffect, useState } from "react";

interface Props {
  email: string;
  initialTime: number;
  onResend: () => void;
  disabled?: boolean;
}

const OtpTimer: React.FC<Props> = ({ initialTime, onResend, disabled }) => {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    if (seconds === 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const resend = () => {
    setSeconds(initialTime);
    onResend();
  };

  return (
    <div className="flex md:-ml-[360px] gap-2 text-sm">
      {seconds > 0 ? (
        <>
          <span className="cursor-pointer">Resend code in</span>
          <span className="font-medium">{seconds}s</span>
        </>
      ) : (
        <button
          type="button"
          onClick={resend}
          disabled={disabled}
          className="text-primary underline disabled:opacity-50 cursor-pointer"
        >
          Resend
        </button>
      )}
    </div>
  );
};

export default OtpTimer;
