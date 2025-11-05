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
import { formatDate } from "@/utils/format-date-time-utils";

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

interface Shift {
  name: string;
  eventName: string;
  companyName: string;
  startDate: string;
  totalSlots: number;
  approvedCandidates: number;
}

const dummyData: Shift[] = [
  {
    name: "Morning Setup Crew",
    eventName: "London Music Festival 2025",
    companyName: "EventMasters Ltd.",
    startDate: "2025-08-15T06:00",
    totalSlots: 40,
    approvedCandidates: 38,
  },
  {
    name: "Gate Security - Day 1",
    eventName: "London Music Festival 2025",
    companyName: "EventMasters Ltd.",
    startDate: "2025-08-15T11:00",
    totalSlots: 30,
    approvedCandidates: 30,
  },
  {
    name: "VIP Hospitality",
    eventName: "Tech Summit UK",
    companyName: "StaffPro Solutions",
    startDate: "2025-09-22T08:30",
    totalSlots: 20,
    approvedCandidates: 18,
  },
  {
    name: "Stage Hands - Afternoon",
    eventName: "Manchester Food & Drink Fair",
    companyName: "CrewHub Agency",
    startDate: "2025-10-05T12:00",
    totalSlots: 25,
    approvedCandidates: 25,
  },
  {
    name: "Night Cleanup Crew",
    eventName: "Glasgow Comedy Festival",
    companyName: "ShiftSync Co.",
    startDate: "2025-11-12T22:00",
    totalSlots: 15,
    approvedCandidates: 12,
  },
  {
    name: "Registration Desk",
    eventName: "Birmingham Corporate Gala",
    companyName: "GigForce Staffing",
    startDate: "2025-12-01T17:00",
    totalSlots: 10,
    approvedCandidates: 10,
  },
  {
    name: "Bar Staff - Main Stage",
    eventName: "Edinburgh Fringe Prep Week",
    companyName: "FlexiCrew Events",
    startDate: "2025-07-28T14:00",
    totalSlots: 35,
    approvedCandidates: 32,
  },
  {
    name: "Crowd Control - Entry",
    eventName: "Cardiff Castle Open Day",
    companyName: "OnCall Crew",
    startDate: "2025-06-20T09:00",
    totalSlots: 12,
    approvedCandidates: 12,
  },
  {
    name: "Tech Support - AV Team",
    eventName: "Bristol Harbour Festival",
    companyName: "PeakStaff Solutions",
    startDate: "2025-07-19T10:00",
    totalSlots: 18,
    approvedCandidates: 15,
  },
  {
    name: "Runners & Logistics",
    eventName: "London Music Festival 2025",
    companyName: "EventMasters Ltd.",
    startDate: "2025-08-15T08:00",
    totalSlots: 20,
    approvedCandidates: 19,
  },
];

const ShiftsTable: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  return (
    <div className="p-6 border rounded-lg mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full lg:w-[70%]">
          <SearchInput
            type="text"
            placeholder="Search Shift"
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
                  Shift Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Event Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Company Name
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Start Date
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Total Slots
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  Approved Candidates
                </TableHead>
                <TableHead className="py-4 px-6 text-white text-left">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((row: Shift, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="">{row.eventName}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span className="text-gray-600">{row.companyName}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{formatDate(row.startDate)}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left ml-8">
                    <span>{row.totalSlots} Slots</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-left">
                    <span>{row.approvedCandidates} Candidates</span>
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

export default ShiftsTable;
