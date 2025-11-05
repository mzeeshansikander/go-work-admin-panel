import Image from "next/image";
import React, { FC } from "react";
import benefit from "../../../public/assets/icons/benefit_icon.png";

interface Props {
  title?: string;
  info_arr?: string[];
}

const OtherInfoComponent: FC<Props> = ({ title, info_arr }) => {
  return (
    <div className="my-2">
      <div className="text-sm text-grey-60">{title}</div>
      {info_arr &&
        info_arr?.map((info, index) => (
          <div
            key={index}
            className={`${
              index !== info_arr?.length - 1 ? "border-b border-grey-10" : ""
            } py-2.5 flex flex-row gap-2 items-center`}
          >
            <div className="relative aspect-square w-[22px] h-[22px]">
              <Image fill src={benefit} alt="icon" />
            </div>
            <div className="text-grey-100 text-sm font-medium">{info}</div>
          </div>
        ))}
    </div>
  );
};

export default OtherInfoComponent;
