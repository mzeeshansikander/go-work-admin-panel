"use client";
import ShiftsTable from "@/components/shifts/shifts-table";
import { useState } from "react";

const ShiftsView = () => {
  const [filter, setFitler] = useState<"ongoing_shifts" | "past_shifts">(
    "ongoing_shifts"
  );

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Shifts</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <button
          onClick={() => {
            setFitler("ongoing_shifts");
          }}
          className={`min-w-fit min-h-fit py-3 px-8 flex gap-3 ${
            filter === "ongoing_shifts"
              ? "bg-[#6C38B2] text-white"
              : "bg-white text-[#6C38B2]"
          } ${
            filter !== "ongoing_shifts" && "border border-[#6C38B2]"
          } cursor-pointer rounded-lg`}
        >
          Ongoing Shifts
        </button>

        <button
          onClick={() => {
            setFitler("past_shifts");
          }}
          className={`min-w-fit min-h-fit py-3 px-10 flex gap-3 ${
            filter === "past_shifts"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#F14D4D]"
          } ${
            filter !== "past_shifts" && "border border-[#F14D4D]"
          } cursor-pointer rounded-lg`}
        >
          Past Shifts
        </button>
      </div>

      {/* Shifts Table */}
      <ShiftsTable />
    </div>
  );
};

export default ShiftsView;
