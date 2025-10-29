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

interface Company {
  name: string;
  rating: number;
  shifts: number;
  subscriptionPlan: "Tier 1" | "Tier 2" | "Tier 3" | "Enterprise";
  location: string;
}

const dummyData: Company[] = [
  {
    name: "EventMasters Ltd.",
    rating: 4.9,
    shifts: 128,
    subscriptionPlan: "Tier 3",
    location: "London, UK",
  },
  {
    name: "StaffPro Solutions",
    rating: 4.7,
    shifts: 95,
    subscriptionPlan: "Tier 2",
    location: "Manchester, UK",
  },
  {
    name: "CrewHub Agency",
    rating: 5.0,
    shifts: 210,
    subscriptionPlan: "Enterprise",
    location: "Birmingham, UK",
  },
  {
    name: "ShiftSync Co.",
    rating: 4.5,
    shifts: 67,
    subscriptionPlan: "Tier 1",
    location: "Glasgow, Scotland",
  },
  {
    name: "GigForce Staffing",
    rating: 4.8,
    shifts: 152,
    subscriptionPlan: "Tier 3",
    location: "Dublin, Ireland",
  },
  {
    name: "FlexiCrew Events",
    rating: 4.6,
    shifts: 83,
    subscriptionPlan: "Tier 2",
    location: "Edinburgh, UK",
  },
  {
    name: "PeakStaff Solutions",
    rating: 4.9,
    shifts: 189,
    subscriptionPlan: "Enterprise",
    location: "Bristol, UK",
  },
  {
    name: "OnCall Crew",
    rating: 4.4,
    shifts: 54,
    subscriptionPlan: "Tier 1",
    location: "Cardiff, Wales",
  },
];

const CompaniesTable: React.FC = () => {
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
              {dummyData.map((row: Company, index: number) => (
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
                      <span className="font-medium">{row.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="text-gray-600">{row.shifts}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.subscriptionPlan}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.location}</span>
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

export default CompaniesTable;
