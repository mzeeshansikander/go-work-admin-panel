import { calculateDuration } from "@/lib/utils";
import { formatDate, formatTime } from "@/utils/format-date-time-utils";
import React from "react";
import ShiftInformationComponent from "./shift-information";
import ShiftTasksComponent from "./shift-takes";

const shift = {
  name: "Morning Setup Crew",
  totalShiftCost: "740.00",
  salaryPerHour: "18.50",
  startDateTime: "2025-08-15T06:00:00Z",
  endDateTime: "2025-08-15T12:00:00Z",
  availableSlots: 40,
  location: "Main Stage Area",
  shiftType: "Setup",
  pendingUsers: 5,
  pendingContractUsers: 2,
  approvedUsers: 38,
  shiftTasks: [
    "Set up stage barriers",
    "Install lighting rigs",
    "Position speaker towers",
  ],
  shiftBenefits: [
    { field: "Free Meals", value: "Breakfast & Lunch" },
    { field: "Transport", value: "Shuttle from city center" },
  ],
  uniformRequirement: "BLACK_TSHIRT_AND_JEANS",
  driversLicense: "Not Required",
  language: ["English", "Spanish"],
};

const ShiftDetailsTab = () => {
  const startTime = formatTime(shift.startDateTime);
  const endTime = formatTime(shift.endDateTime);
  const duration = calculateDuration(shift.startDateTime, shift.endDateTime);

  const requirements = [
    {
      field: "Uniform Requirement",
      value:
        shift.uniformRequirement
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "",
    },
    { field: "Driving License", value: shift.driversLicense },
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
        location={shift.location}
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
