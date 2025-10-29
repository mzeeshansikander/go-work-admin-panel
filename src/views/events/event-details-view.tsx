"use client";

import Image from "next/image";
import React from "react";
import { MapPin } from "lucide-react";
import event_cover from "../../../public/assets/images/event_cover.png";
import ShiftsComponent from "./shifts-component";
import backButton from "../../../public/assets/icons/back-arrow.png";

const dummyEvent = {
  name: "London Music Festival 2025",
  location: "Wembley Stadium, London, UK",
  image: event_cover,
};

const EventDetailsView = () => {
  return (
    <div className="w-full mt-2 px-5 md:px-10">
      <div className="flex items-center gap-5 mb-6">
        <div className="cursor-pointer">
          <Image
            src={backButton}
            alt="back"
            width={34}
            height={34}
            className="w-[34px] h-[34px]"
          />
        </div>
        <h1 className="text-[28px] font-semibold">Event Details</h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">{dummyEvent.name}</h2>
          <div className="flex items-center gap-1">
            <MapPin className="w-[18px] h-[18px] text-primary" />
            <span className="text-md text-grey-80">{dummyEvent.location}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-3/1 mb-8 rounded-lg overflow-hidden">
        <Image
          src={dummyEvent.image}
          fill
          alt="Event cover"
          className="object-cover"
        />
      </div>

      <ShiftsComponent />
    </div>
  );
};

export default EventDetailsView;
