import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options?: string[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex lg:flex-row flex-col lg:justify-between">
      <div className="relative w-full" ref={dropdownRef}>
        <div
          className="flex justify-between items-center w-full h-[45px] px-3 border border-gray-300 rounded-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`${
              value ? "text-[#25292A]" : "text-[#626D6F]"
            } truncate`}
          >
            {value || placeholder}
          </span>
          <ChevronDownIcon className="w-5 h-5 text-gray-500 shrink-0" />
        </div>

        {isOpen && (
          <ul className="absolute mt-1 h-fit max-h-[100px] overflow-y-auto w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
            {options && options?.length > 0
              ? options?.map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 text-[#25292A] truncate hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))
              : "No data"}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
