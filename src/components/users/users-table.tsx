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
import user from "../../../public/assets/icons/man.svg";
import SearchInput from "../ui/search-input";
import { GoStarFill } from "react-icons/go";

interface User {
  fullName: string;
  rating: number;
  email: string;
  dateOfBirth: string;
}

const dummyData: User[] = [
  {
    fullName: "Alexander Thompson",
    rating: 4.9,
    email: "alex.thompson@example.com",
    dateOfBirth: "1988-06-12",
  },
  {
    fullName: "Sophia Martinez",
    rating: 4.7,
    email: "sophia.martinez@example.com",
    dateOfBirth: "1992-09-25",
  },
  {
    fullName: "Liam Chen",
    rating: 5.0,
    email: "liam.chen@example.com",
    dateOfBirth: "1990-03-18",
  },
  {
    fullName: "Isabella Rossi",
    rating: 4.5,
    email: "isabella.rossi@example.com",
    dateOfBirth: "1995-11-04",
  },
  {
    fullName: "Noah Patel",
    rating: 4.8,
    email: "noah.patel@example.com",
    dateOfBirth: "1987-01-30",
  },
  {
    fullName: "Emma Johnson",
    rating: 4.6,
    email: "emma.j@example.com",
    dateOfBirth: "1993-07-22",
  },
];

const UsersTable: React.FC = () => {
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
              {dummyData.map((row: User, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <TableCell className="py-4 px-6 text-left">
                    <div className="flex items-center gap-2">
                      <Image
                        src={user}
                        alt="User avatar"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{row.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <div className="flex items-center gap-1">
                      <GoStarFill className="text-[#FFAA00] text-lg" />
                      <span className="font-medium">{row.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="text-gray-600">{row.email}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.dateOfBirth}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <button className="text-gray-600 cursor-pointer transition-colors">
                      <MdArrowForward className="text-2xl" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
