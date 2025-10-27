// Utils
import { cn } from "@/lib/utils";

// React
import React from "react";

export interface IInput {
  label?: string;
  name?: string;
  type?: HTMLInputElement["type"];
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // Corrected type
  value?: string | number;
  placeholder?: string;
  error?: string | undefined; // Only the error message
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  className,
  label,
  name,
  type,
  onChange,
  error,
  onBlur,
  placeholder,
  required,
  value,
  disabled,
}: IInput) => {
  return (
    <label htmlFor={name} className="space-y-2 flex flex-col">
      <p className="text-[#212636] font-semibold text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onBlur={onBlur}
        className={cn(
          "w-full h-11",
          "outline-none ring-0 border border-divider",
          "rounded-lg shadow-box-shadow",
          "px-3 py-2 placeholder:text-sm text-[#212636]",
          className,
          error && "!border-red-500", // Show red border if error exists
        )}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
      {/* Display error if present */}
    </label>
  );
};

export default Input;
