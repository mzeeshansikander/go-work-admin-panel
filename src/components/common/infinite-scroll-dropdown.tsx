import { DropdownCompaniesData, DropdownCompany } from "@/types/response";
import { useState, useRef, useEffect, useCallback } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LoadingSpinner from "./loading-spinner.component";

export const InfiniteScrollDropdown = ({
  companyData,
  value,
  onChange,
  placeholder,
  onLoadMore,
  loading,
}: {
  companyData: DropdownCompaniesData | null;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onLoadMore: () => void;
  loading: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allCompanies, setAllCompanies] = useState<DropdownCompany[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);

  useEffect(() => {
    if (companyData?.companies) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setAllCompanies((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newCompanies = companyData.companies.filter(
          (c) => !existingIds.has(c.id)
        );
        return [...prev, ...newCompanies];
      });
    }
  }, [companyData]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || loading || isLoadingMore.current) return;

    const hasMore = companyData && allCompanies.length < companyData.meta.total;
    if (!hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.2) {
      isLoadingMore.current = true;
      onLoadMore();
      setTimeout(() => {
        isLoadingMore.current = false;
      }, 500);
    }
  }, [loading, companyData, allCompanies.length, onLoadMore]);

  const handleSelect = (option: DropdownCompany) => {
    onChange(option.id);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const selectedOption = allCompanies.find((opt) => opt.id === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedOption && (
            <span
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            >
              ×
            </span>
          )}
          <MdOutlineKeyboardArrowDown className="text-gray-400 text-[24px]" />
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {allCompanies.length === 0 && !loading ? (
              <div className="px-4 py-2 text-gray-500">No Data</div>
            ) : (
              <>
                {allCompanies.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors ${
                      value === option.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : ""
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
                {loading && (
                  <div className="px-4 py-3 flex items-center justify-center gap-2 bg-gray-50">
                    <LoadingSpinner size={16} color="#0071BC" />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
