"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import Dropdown from "../common/dropdown";
import SearchInput from "../ui/search-input";

const dropdownData = [
  { id: 1, name: "EventMasters Ltd." },
  { id: 2, name: "StaffPro Solutions" },
  { id: 3, name: "CrewHub Agency" },
  { id: 4, name: "ShiftSync Co." },
  { id: 5, name: "GigForce Staffing" },
  { id: 6, name: "FlexiCrew Events" },
  { id: 7, name: "PeakStaff Solutions" },
  { id: 8, name: "OnCall Crew" },
  { id: 9, name: "ProEvent Staff" },
  { id: 10, name: "EliteShift Agency" },
  { id: 11, name: "VenueCrew Ltd." },
  { id: 12, name: "StaffLink Solutions" },
  { id: 13, name: "EventForce Co." },
  { id: 14, name: "CrewConnect UK" },
  { id: 15, name: "ShiftPro Staffing" },
];

interface Event {
  name: string;
  companyName: string;
  totalSlots: number;
  postedShifts: number;
  approvedCandidates: number;
  dateOfEvent: string;
}

const dummyData: Event[] = [
  {
    name: "London Music Festival 2025",
    companyName: "EventMasters Ltd.",
    totalSlots: 120,
    postedShifts: 120,
    approvedCandidates: 98,
    dateOfEvent: "2025-08-15",
  },
  {
    name: "Tech Summit UK",
    companyName: "StaffPro Solutions",
    totalSlots: 80,
    postedShifts: 75,
    approvedCandidates: 62,
    dateOfEvent: "2025-09-22",
  },
  {
    name: "Manchester Food & Drink Fair",
    companyName: "CrewHub Agency",
    totalSlots: 90,
    postedShifts: 90,
    approvedCandidates: 90,
    dateOfEvent: "2025-10-05",
  },
  {
    name: "Glasgow Comedy Festival",
    companyName: "ShiftSync Co.",
    totalSlots: 45,
    postedShifts: 40,
    approvedCandidates: 35,
    dateOfEvent: "2025-11-12",
  },
  {
    name: "Birmingham Corporate Gala",
    companyName: "GigForce Staffing",
    totalSlots: 60,
    postedShifts: 60,
    approvedCandidates: 48,
    dateOfEvent: "2025-12-01",
  },
  {
    name: "Edinburgh Fringe Prep Week",
    companyName: "FlexiCrew Events",
    totalSlots: 150,
    postedShifts: 135,
    approvedCandidates: 110,
    dateOfEvent: "2025-07-28",
  },
  {
    name: "Cardiff Castle Open Day",
    companyName: "OnCall Crew",
    totalSlots: 30,
    postedShifts: 28,
    approvedCandidates: 28,
    dateOfEvent: "2025-06-20",
  },
  {
    name: "Bristol Harbour Festival",
    companyName: "PeakStaff Solutions",
    totalSlots: 110,
    postedShifts: 110,
    approvedCandidates: 95,
    dateOfEvent: "2025-07-19",
  },
];

const EventsTable: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full lg:w-[70%]">
          <SearchInput
            type="text"
            placeholder="Search"
            className="w-full md:w-full"
          />
        </div>

        <div className="w-full lg:w-[30%]">
          <Dropdown
            options={
              dropdownData?.map(
                (company: { id: number; name: string }) => company.name
              ) || []
            }
            value={selectedCompany}
            onChange={setSelectedCompany}
            placeholder="Company"
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
              {dummyData.map((row: Event, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="">{row.companyName}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="text-gray-600">{row.postedShifts}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.totalSlots}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left ml-8">
                    <span>{row.approvedCandidates}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.dateOfEvent}</span>
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

export default EventsTable;
