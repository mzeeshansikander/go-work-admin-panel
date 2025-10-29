import React, { FC } from "react";
import InformationRowComponent from "./information-row.component";
import date_icon from "../../../public/assets/icons/date_icon.png";
import time_icon from "../../../public/assets/icons/time_icon.png";
import profile_icon from "../../../public/assets/icons/profile_icon.png";
import shift_icon from "../../../public/assets/icons/shift_icon.png";
import contract_icon from "../../../public/assets/icons/contract_icon.png";
import tick_icon from "../../../public/assets/icons/tick_icon.png";

interface Props {
  date: string;
  time: string;
  duration: string;
  noOfSlots: string;
  location: string;
  shiftType: string;
  pendingUsers: string;
  pendingContract: string;
  approvedUsers: string;
  name: string;
  totalShiftCost: string;
  salaryPerHour: string;
}

const ShiftInformationComponent: FC<Props> = ({
  date,
  time,
  duration,
  noOfSlots,
  location,
  shiftType,
  pendingUsers,
  pendingContract,
  approvedUsers,
  name,
  totalShiftCost,
  salaryPerHour,
}) => {
  return (
    <div>
      <div className="flex items-center gap-1 my-4">
        <div className="text-[22px] font-semibold flex items-center gap-4">
          {name}{" "}
          <span className="text-primary font-bold">(€{totalShiftCost})</span>
        </div>
        <div className="text-[14px] font-medium">({salaryPerHour}/slot)</div>
      </div>
      <div className="border border-grey-10 rounded-md p-3">
        <InformationRowComponent field="Date" icon={date_icon} value={date} />
        <InformationRowComponent field="Time" icon={time_icon} value={time} />
        <InformationRowComponent
          field="Duration"
          icon={time_icon}
          value={duration}
        />
        <InformationRowComponent
          field="Number of Slots"
          icon={profile_icon}
          value={noOfSlots}
        />
        <InformationRowComponent
          field="Location"
          icon={time_icon}
          value={location}
        />
        <InformationRowComponent
          field="Shift Type"
          icon={shift_icon}
          value={shiftType}
        />
        <InformationRowComponent
          field="Pending Users"
          icon={time_icon}
          value={pendingUsers}
        />
        <InformationRowComponent
          field="Pending User Contracts"
          icon={contract_icon}
          value={pendingContract}
        />
        <InformationRowComponent
          field="Approved Users"
          icon={tick_icon}
          value={approvedUsers}
          border_bottom={false}
        />
      </div>
    </div>
  );
};

export default ShiftInformationComponent;
