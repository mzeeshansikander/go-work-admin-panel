import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  field: string;
  value?: string;
  icon?: StaticImport | string;
  border_bottom?: boolean;
}

const InformationRowComponent: FC<Props> = ({
  field,
  value,
  icon,
  border_bottom = true,
}) => {
  return (
    <div
      className={`flex md:flex-row md:justify-between flex-col gap-y-3 ${
        border_bottom ? "border-b border-b-grey-10" : ""
      } py-2`}
    >
      <div className="flex flex-row items-center gap-2">
        {icon && (
          <div className="relative w-[18px] h-[18px] aspect-[1]">
            <Image fill className="aspect-[1]" alt="icon" src={icon} />
          </div>
        )}
        <div className="font-medium text-sm ">{field}</div>
      </div>
      {value && <div className="text-sm text-grey-70">{value}</div>}
    </div>
  );
};

export default InformationRowComponent;
