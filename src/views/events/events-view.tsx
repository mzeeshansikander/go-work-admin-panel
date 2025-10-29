"use client";
import EventsTable from "@/components/events/events-table";
import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";

const EventsView = () => {
  const [filter, setFitler] = useState<"current_events" | "past_events">(
    "current_events"
  );
  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Events</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <button
          onClick={() => {
            setFitler("current_events");
          }}
          className={`min-w-fit min-h-fit py-3 px-5 flex gap-3 ${
            filter === "current_events"
              ? "bg-[#6C38B2] text-white"
              : "bg-white text-[#6C38B2]"
          } ${
            filter !== "current_events" && "border border-[#6C38B2]"
          } cursor-pointer rounded-lg`}
        >
          <LuCalendarDays
            className={`text-[24px] ${
              filter === "current_events" ? "text-white" : "text-[#6C38B2]"
            }`}
          />
          Current Events
        </button>

        <button
          onClick={() => {
            setFitler("past_events");
          }}
          className={`min-w-fit min-h-fit py-3 px-5 flex gap-3 ${
            filter === "past_events"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#F14D4D]"
          } ${
            filter !== "past_events" && "border border-[#F14D4D]"
          } cursor-pointer rounded-lg`}
        >
          <LuCalendarDays
            className={`text-[24px] ${
              filter === "past_events" ? "text-white" : "text-[#F14D4D]"
            }`}
          />
          Past Events
        </button>
      </div>

      {/* Events Table */}
      <EventsTable />
    </div>
  );
};

export default EventsView;
