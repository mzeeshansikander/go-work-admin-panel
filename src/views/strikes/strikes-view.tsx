"use client";
import StrikesTable from "@/components/strikes/strike-table";
import Button from "@/components/ui/button";
import { useGetStrikes } from "@/services/react-query/strikes/get-all-strikes";
import { StrikesData } from "@/types/response";
import { useEffect, useState } from "react";

const StrikesView = () => {
  const [currentTab, setCurrentTab] = useState<"PENDING" | "APPROVED">(
    "PENDING"
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data, isPending } = useGetStrikes(
    currentPage,
    rowsPerPage,
    currentTab,
    searchTerm
  );

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">Strikes</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <Button
          onClick={() => {
            setCurrentTab("PENDING");
          }}
          text={"Pending"}
          className={`min-w-fit min-h-fit py-3 px-10 ${
            currentTab === "PENDING"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#626D6F]"
          } ${currentTab !== "PENDING" && "border"} cursor-pointer rounded-xl`}
        />

        <Button
          onClick={() => {
            setCurrentTab("APPROVED");
          }}
          text={"Approved"}
          className={`min-w-fit min-h-fit py-3 px-10 ${
            currentTab === "APPROVED"
              ? "bg-primary text-white"
              : "bg-white text-[#626D6F]"
          } ${currentTab !== "APPROVED" && "border"} cursor-pointer rounded-xl`}
        />
      </div>

      {/* Strikes Table */}
      <StrikesTable
        data={data?.[0] as StrikesData}
        tab={currentTab}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isPending={isPending}
      />
    </div>
  );
};

export default StrikesView;
