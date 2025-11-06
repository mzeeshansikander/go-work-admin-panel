import { calculateDuration } from "@/lib/utils";
import { formatDate, formatTime } from "@/utils/format-date-time-utils";
import React from "react";
import ShiftInformationComponent from "./shift-information";
import ShiftTasksComponent from "./shift-takes";

interface ShiftDetailsTabProps {
  shift: {
    id: string;
    name: string;
    startDateTime: string;
    endDateTime: string;
    noOfSlots: string;
    availableSlots: number;
    shiftType: string;
    shiftTypeImage?: string;
    salaryPerHour: string;
    totalShiftCost: string;
    driversLicense: string;
    uniformRequirement: string;
    otherUniformRequirement: string | null;
    language: string[];
    shiftTasks: string[];
    shiftBenefits: { field: string; value: string }[];
    pendingUsers: number;
    pendingContractUsers: number;
    approvedUsers: number;
    event: {
      location: string;
    };
  };
}

const ShiftDetailsTab: React.FC<ShiftDetailsTabProps> = ({ shift }) => {
  const startTime = formatTime(shift.startDateTime);
  const endTime = formatTime(shift.endDateTime);
  const duration = calculateDuration(shift.startDateTime, shift.endDateTime);

  const requirements = [
    {
      field: "Uniform Requirement",
      value:
        shift.uniformRequirement
          ?.replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "Not specified",
    },
    { field: "Driving License", value: shift.driversLicense || "Not required" },
    { field: "Language", value: shift.language.join(", ") },
  ];

  return (
    <div className="space-y-6">
      <ShiftInformationComponent
        name={shift.name}
        totalShiftCost={shift.totalShiftCost}
        salaryPerHour={shift.salaryPerHour}
        date={`${formatDate(shift.startDateTime)} - ${formatDate(
          shift.endDateTime
        )}`}
        time={`${startTime} - ${endTime}`}
        duration={duration}
        noOfSlots={`Slots available: ${shift.availableSlots}`}
        location={shift.event.location}
        shiftType={shift.shiftType}
        pendingUsers={String(shift.pendingUsers)}
        pendingContract={String(shift.pendingContractUsers)}
        approvedUsers={String(shift.approvedUsers)}
      />

      {shift.shiftTasks.length > 0 && (
        <ShiftTasksComponent
          title="Shift Tasks"
          type="tasks"
          tasks={shift.shiftTasks}
        />
      )}

      {shift.shiftBenefits.length > 0 && (
        <ShiftTasksComponent
          title="Shift Benefits"
          type="benefits"
          tasks={shift.shiftBenefits}
        />
      )}

      <ShiftTasksComponent
        title="Shift Requirements"
        type="requirements"
        tasks={requirements}
      />
    </div>
  );
};

export default ShiftDetailsTab;
