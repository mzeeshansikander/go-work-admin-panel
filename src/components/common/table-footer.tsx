"use client";
import React, { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export interface TableFootI {
  rowsPerPage?: number;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  rowsOption?: number[];
  total?: number;
}

const TableFoot = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  rowsOption,
  total,
}: TableFootI) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    setCurrentPage && setCurrentPage(0);
  }, [rowsPerPage]);

  const closeDropdown = (e: MouseEvent) => {
    let target: HTMLElement | null = e.target as HTMLElement;

    while (target) {
      if (
        target.id === "dropdownCardsButton" ||
        target.classList.contains("bypass")
      ) {
        return;
      }
      target = target.parentElement;
    }

    setDropdown(false);
  };

  const getPageSequence = (
    totalItems: number,
    currentPage: number,
    rowsPerPage: number
  ): [number, number] => {
    const start = currentPage * rowsPerPage;
    const end = Math.min(start + rowsPerPage, totalItems);

    const displayStart = totalItems === 0 ? 0 : start + 1;
    const displayEnd = totalItems === 0 ? 0 : end;

    return [displayStart, displayEnd];
  };

  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  });

  const disableNext = () => {
    if (!total || !rowsPerPage || currentPage === undefined) return true;
    return (currentPage + 1) * rowsPerPage >= total;
  };

  const disablePrev = () => {
    return currentPage === 0;
  };

  return (
    <div className="h-[60px] text-[14px] w-full flex items-center justify-end px-1 md:px-6 gap-1 md:gap-6">
      <div className="flex items-center gap-1 md:gap-3">
        <p className="text-text-primary text-xs font-medium sm:text-sm">
          Rows per page:
        </p>
        <div className="relative">
          <button
            id="dropdownCardsButton"
            className="flex items-center justify-center cursor-pointer focus:ring-1 focus:outline-none focus:ring-gray-300 px-3 rounded-sm text-text-primary text-xs font-medium sm:text-sm"
            onClick={handleClick}
          >
            {rowsPerPage}
            <svg
              className="w-2.5 h-2.5 ms-3 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdown && (
            <ul className="absolute bottom-[30px] flex flex-col w-full z-10 bg-white rounded-lg shadow-md">
              {rowsOption &&
                rowsOption.map((each, index) => (
                  <button
                    className={`${
                      each === rowsPerPage ? "bg-gray-100" : "bg-white"
                    } w-full flex items-center justify-center px-4 py-1 cursor-pointer hover:bg-gray-100 ${
                      index === 0 ? "" : "border-t border-gray-200"
                    } bypass text-left`}
                    key={each}
                    onClick={() => {
                      if (setRowsPerPage) {
                        setRowsPerPage(each);
                      }
                      setDropdown(false);
                    }}
                  >
                    <p>{each}</p>
                  </button>
                ))}
            </ul>
          )}
        </div>
      </div>
      <p className="text-text-primary text-xs font-medium sm:text-sm">
        {total === 0
          ? 0
          : getPageSequence(
              total || 100,
              currentPage || 0,
              rowsPerPage || 5
            )[0]}
        -{getPageSequence(total || 100, currentPage || 0, rowsPerPage || 5)[1]}{" "}
        of {total}
      </p>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            if (
              setCurrentPage &&
              currentPage !== undefined &&
              currentPage > 0
            ) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={disablePrev()}
        >
          <BiChevronLeft
            className={`${
              disablePrev() ? "text-gray-300" : "text-text-primary"
            } cursor-pointer text-xl font-medium sm:text-2xl`}
          />
        </button>
        <button
          disabled={disableNext()}
          onClick={() => {
            if (setCurrentPage && currentPage !== undefined) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <BiChevronRight
            className={`${
              disableNext() ? "text-gray-300" : "text-text-primary"
            } cursor-pointer text-xl font-medium sm:text-2xl`}
          />
        </button>
      </div>
    </div>
  );
};

export default TableFoot;
