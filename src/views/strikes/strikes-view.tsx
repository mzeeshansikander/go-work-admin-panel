"use client";
import StrikesTable from "@/components/strikes/strike-table";
import Button from "@/components/ui/button";
import React, { useState } from "react";

const StrikesView = () => {
  const [filter, setFitler] = useState<"pending" | "approved">("pending");

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">Strikes</p>
      </div>

      {/* Filter tabs */}
      <div className="w-full flex gap-4">
        <Button
          onClick={() => {
            setFitler("pending");
          }}
          text={"Pending"}
          className={`min-w-fit min-h-fit py-3 px-10 ${
            filter === "pending"
              ? "bg-[#F14D4D] text-white"
              : "bg-white text-[#626D6F]"
          } ${filter !== "pending" && "border"} cursor-pointer rounded-xl`}
        />

        <Button
          onClick={() => {
            setFitler("approved");
          }}
          text={"Approved"}
          className={`min-w-fit min-h-fit py-3 px-10 ${
            filter === "approved"
              ? "bg-primary text-white"
              : "bg-white text-[#626D6F]"
          } ${filter !== "approved" && "border"} cursor-pointer rounded-xl`}
        />
      </div>

      {/* Strikes Table */}
      <StrikesTable />
    </div>
  );
};

export default StrikesView;
