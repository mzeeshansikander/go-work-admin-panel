"use client";
import EventsTable from "@/components/events/events-table";
import { useGetCompaniesDropdown } from "@/services/react-query/companies/get-all-companies-dropdown";
import { useGetEvents } from "@/services/react-query/events/get-all-events";
import { DropdownCompaniesData, EventsData } from "@/types/response";
import React, { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";

const EventsView = () => {
  const [filter, setFitler] = useState<"CURRENT_EVENTS" | "PAST_EVENTS">(
    "CURRENT_EVENTS"
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data, isPending } = useGetEvents(
    currentPage * rowsPerPage,
    rowsPerPage,
    filter,
    searchTerm,
    companyId
  );

  const { data: companyData, isPending: companyPending } =
    useGetCompaniesDropdown(skip * take, take);

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Events</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <button
          onClick={() => {
            setFitler("CURRENT_EVENTS");
          }}
          className={`min-w-fit min-h-fit py-3 px-5 flex gap-3 ${
            filter === "CURRENT_EVENTS"
              ? "bg-[#6C38B2] text-white"
              : "bg-white text-[#6C38B2]"
          } ${
            filter !== "CURRENT_EVENTS" && "border border-[#6C38B2]"
          } cursor-pointer rounded-lg`}
        >
          <LuCalendarDays
            className={`text-[24px] ${
              filter === "CURRENT_EVENTS" ? "text-white" : "text-[#6C38B2]"
            }`}
          />
          Current Events
        </button>

        <button
          onClick={() => {
            setFitler("PAST_EVENTS");
          }}
          className={`min-w-fit min-h-fit py-3 px-5 flex gap-3 ${
            filter === "PAST_EVENTS"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#F14D4D]"
          } ${
            filter !== "PAST_EVENTS" && "border border-[#F14D4D]"
          } cursor-pointer rounded-lg`}
        >
          <LuCalendarDays
            className={`text-[24px] ${
              filter === "PAST_EVENTS" ? "text-white" : "text-[#F14D4D]"
            }`}
          />
          Past Events
        </button>
      </div>

      {/* Events Table */}
      <EventsTable
        data={data?.[0] as EventsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        companyId={companyId}
        setCompanyId={setCompanyId}
        isPending={isPending}
        skip={skip}
        setSkip={setSkip}
        take={take}
        setTake={setTake}
        companyPending={companyPending}
        companyData={companyData?.[0] as DropdownCompaniesData}
      />
    </div>
  );
};

export default EventsView;
