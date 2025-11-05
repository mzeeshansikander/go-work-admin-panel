"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useRef, useCallback, useEffect } from "react";
import { MdArrowForward } from "react-icons/md";
import SearchInput from "../ui/search-input";
import {
  DropdownCompaniesData,
  Event,
  EventsData,
  DropdownCompany,
} from "@/types/response";
import LoadingSpinner from "../common/loading-spinner.component";
import TableFoot from "../common/table-footer";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface EventTableProps {
  data: EventsData;
  companyData: DropdownCompaniesData;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  companyId: string;
  setCompanyId: (searchTerm: string) => void;
  isPending?: boolean;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  take: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  companyPending: boolean;
}

const InfiniteScrollDropdown = ({
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
          <MdOutlineKeyboardArrowDown className="text-gray-400" />
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
              <div className="px-4 py-2 text-gray-500">
                No companies available
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

const EventsTable: React.FC<EventTableProps> = ({
  data,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  searchTerm,
  setSearchTerm,
  currentPage,
  isPending,
  setCompanyId,
  companyId,
  setSkip,
  companyPending,
  companyData,
}) => {
  const router = useRouter();

  const handleLoadMore = useCallback(() => {
    if (companyData && companyData.companies.length < companyData.meta.total) {
      setSkip((prev) => prev + 1);
    }
  }, [companyData, setSkip]);

  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full lg:w-[70%]">
          <SearchInput
            type="text"
            placeholder="Search Events"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full lg:w-[30%]">
          <InfiniteScrollDropdown
            companyData={companyData}
            value={companyId}
            onChange={setCompanyId}
            placeholder="Select Company"
            onLoadMore={handleLoadMore}
            loading={companyPending}
          />
        </div>
      </div>

      {isPending ? (
        <div className="w-full flex justify-center py-10">
          <LoadingSpinner size={20} color="#0071BC" />
        </div>
      ) : data && data?.events?.length === 0 ? (
        <p className="text-center text-black text-lg font-semibold mt-10">
          NO DATA
        </p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="py-4 px-6 text-white text-left">
                  Event Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Company Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Total Slots
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Posted Shifts
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  All Approved Candidates
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Date Of Event
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.events?.map((row: Event, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.name}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="">{row?.companyName}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="text-gray-600">
                        {row?.postedShifts} Shifts
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.slots} Slots</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left ml-8">
                      <span>{row?.approvedCandidates} Candidates</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.date}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <button
                        onClick={() => {
                          router.push(`/events/${row?.id}`);
                        }}
                        className="text-gray-600 cursor-pointer transition-colors"
                      >
                        <MdArrowForward className="text-2xl" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
      <TableFoot
        currentPage={currentPage}
        rowsOption={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        total={data?.meta?.total ?? 10}
      />
    </div>
  );
};

export default EventsTable;
