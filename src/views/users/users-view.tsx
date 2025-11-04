"use client";
import UsersTable from "@/components/users/users-table";
import { useGetUsers } from "@/services/react-query/users/get-all-users";
import { UsersData } from "@/types/response";
import React, { useEffect, useState } from "react";

const UsersView = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data, isPending } = useGetUsers(currentPage, rowsPerPage, searchTerm);

  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Users</p>
      </div>

      {/* Users Table */}
      <UsersTable
        data={data?.[0] as UsersData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isPending={isPending}
      />
    </div>
  );
};

export default UsersView;
