"use client";
import { CircleCheck, Clock, MapPin, Zap } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import date_icon from "../../../public/assets/icons/date_icon.png";
import event_cover from "../../../public/assets/images/event_cover.png";
import { EventShift } from "@/types/response";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/format-date-time-utils";

export interface ShiftProps {
  shifts: EventShift[];
  shiftType: "Ongoing Shifts" | "Past Shifts";
  setShiftType: React.Dispatch<
    React.SetStateAction<"Ongoing Shifts" | "Past Shifts">
  >;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const ShiftsComponent: React.FC<ShiftProps> = ({
  shifts,
  shiftType,
  setShiftType,
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  const [allShifts, setAllShifts] = useState<EventShift[]>([]);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAllShifts([]);
  }, [shiftType]);

  useEffect(() => {
    if (shifts && shifts.length > 0) {
      setAllShifts((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const newShifts = shifts.filter((s) => !existingIds.has(s.id));
        return [...prev, ...newShifts];
      });
    }
  }, [shifts]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[22px] font-semibold">All Shifts</h3>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShiftType("Ongoing Shifts")}
          className={`w-fit rounded-lg py-2 px-6 cursor-pointer transition-colors ${
            shiftType === "Ongoing Shifts"
              ? "bg-secondary-two text-white border border-secondary-two"
              : "bg-white text-secondary-two border border-secondary-two"
          }`}
        >
          Ongoing Shifts
        </button>
        <button
          onClick={() => setShiftType("Past Shifts")}
          className={`w-fit rounded-lg py-2 px-6 cursor-pointer transition-colors ${
            shiftType === "Past Shifts"
              ? "bg-secondary-two text-white border border-secondary-two"
              : "bg-white text-secondary-two border border-secondary-two"
          }`}
        >
          Past Shifts
        </button>
      </div>

      {allShifts.length === 0 && !isLoading && (
        <div className="text-center py-20 text-grey-80 text-xl font-bold">
          No shifts available
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {allShifts.map((shift) => (
          <div
            key={shift?.id}
            className="rounded-lg overflow-hidden flex flex-col bg-white border border-gray-200 shadow-sm"
          >
            <div className="relative aspect-3/2">
              <Image
                src={shift?.shiftTypeImage || event_cover}
                fill
                alt={shift?.name}
                className="object-cover"
              />
              {shiftType === "Ongoing Shifts" && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-secondary-two text-white text-sm rounded-sm">
                  {shift?.startingIn}
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1 gap-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg flex items-center gap-1 flex-1 pr-4">
                  {shift?.name}
                </h4>
                <div className="text-right">
                  <div className="text-primary font-semibold">
                    €{shift?.totalShiftCost}
                  </div>
                  <div className="text-sm text-gray-600">
                    (€{shift?.salaryPerHour}/slot)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-md font-semibold text-grey-80">
                  {shift?.location}
                </span>
              </div>

              <div className="flex justify-between text-md text-grey-80">
                <div className="flex items-center gap-2">
                  <Image src={date_icon} width={20} height={20} alt="date" />
                  {formatDate(shift?.startsAt)}
                </div>
                <div className="text-right text-sm font-medium">
                  {shift?.shiftDuration}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift?.inQueue}</span>
                  <span className="text-grey-70 text-sm">In Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift?.pendingDocs}</span>
                  <span className="text-grey-70 text-sm">Pending Docs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift?.confirmCandidates}</span>
                  <span className="text-grey-70 text-sm">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-bold">{shift?.openings}</span>
                  <span className="text-grey-70 text-sm">Openings</span>
                </div>
              </div>
              <button
                onClick={() => {
                  router.push(`/shifts/${shift?.id}`);
                }}
                className="w-full mx-auto text-center justify-center flex text-white bg-primary px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size={24} color="#0071BC" />
          <span className="ml-3 text-gray-600">Loading shifts...</span>
        </div>
      )}

      {!isLoading && hasMore && shiftType === "Ongoing Shifts" && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="w-fit text-white bg-primary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftsComponent;
