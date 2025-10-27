"use client";

// Utils
import { cn } from "@/lib/utils";

// React Imports
import { useState } from "react";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface IInput {
  label?: string;
  name?: string;
  type?: HTMLInputElement["type"];
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // Corrected type
  value?: string;
  placeholder?: string;
  error?: string | undefined; // Only the error message
  required?: boolean;
  disabled?: boolean;
}

const PasswordInput = ({
  className,
  label,
  name,
  onChange,
  error,
  onBlur,
  placeholder,
  value,
  required,
  disabled,
}: IInput) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label htmlFor={name} className="space-y-1">
      <p className="text-[#212636] text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div
        className={cn(
          "w-full h-11",
          "bg-white",
          "border border-divider",
          "rounded-lg shadow-box-shadow",
          "pr-3",
          "flex justify-between items-center",
          className,
          error && "!border-red-500", // Show red border if error exists
        )}
      >
        <input
          type={isVisible ? "text" : "password"}
          id={name} // Changed to use `name` for consistency
          name={name}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          className="w-full h-full px-3 py-2 outline-none ring-0 rounded-xl placeholder:text-sm text-[#212636]"
        />
        {isVisible ? (
          <FiEye
            color="#292D32"
            size={24}
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer"
          />
        ) : (
          <FiEyeOff
            color="#292D32"
            size={24}
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
      {/* Display error if present */}
    </label>
  );
};

export default PasswordInput;
