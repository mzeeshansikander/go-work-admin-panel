"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompaniesData, Company } from "@/types/response";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoStarFill } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import LoadingSpinner from "../common/loading-spinner.component";
import TableFoot from "../common/table-footer";
import SearchInput from "../ui/search-input";
import placeholder from "../../../public/assets/icons/individual_icon.png";

interface CompanyTableProps {
  data: CompaniesData;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isPending?: boolean;
}

const CompaniesTable: React.FC<CompanyTableProps> = ({
  data,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  searchTerm,
  setSearchTerm,
  currentPage,
  isPending,
}) => {
  const router = useRouter();

  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="w-full mb-5">
        <SearchInput
          type="text"
          placeholder="Search Companies"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isPending ? (
        <div className="w-full flex justify-center">
          <LoadingSpinner size={20} color="#0071BC" />
        </div>
      ) : data && data?.companies?.length === 0 ? (
        <p className="text-center text-black text-lg font-semibold mt-10">
          NO DATA
        </p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="py-4 px-6 text-white text-left">
                  Company Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Ratings & Reviews
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Posted Shifts
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Subscription Plan
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Location
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.companies?.map((row: Company, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <TableCell className="py-4 px-6 text-left">
                      <div className="flex items-center gap-2">
                        <Image
                          src={row?.logo || placeholder}
                          alt="User avatar"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{row?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 ml-2">
                      <div className="flex items-center gap-1">
                        <GoStarFill className="text-[#FFAA00] text-lg" />
                        <span className="font-medium">
                          {row?.rating} ({row?.reviewsCount} Reviews)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="text-gray-600">
                        {row?.postedShifts} Shifts
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.subscriptionPlan || "N/A"}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.location}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <button
                        onClick={() => {
                          router.push(`/companies/${row?.id}`);
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

export default CompaniesTable;
