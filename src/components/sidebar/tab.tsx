"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  name: string;
  icon: string | StaticImageData;
  link: string;
  coloredIcon?: string;
  onClicked?: () => void;
}

const Tab = ({ icon, name, link, coloredIcon, onClicked }: IProps) => {
  const path = usePathname();
  const isActive = path.includes(link);

  return (
    <Link
      href={link}
      className={`flex cursor-pointer gap-x-3 items-center rounded-md px-2 min-w-fit text-white
        ${isActive && "text-primary bg-white py-2.5"}`}
      onClick={onClicked}
    >
      <Image
        alt="dashboard"
        src={isActive ? coloredIcon || "" : icon}
        width={24}
        height={24}
      />
      <h1
        className={`${
          isActive ? "text-primary" : "text-white"
        } text-lg font-medium`}
      >
        {name}
      </h1>
    </Link>
  );
};

export default Tab;
