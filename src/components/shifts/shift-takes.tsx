import React, { FC } from "react";
import InformationRowComponent from "./information-row.component";
import check_square_icon from "../../../public/assets/icons/check_square_icon.png";
import benefit_icon from "../../../public/assets/icons/benefit_icon.png";

interface TaskItem {
  field: string;
  value: string;
}

interface Props {
  tasks: string[] | TaskItem[];
  type: "tasks" | "benefits" | "requirements";
  title: string;
}

const ShiftTasksComponent: FC<Props> = ({ tasks, type, title }) => {
  const normalizedTasks = tasks.map((item) =>
    typeof item === "string" ? { field: item, value: "" } : item
  );

  const visibleTasks = normalizedTasks.filter(
    (item) => item.field?.trim() || item.value?.trim()
  );

  if (visibleTasks.length === 0) return null;

  return (
    <div>
      <div className="text-[22px] font-semibold my-4">{title}</div>
      <div className="border border-grey-10 rounded-md p-3">
        {visibleTasks.map((item, index) => (
          <InformationRowComponent
            key={index}
            field={item.field}
            icon={
              type === "tasks"
                ? check_square_icon
                : type === "benefits"
                ? benefit_icon
                : undefined
            }
            value={item.value}
            border_bottom={index !== visibleTasks.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ShiftTasksComponent;
