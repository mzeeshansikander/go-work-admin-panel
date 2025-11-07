"use client";
import ShiftsTable from "@/components/shifts/shifts-table";
import { useGetCompaniesDropdown } from "@/services/react-query/companies/get-all-companies-dropdown";
import { useGetShifts } from "@/services/react-query/shifts/get-all-shifts";
import { DropdownCompaniesData, ShiftsData } from "@/types/response";
import { useEffect, useState } from "react";

const ShiftsView = () => {
  const [filter, setFitler] = useState<"ONGOING_SHIFTS" | "PAST_SHIFTS">(
    "ONGOING_SHIFTS"
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [companySearchTerm, setCompanySearchTerm] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data, isPending } = useGetShifts(
    currentPage * rowsPerPage,
    rowsPerPage,
    filter,
    searchTerm,
    companyId
  );

  const { data: companyData, isPending: companyPending } =
    useGetCompaniesDropdown(skip * take, take, companySearchTerm);

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Shifts</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <button
          onClick={() => {
            setFitler("ONGOING_SHIFTS");
          }}
          className={`min-w-fit min-h-fit py-3 px-8 flex gap-3 ${
            filter === "ONGOING_SHIFTS"
              ? "bg-[#6C38B2] text-white"
              : "bg-white text-[#6C38B2]"
          } ${
            filter !== "ONGOING_SHIFTS" && "border border-[#6C38B2]"
          } cursor-pointer rounded-lg`}
        >
          Ongoing Shifts
        </button>

        <button
          onClick={() => {
            setFitler("PAST_SHIFTS");
          }}
          className={`min-w-fit min-h-fit py-3 px-10 flex gap-3 ${
            filter === "PAST_SHIFTS"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#F14D4D]"
          } ${
            filter !== "PAST_SHIFTS" && "border border-[#F14D4D]"
          } cursor-pointer rounded-lg`}
        >
          Past Shifts
        </button>
      </div>

      {/* Shifts Table */}
      <ShiftsTable
        data={data?.[0] as ShiftsData}
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
        tab={filter}
        companySearchTerm={companySearchTerm}
        setCompanySearchTerm={setCompanySearchTerm}
      />
    </div>
  );
};

export default ShiftsView;
