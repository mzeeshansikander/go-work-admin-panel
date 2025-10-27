"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchInput from "../ui/search-input";
import { MdArrowForward } from "react-icons/md";
import company from "../../../public/assets/icons/company-logo.svg";
import user from "../../../public/assets/icons/man.svg";
import Image from "next/image";

interface Strike {
  companyName: string;
  date: string;
  userName: string;
  reason: string;
}

const dummyData: Strike[] = [
  {
    companyName: "SportsCorp",
    date: "2025-10-01",
    userName: "John Doe",
    reason: "Match officiation",
  },
  {
    companyName: "EliteRefs",
    date: "2025-10-05",
    userName: "Jane Smith",
    reason: "Tournament supervision",
  },
  {
    companyName: "ProLeague",
    date: "2025-10-10",
    userName: "Mike Johnson",
    reason: "Event coordination",
  },
  {
    companyName: "GamePlan Inc.",
    date: "2025-10-15",
    userName: "Emily Davis",
    reason: "Referee training",
  },
];

const StrikesTable: React.FC = () => {
  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="w-full mb-5">
        <SearchInput type="text" placeholder="Search" className="w-full" />
      </div>
      {dummyData.length === 0 ? (
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
                <TableHead className="py-4 px-6 text-white text-left">
                  Reason
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((row: Strike, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <TableCell className="py-4 px-6 text-left flex gap-2">
                    <Image
                      src={company}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="mt-0.5"> {row.companyName}</p>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    {row.date}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left flex gap-2">
                    <Image src={user} alt="" className="w-6 h-6 rounded-full" />
                    <p className="mt-0.5"> {row.userName}</p>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left truncate">
                    {row.reason}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <MdArrowForward className="text-[24px] ml-1 text-bacl" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* <TableFoot
        currentPage={currentPage}
        rowsOption={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        total={data?.meta?.total ?? 10}
      /> */}
    </div>
  );
};

export default StrikesTable;
