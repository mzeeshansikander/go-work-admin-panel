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
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import sort_icon from "../../../public/assets/icons/sort_icon.png";

interface TeamMember {
  name: string;
  rating: number;
  email: string;
  dateOfBirth: string;
  isCrew: boolean;
  isTeam: boolean;
}

const dummyData: TeamMember[] = [
  {
    name: "Marcus Reynolds",
    rating: 4.9,
    email: "marcus.reynolds@crewpro.com",
    dateOfBirth: "1992-04-18",
    isCrew: true,
    isTeam: true,
  },
  {
    name: "Sofia Alvarez",
    rating: 4.8,
    email: "sofia.alvarez@eventstaff.co",
    dateOfBirth: "1995-07-22",
    isCrew: true,
    isTeam: false,
  },
  {
    name: "Liam O'Connor",
    rating: 5.0,
    email: "liam.oconnor@shiftforce.ie",
    dateOfBirth: "1988-11-30",
    isCrew: false,
    isTeam: true,
  },
  {
    name: "Aisha Khan",
    rating: 4.7,
    email: "aisha.khan@staffhub.uk",
    dateOfBirth: "1993-02-14",
    isCrew: true,
    isTeam: true,
  },
  {
    name: "Daniel Park",
    rating: 4.6,
    email: "daniel.park@gigcrew.kr",
    dateOfBirth: "1990-09-05",
    isCrew: false,
    isTeam: false,
  },
  {
    name: "Elena Rossi",
    rating: 4.9,
    email: "elena.rossi@italystaff.it",
    dateOfBirth: "1991-12-01",
    isCrew: true,
    isTeam: true,
  },
  {
    name: "Jamal Washington",
    rating: 4.5,
    email: "jamal.w@uscrew.com",
    dateOfBirth: "1987-06-25",
    isCrew: true,
    isTeam: false,
  },
  {
    name: "Priya Sharma",
    rating: 4.8,
    email: "priya.sharma@indiacrew.in",
    dateOfBirth: "1994-03-10",
    isCrew: false,
    isTeam: true,
  },
];
const TeamCrewTable: React.FC = () => {
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
                  Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white flex items-center gap-2 mt-1.5">
                  <Image
                    src={sort_icon}
                    alt="sort"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  Ratings & Reviews
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Email
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Date of Birth
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Team
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Crew
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((row: TeamMember, index: number) => (
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
                      <GoStarFill className="text-[#FFAA00] text-lg ml-8" />
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
                    {row?.isTeam ? (
                      <CiCircleCheck size={18} className="text-green-500 " />
                    ) : (
                      <RxCrossCircled size={18} className="text-red-500 " />
                    )}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    {row?.isCrew ? (
                      <CiCircleCheck size={18} className="text-green-500" />
                    ) : (
                      <RxCrossCircled size={18} className="text-red-500 " />
                    )}
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

export default TeamCrewTable;
