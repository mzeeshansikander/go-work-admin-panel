"use client";

import { format } from "date-fns";
import { CircleCheck, Clock, MapPin, Zap } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import date_icon from "../../../public/assets/icons/date_icon.png";
import event_cover from "../../../public/assets/images/event_cover.png";

const ongoingShifts = [
  {
    id: "shift_001",
    name: "Morning Setup Crew",
    shiftTypeImage: event_cover,
    salaryPerHour: "18.50",
    totalShiftCost: "740.00",
    startsAt: "2025-08-15T06:00:00Z",
    endsAt: "2025-08-15T12:00:00Z",
    location: "Main Stage Area",
    pendingDocs: 2,
    confirmCandidates: 38,
    inQueue: 5,
    startingIn: "Starts in 2 days",
    openings: 0,
  },
  {
    id: "shift_002",
    name: "Gate Security - Day 1",
    shiftTypeImage: event_cover,
    salaryPerHour: "22.00",
    totalShiftCost: "2640.00",
    startsAt: "2025-08-15T11:00:00Z",
    endsAt: "2025-08-15T23:00:00Z",
    location: "Entry Gates A-D",
    pendingDocs: 0,
    confirmCandidates: 30,
    inQueue: 0,
    startingIn: "Starts tomorrow",
    openings: 0,
  },
  {
    id: "shift_003",
    name: "Bar Staff - VIP Area",
    shiftTypeImage: event_cover,
    salaryPerHour: "20.00",
    totalShiftCost: "800.00",
    startsAt: "2025-08-16T14:00:00Z",
    endsAt: "2025-08-16T22:00:00Z",
    location: "VIP Lounge",
    pendingDocs: 3,
    confirmCandidates: 35,
    inQueue: 8,
    startingIn: "Starts in 3 days",
    openings: 5,
  },
];

const pastShifts = [
  {
    id: "shift_101",
    name: "Tech Rehearsal Crew",
    shiftTypeImage: event_cover,
    salaryPerHour: "19.00",
    totalShiftCost: "1520.00",
    startsAt: "2025-08-14T10:00:00Z",
    endsAt: "2025-08-14T18:00:00Z",
    location: "Backstage",
    pendingDocs: 0,
    confirmCandidates: 20,
    inQueue: 0,
    startingIn: "Completed",
    openings: 0,
  },
  {
    id: "shift_102",
    name: "Venue Setup Day",
    shiftTypeImage: event_cover,
    salaryPerHour: "17.00",
    totalShiftCost: "1020.00",
    startsAt: "2025-08-13T08:00:00Z",
    endsAt: "2025-08-13T16:00:00Z",
    location: "Entire Venue",
    pendingDocs: 0,
    confirmCandidates: 25,
    inQueue: 0,
    startingIn: "Completed",
    openings: 0,
  },
];

interface Shift {
  id: string;
  name: string;
  shiftTypeImage: string | StaticImageData;
  salaryPerHour: string;
  totalShiftCost: string;
  startsAt: string;
  endsAt: string;
  location: string;
  pendingDocs: number;
  confirmCandidates: number;
  inQueue: number;
  startingIn: string;
  openings: number;
}

const ShiftsComponent = () => {
  const [shiftType, setShiftType] = useState<"Ongoing Shifts" | "Past Shifts">(
    "Ongoing Shifts"
  );
  const shifts: Shift[] =
    shiftType === "Ongoing Shifts" ? ongoingShifts : pastShifts;

  const formatTime = (date: string) => format(new Date(date), "HH:mm");
  const formatDate = (date: string) => format(new Date(date), "dd/MM/yyyy");
  const calculateDuration = (start: string, end: string) => {
    const diff =
      (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60);
    return `${diff.toFixed(1)}h`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[22px] font-semibold">All Shifts</h3>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShiftType("Ongoing Shifts")}
          className={`w-fit rounded-lg p-2 ${
            shiftType === "Ongoing Shifts"
              ? "bg-secondary-two text-white border border-secondary-two"
              : "bg-white text-secondary-two border border-secondary-two"
          }`}
        >
          Ongoing Shifts
        </button>
        <button
          onClick={() => setShiftType("Past Shifts")}
          className={`w-fit rounded-lg p-2 ${
            shiftType === "Past Shifts"
              ? "bg-secondary-two text-white border border-secondary-two"
              : "bg-white text-secondary-two border border-secondary-two"
          }`}
        >
          Past Shifts
        </button>
      </div>

      {shifts.length === 0 && (
        <div className="text-center py-20 text-grey-80 text-xl font-bold">
          No shifts available
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="rounded-lg overflow-hidden flex flex-col bg-white"
          >
            <div className="relative aspect-3/2">
              <Image
                src={shift.shiftTypeImage || event_cover}
                fill
                alt={shift.name}
                className="object-cover"
              />
              {shiftType === "Ongoing Shifts" && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-secondary-two text-white text-sm rounded-sm">
                  {shift.startingIn}
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1 gap-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg flex items-center gap-1 flex-1 pr-4">
                  {shift.name}
                </h4>
                <div className="text-right">
                  <div className="text-primary font-semibold">
                    €{shift.totalShiftCost}
                  </div>
                  <div className="text-sm">({shift.salaryPerHour}/slot)</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-md font-semibold text-grey-80">
                  {shift.location}
                </span>
              </div>

              <div className="flex justify-between text-md text-grey-80">
                <div className="flex items-center gap-2">
                  <Image src={date_icon} width={20} height={20} alt="date" />
                  {formatDate(shift.startsAt)}
                </div>
                <div className="text-right">
                  {formatTime(shift.startsAt)} - {formatTime(shift.endsAt)},{" "}
                  {calculateDuration(shift.startsAt, shift.endsAt)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift.inQueue}</span>
                  <span className="text-grey-70 text-sm">In Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift.pendingDocs}</span>
                  <span className="text-grey-70 text-sm">Pending Docs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift.confirmCandidates}</span>
                  <span className="text-grey-70 text-sm">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift.openings}</span>
                  <span className="text-grey-70 text-sm">Openings</span>
                </div>
              </div>
              <button className="w-full mx-auto text-center justify-center flex text-white bg-primary px-3 py-2 rounded-lg ">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {shiftType === "Ongoing Shifts" && (
        <div className="flex justify-center mt-8">
          <button className="w-fit text-white bg-primary px-3 py-2 rounded-lg ">
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftsComponent;
