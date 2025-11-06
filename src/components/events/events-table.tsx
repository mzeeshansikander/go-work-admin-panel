"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownCompaniesData, Event, EventsData } from "@/types/response";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdArrowForward } from "react-icons/md";
import { InfiniteScrollDropdown } from "../common/infinite-scroll-dropdown";
import LoadingSpinner from "../common/loading-spinner.component";
import TableFoot from "../common/table-footer";
import SearchInput from "../ui/search-input";

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
