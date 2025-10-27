"use client";
import React from "react";
import strikeIcon from "../../../public/assets/icons/strike_icon.png";
import Image from "next/image";
import company from "../../../public/assets/icons/company-logo.svg";
import user from "../../../public/assets/icons/man.svg";
import redStrike from "../../../public/assets/icons/red-strike-icon.svg";
import whiteStrike from "../../../public/assets/icons/white-strike-icon.svg";
import Button from "@/components/ui/button";

const StrikeDetailsView = () => {
  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">Strike Details</p>
      </div>

      <div className="w-full flex gap-x-3 px-6 py-6 bg-[#FCDBDB] text-ellipsis overflow-hidden wrap-break-word rounded-md">
        <Image src={strikeIcon} alt="" className="w-4 h-6" />
        <p className="text-[#F14D4D] text-[15px]">
          Three strikes lead to Suspension. Strikes are for cancellations,
          no-shows, leaving early, or unprofessional behavior. Stay reliable to
          keep job access!
        </p>
      </div>

      {/* Strike Section */}
      <div className="w-full flex flex-col gap-y-6 mt-10">
        <div className="flex gap-3 text-[#51595A] text-[15px] md:text-[18px]">
          <Image src={company} alt="" className="w-8 h-8 rounded-full" />
          <p className="mt-1"> Strike by Zenkoders to</p>
          <Image src={user} alt="" className="w-8 h-8 rounded-full" />
          <p className="mt-1">John Doe </p>
          <div className="flex">
            <Image src={whiteStrike} alt="" className="w-8 h-8" />
            <Image src={whiteStrike} alt="" className="w-8 h-8" />
            <Image src={redStrike} alt="" className="w-8 h-8" />
          </div>
          <p className="text-black">1/3</p>
        </div>

        <div className="w-full rounded-xl border p-10 flex flex-col gap-4 text-ellipsis overflow-hidden wrap-break-word">
          <p className="font-semibold text-black text-[28px]">
            Reason for Strike:
          </p>
          <p className="text-[#51595A] text-[16px]">
            The user canceled their confirmed participation in a scheduled event
            less than 24 hours before the shift start time without providing any
            valid reason or prior notice. This caused a disruption in staffing,
            increased operational pressure on the team, and risked the quality
            of service delivered at the event. Due to the lack of accountability
            and the operational impact caused, a strike has been issued in
            accordance with our event reliability policy.
          </p>
        </div>
      </div>

      <div className="w-full flex gap-x-3 justify-end mt-5">
        <Button
          text="Accept"
          className="bg-primary min-w-fit min-h-fit rounded-md text-white py-2 px-8"
        />
        <Button
          text="Reject"
          className="bg-white border border-[#F14D4D] min-w-fit min-h-fit rounded-md text-[#F14D4D] py-2 px-8"
        />
      </div>
    </div>
  );
};

export default StrikeDetailsView;
