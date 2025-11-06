"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownCompaniesData, Shift, ShiftsData } from "@/types/response";
import { formatDate } from "@/utils/format-date-time-utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdArrowForward } from "react-icons/md";
import { InfiniteScrollDropdown } from "../common/infinite-scroll-dropdown";
import TableFoot from "../common/table-footer";
import SearchInput from "../ui/search-input";
import LoadingSpinner from "../common/loading-spinner.component";

interface ShiftTableProps {
  data: ShiftsData;
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
  tab: string;
}
const ShiftsTable: React.FC<ShiftTableProps> = ({
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
  tab,
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
      ) : data && data?.shifts?.length === 0 ? (
        <p className="text-center text-black text-lg font-semibold mt-10">
          NO DATA
        </p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="py-4 px-6 text-white text-left">
                  Shift Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Event Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Company Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Start Date
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Total Slots
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Approved Candidates
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.shifts?.map((row: Shift, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.name}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="">{row?.eventName}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="text-gray-600">{row?.companyName}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.date}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left ml-8">
                      <span>{row?.slots} Slots</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.approvedCandidates} Candidates</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <button
                        onClick={() => {
                          router.push(
                            `/shifts/${row?.id}?type=${
                              tab === "ONGOING_SHIFTS" ? "ongoing" : "past"
                            }`
                          );
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

export default ShiftsTable;
