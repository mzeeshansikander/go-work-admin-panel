"use client";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const LayoutView = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full bg-white">
      <div className="lg:w-[18%] md:block ">
        <Sidebar isOpen={isOpen} setIsOPen={setIsOpen} />
      </div>
      <div className="bg-primary-bg w-full flex flex-col items-end">
        <div className="w-full flex justify-end">
          <HiMenuAlt3
            className={`lg:hidden cursor-pointer text-primary mt-6 mr-4 ${
              isOpen && "hidden"
            }`}
            size={30}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="py-6 h-[94.5dvh] overflow-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutView;
