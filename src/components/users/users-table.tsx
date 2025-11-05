"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import placeholder from "../../../public/assets/icons/individual_icon.png";
import SearchInput from "../ui/search-input";
import { GoStarFill } from "react-icons/go";
import { User, UsersData } from "@/types/response";
import LoadingSpinner from "../common/loading-spinner.component";
import TableFoot from "../common/table-footer";
import { useRouter } from "next/navigation";

interface UserTableProps {
  data: UsersData;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isPending?: boolean;
}

const UsersTable: React.FC<UserTableProps> = ({
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
      ) : data && data?.users?.length === 0 ? (
        <p className="text-center text-black text-lg font-semibold mt-10">
          NO DATA
        </p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="py-4 px-6 text-white text-left">
                  Full Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Ratings & Reviews
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Email Address
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Date Of Birth
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.users?.map((row: User, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <TableCell className="py-4 px-6 text-left">
                      <div className="flex items-center gap-2">
                        <Image
                          src={row?.profilePicture || placeholder}
                          alt="User avatar"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{row?.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <div className="flex items-center gap-1">
                        <GoStarFill className="text-[#FFAA00] text-lg" />
                        <span className="font-medium">
                          {row?.rating} ({row?.reviewsCount} Reviews)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span className="text-gray-600">{row?.email}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <span>{row?.dob}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-left">
                      <button
                        onClick={() => {
                          router.push(`/users/${row?.id}?fromShift=false`);
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

export default UsersTable;
