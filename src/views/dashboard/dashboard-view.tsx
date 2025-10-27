"use client";
import React from "react";
import candidates from "../../../public/assets/icons/candidates.svg";
import companies from "../../../public/assets/icons/companies.svg";
import events from "../../../public/assets/icons/events.svg";
import Image from "next/image";
import SubscribedCompaniesChart from "@/components/dashboard/companies-line-chart";
import EventStatusChart from "@/components/dashboard/event-status-donut";
import AverageRatingsChart from "@/components/dashboard/ratings-donut-chart";

const DashboardView = () => {
  return (
    <div className="w-full md:px-10 px-5">
      {/* Common Header */}
      <div className="flex flex-col w-full gap-5">
        <p className="text-black font-semibold text-[32px]">Welcome!</p>
        <hr className="w-full text-black " />
      </div>

      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
        <div className="rounded-xl bg-[#0071BC0D] py-15 pl-10">
          <div className="flex gap-x-3">
            <Image src={candidates} alt="" className="h-16 w-16" />
            <div className="flex flex-col mt-1">
              <p className="text-[15px] text-[#6C737F]">Total Candidates</p>
              <p className="text-[28px] text-[#111927] font-semibold">
                100,000
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#6C38B20D] py-15 pl-10">
          <div className="flex gap-x-3">
            <Image src={companies} alt="" className="h-16 w-16" />
            <div className="flex flex-col mt-1">
              <p className="text-[15px] text-[#6C737F]">Total Companies</p>
              <p className="text-[28px] text-[#111927] font-semibold">80</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#0071BC0D] py-15 pl-10">
          <div className="flex gap-x-3">
            <Image src={events} alt="" className="h-16 w-16" />
            <div className="flex flex-col mt-1">
              <p className="text-[15px] text-[#6C737F]">Total Events</p>
              <p className="text-[28px] text-[#111927] font-semibold">
                100,000
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 mt-5">
        <SubscribedCompaniesChart />
        <EventStatusChart />
      </div>

      <div className="w-full mt-5">
        <AverageRatingsChart />
      </div>
    </div>
  );
};

export default DashboardView;
