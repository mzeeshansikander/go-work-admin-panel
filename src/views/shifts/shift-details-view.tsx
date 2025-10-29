"use client";
import ShiftDetailsTab from "@/components/shifts/shidt-details";
import ShiftUsersTable from "@/components/shifts/shift-users-table";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";
import event_cover from "../../../public/assets/images/event_cover.png";

const ShiftDetailsView = () => {
  const [activeTab, setActiveTab] = useState<"ShiftDetails" | "UserDetails">(
    "UserDetails"
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <div className="cursor-pointer">
            <Image
              src={backButton}
              alt="back"
              width={34}
              height={34}
              className="w-[34px] h-[34px]"
            />
          </div>
          <h1 className="text-[28px] font-semibold">Shift Details</h1>
        </div>
      </div>

      <div className="relative w-full aspect-3/1 mb-8 rounded-lg overflow-hidden">
        <Image
          src={event_cover}
          fill
          alt="Event cover"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("ShiftDetails")}
            className={`w-fit rounded-lg py-2 px-4 cursor-pointer ${
              activeTab === "ShiftDetails"
                ? "bg-secondary-two text-white"
                : "bg-white text-secondary-two border border-secondary-two"
            }`}
          >
            Shift Details
          </button>
          <button
            onClick={() => setActiveTab("UserDetails")}
            className={`w-fit rounded-lg py-2 px-4 cursor-pointer ${
              activeTab === "UserDetails"
                ? "bg-secondary-two text-white"
                : "bg-white text-secondary-two border border-secondary-two"
            }`}
          >
            Candidate Details
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "ShiftDetails" ? (
          <ShiftDetailsTab />
        ) : (
          <div className="w-full">
            {(() => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [tab, setTab] = useState("pending");

              return (
                <Tabs value={tab} onValueChange={setTab}>
                  <div className="inline-flex items-center gap-6 pb-1">
                    <button
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      onClick={() => setTab("pending")}
                      className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                        tab === "pending"
                          ? "text-red-500 border-red-500 border-b-2"
                          : "text-gray-500"
                      }`}
                    >
                      Pending (5)
                    </button>

                    <button
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      onClick={() => setTab("pending_contracts")}
                      className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                        tab === "pending_contracts"
                          ? "text-yellow-500 border-yellow-500  border-b-2"
                          : "text-gray-500"
                      }`}
                    >
                      Pending Contracts (2)
                    </button>

                    <button
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      onClick={() => setTab("approved")}
                      className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                        tab === "approved"
                          ? "text-blue-500 border-blue-500 border-b-2"
                          : "text-gray-500"
                      }`}
                    >
                      Approved (38)
                    </button>
                  </div>

                  <div className="mt-6">
                    <ShiftUsersTable />
                  </div>
                </Tabs>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftDetailsView;
