import { DropdownCompaniesData, DropdownCompany } from "@/types/response";
import { useState, useRef, useEffect, useCallback } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LoadingSpinner from "./loading-spinner.component";
import SearchInput from "../ui/search-input";

interface InfiniteScrollDropdownProps {
  companyData: DropdownCompaniesData | null;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onLoadMore: () => void;
  loading: boolean;
  companySearchTerm: string;
  setCompanySearchTerm: (searchTerm: string) => void;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
}

export const InfiniteScrollDropdown = ({
  companyData,
  value,
  onChange,
  placeholder,
  onLoadMore,
  loading,
  companySearchTerm,
  setCompanySearchTerm,
  setSkip,
}: InfiniteScrollDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allCompanies, setAllCompanies] = useState<DropdownCompany[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLoadingMore = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAllCompanies([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setSkip(0);
  }, [companySearchTerm]);

  useEffect(() => {
    if (companyData?.companies) {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanySearchTerm(e.target.value);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const selectedOption = allCompanies.find((opt) => opt.id === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleDropdownToggle}
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
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-gray-200">
              <SearchInput
                type="text"
                placeholder="Search companies..."
                value={companySearchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="max-h-48 overflow-y-auto"
            >
              {allCompanies.length === 0 && !loading ? (
                <div className="px-4 py-3 text-gray-500 text-center text-sm">
                  {companySearchTerm ? "No companies found" : "No Data"}
                </div>
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
                      <span className="text-sm text-gray-500">Loading...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
