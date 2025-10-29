"use client";
import UsersTable from "@/components/users/users-table";
import React from "react";

const UsersView = () => {
  return (
    <div className="w-full md:px-10 px-5">
      <div className="flex flex-col w-full gap-5 my-5">
        <p className="text-black font-semibold text-[32px]">All Users</p>
      </div>

      {/* Users Table */}
      <UsersTable />
    </div>
  );
};

export default UsersView;
