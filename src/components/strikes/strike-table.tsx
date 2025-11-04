"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Strike, StrikesData } from "@/types/response";
import { formatDate } from "@/utils/format-date-time-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForward } from "react-icons/md";
import LoadingSpinner from "../common/loading-spinner.component";
import TableFoot from "../common/table-footer";
import SearchInput from "../ui/search-input";
import placeholder from "../../../public/assets/icons/individual_icon.png";

interface StrikeTableProps {
  data: StrikesData;
  tab: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isPending?: boolean;
}

const StrikesTable: React.FC<StrikeTableProps> = ({
  data,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  searchTerm,
  setSearchTerm,
  currentPage,
  isPending,
  tab,
}) => {
  const router = useRouter();
  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="w-full mb-5">
        <SearchInput
          type="text"
          placeholder="Search"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isPending ? (
        <div className="w-full flex justify-center">
          <LoadingSpinner size={20} color="#0071BC" />
        </div>
      ) : data && data?.strikes?.length === 0 ? (
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
                  Date
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  User Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left truncate max-w-[200px]">
                  Reason
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.strikes?.map((row: Strike, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <TableCell className="py-4 px-6 text-left flex gap-2">
                      <Image
                        src={row?.companyLogo || placeholder}
                        alt=""
                        className="w-6 h-6 rounded-full"
                        height={24}
                        width={24}
                      />
                      <p className="mt-0.5"> {row?.companyName}</p>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      {formatDate(row?.date)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left flex gap-2">
                      <Image
                        src={row?.userProfile || placeholder}
                        alt=""
                        className="w-6 h-6 rounded-full"
                        height={24}
                        width={24}
                      />
                      <p className="mt-0.5"> {row?.userName}</p>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left truncate max-w-[200px]">
                      {row?.reason}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <MdArrowForward
                        onClick={() => {
                          router.push(`/strikes/${row?.userId}?status=${tab}`);
                        }}
                        className="text-[24px] ml-1 cursor-pointer"
                      />
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

export default StrikesTable;
