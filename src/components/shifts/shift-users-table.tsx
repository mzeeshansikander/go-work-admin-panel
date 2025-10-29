"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdArrowForward } from "react-icons/md";
import SearchInput from "../ui/search-input";
import Image from "next/image";
import user from "../../../public/assets/icons/man.svg";
import { GoStarFill } from "react-icons/go";

interface ShiftUser {
  name: string;
  rating: number;
  reviews: number;
  email: string;
  dateOfBirth: string;
}

const dummyData: ShiftUser[] = [
  {
    name: "Marcus Reynolds",
    rating: 4.9,
    reviews: 142,
    email: "marcus.reynolds@crewmail.com",
    dateOfBirth: "1992-04-18",
  },
  {
    name: "Sofia Alvarez",
    rating: 4.8,
    reviews: 98,
    email: "sofia.alvarez@staffhub.co",
    dateOfBirth: "1995-07-22",
  },
  {
    name: "Liam O'Connor",
    rating: 5.0,
    reviews: 210,
    email: "liam.oconnor@gigforce.ie",
    dateOfBirth: "1988-11-30",
  },
  {
    name: "Aisha Khan",
    rating: 4.7,
    reviews: 67,
    email: "aisha.khan@eventcrew.uk",
    dateOfBirth: "1993-02-14",
  },
  {
    name: "Daniel Park",
    rating: 4.6,
    reviews: 54,
    email: "daniel.park@shiftpro.kr",
    dateOfBirth: "1990-09-05",
  },
  {
    name: "Elena Rossi",
    rating: 4.9,
    reviews: 88,
    email: "elena.rossi@italyevents.it",
    dateOfBirth: "1991-12-01",
  },
  {
    name: "Jamal Washington",
    rating: 4.5,
    reviews: 45,
    email: "jamal.w@usstaffing.com",
    dateOfBirth: "1987-06-25",
  },
  {
    name: "Priya Sharma",
    rating: 4.8,
    reviews: 73,
    email: "priya.sharma@indiacrew.in",
    dateOfBirth: "1994-03-10",
  },
  {
    name: "Noah Schmidt",
    rating: 4.9,
    reviews: 115,
    email: "noah.schmidt@deutschstaff.de",
    dateOfBirth: "1990-08-17",
  },
  {
    name: "Isabella Costa",
    rating: 4.7,
    reviews: 60,
    email: "isabella.costa@brcrew.br",
    dateOfBirth: "1993-05-29",
  },
];

const ShiftUsersTable: React.FC = () => {
  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full">
          <SearchInput
            type="text"
            placeholder="Search"
            className="w-full md:w-full"
          />
        </div>
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
                  First Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Ratings and Reviews
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
              {dummyData.map((row: ShiftUser, index: number) => (
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
                      <span>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <div className="flex items-center gap-1">
                      <GoStarFill className="text-[#FFAA00] text-lg" />
                      <span className="font-medium">
                        {row.rating} ({row.reviews} Reviews)
                      </span>
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

export default ShiftUsersTable;
