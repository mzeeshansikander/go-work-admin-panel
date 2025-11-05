"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import event_cover from "../../../public/assets/images/event_cover.png";
import ShiftsComponent from "./shifts-component";
import backButton from "../../../public/assets/icons/back-arrow.png";
import { useParams, useRouter } from "next/navigation";
import { useGetEventDetails } from "@/services/react-query/events/get-event-details";
import LoaderOverlay from "@/components/common/page-loader.component";

const EventDetailsView = () => {
  const [skip, setSkip] = useState<number>(0);
  const take = 10;
  const [shiftType, setShiftType] = useState<"Ongoing Shifts" | "Past Shifts">(
    "Ongoing Shifts"
  );
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isPending } = useGetEventDetails(id, skip, take, shiftType);

  const eventData = data?.[0];

  const handleLoadMore = () => {
    if (eventData?.eventShifts) {
      const { shifts, meta } = eventData.eventShifts;
      if (shifts.length < meta.total) {
        setSkip((prev) => prev + take);
      }
    }
  };

  const hasMore = eventData?.eventShifts
    ? eventData.eventShifts.shifts.length < eventData.eventShifts.meta.total
    : false;

  if (isPending) {
    return <LoaderOverlay />;
  }

  return (
    <div className="w-full mt-2 px-5 md:px-10">
      <div className="flex items-center gap-5 mb-6">
        <div
          onClick={() => {
            router.push("/events");
          }}
          className="cursor-pointer"
        >
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
          <h2 className="text-xl font-semibold">{eventData?.event?.name}</h2>
          <div className="flex items-center gap-1">
            <MapPin className="w-[18px] h-[18px] text-primary" />
            <span className="text-md text-grey-80">
              {eventData?.event?.location}
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-3/1 mb-8 rounded-lg overflow-hidden">
        <Image
          src={eventData?.event?.image || event_cover}
          fill
          alt="Event cover"
          className="object-cover"
        />
      </div>

      <ShiftsComponent
        shifts={eventData?.eventShifts?.shifts || []}
        shiftType={shiftType}
        setShiftType={setShiftType}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={isPending}
      />
    </div>
  );
};

export default EventDetailsView;
