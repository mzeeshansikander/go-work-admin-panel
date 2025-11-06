"use client";
import ShiftDetailsTab from "@/components/shifts/shidt-details";
import ShiftUsersTable from "@/components/shifts/shift-users-table";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import backButton from "../../../public/assets/icons/back-arrow.png";
import event_cover from "../../../public/assets/images/event_cover.png";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetShiftDetails } from "@/services/react-query/shifts/get-shift-details";
import LoaderOverlay from "@/components/common/page-loader.component";
import { useGetShiftUsers } from "@/services/react-query/shifts/get-shift-users";
import { UsersData } from "@/types/response";

interface ShiftDetailsTabProps {
  id: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  noOfSlots: string;
  availableSlots: number;
  location: string;
  shiftType: string;
  shiftTypeImage?: string;
  salaryPerHour: string;
  totalShiftCost: string;
  driversLicense: string;
  uniformRequirement: string;
  otherUniformRequirement: string | null;
  language: string[];
  shiftTasks: string[];
  shiftBenefits: { field: string; value: string }[];
  pendingUsers: number;
  pendingContractUsers: number;
  approvedUsers: number;
  event: {
    location: string;
  };
}

const ShiftDetailsView = () => {
  const [activeTab, setActiveTab] = useState<"ShiftDetails" | "UserDetails">(
    "ShiftDetails"
  );
  const [tab, setTab] = useState<string>("PENDING");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const type = useSearchParams().get("type");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(0);
  }, [searchTerm]);

  const { data: userData, isPending: userPending } = useGetShiftUsers(
    id,
    currentPage * rowsPerPage,
    rowsPerPage,
    type === "ongoing" ? tab : "CONFIRMED_CANDIDATE",
    searchTerm
  );

  const { data, isPending } = useGetShiftDetails(id);
  const rawShift = data?.[0];

  if (isPending) {
    return <LoaderOverlay />;
  }

  if (!rawShift || !rawShift.id) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Shift not found.
        </h2>
      </div>
    );
  }

  const shift: ShiftDetailsTabProps = {
    id: rawShift.id,
    name: rawShift.name,
    startDateTime: rawShift.startDateTime,
    endDateTime: rawShift.endDateTime,
    noOfSlots: rawShift.noOfSlots,
    availableSlots: rawShift.availableSlots,
    location: rawShift.event.location,
    shiftType: rawShift.shiftType,
    shiftTypeImage: rawShift.shiftTypeImage,
    salaryPerHour: rawShift.salaryPerHour,
    totalShiftCost: rawShift.totalShiftCost,
    driversLicense: rawShift.driversLicense,
    uniformRequirement: rawShift.uniformRequirement,
    otherUniformRequirement: rawShift.otherUniformRequirement,
    language: rawShift.language ?? [],
    shiftTasks: rawShift.shiftTasks ?? [],
    shiftBenefits: (rawShift.shiftBenefits ?? []).map((benefit: string) => ({
      field: benefit,
      value: benefit,
    })),
    pendingUsers: rawShift.pendingUsers ?? 0,
    pendingContractUsers: rawShift.pendingContractUsers ?? 0,
    approvedUsers: rawShift.approvedUsers ?? 0,
    event: {
      location: rawShift.event.location,
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <div
            onClick={() => router.push("/shifts")}
            className="cursor-pointer"
          >
            <Image
              src={backButton}
              alt="back"
              width={34}
              height={34}
              className="w-[34px] h-[34px]"
            />
          </div>
          <h1 className="text-[28px] font-semibold">Shift Details</h1>
        </div>
      </div>

      <div className="relative w-full aspect-3/1 mb-8 rounded-lg overflow-hidden">
        <Image
          src={shift.shiftTypeImage || event_cover}
          fill
          alt="Shift cover"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("ShiftDetails")}
            className={`w-fit rounded-lg py-2 px-6 cursor-pointer ${
              activeTab === "ShiftDetails"
                ? "bg-secondary-two text-white"
                : "bg-white text-secondary-two border border-secondary-two"
            }`}
          >
            Shift Details
          </button>
          <button
            onClick={() => setActiveTab("UserDetails")}
            className={`w-fit rounded-lg py-2 px-6 cursor-pointer ${
              activeTab === "UserDetails"
                ? "bg-secondary-two text-white"
                : "bg-white text-secondary-two border border-secondary-two"
            }`}
          >
            Candidate Details
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "ShiftDetails" ? (
          <ShiftDetailsTab shift={shift} />
        ) : (
          <div className="w-full">
            <Tabs value={tab} onValueChange={setTab}>
              {type === "ongoing" && (
                <div className="inline-flex items-center gap-6 pb-1">
                  <button
                    onClick={() => setTab("PENDING")}
                    className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                      tab === "PENDING"
                        ? "text-red-500 border-red-500 border-b-2"
                        : "text-gray-500"
                    }`}
                  >
                    Pending ({shift.pendingUsers})
                  </button>

                  <button
                    onClick={() => setTab("PENDING_CONTRACT")}
                    className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                      tab === "PENDING_CONTRACT"
                        ? "text-yellow-500 border-yellow-500 border-b-2"
                        : "text-gray-500"
                    }`}
                  >
                    Pending Contracts ({shift.pendingContractUsers})
                  </button>

                  <button
                    onClick={() => setTab("CONFIRMED_CANDIDATE")}
                    className={`text-sm cursor-pointer font-medium transition-colors pb-2 ${
                      tab === "CONFIRMED_CANDIDATE"
                        ? "text-blue-500 border-blue-500 border-b-2"
                        : "text-gray-500"
                    }`}
                  >
                    Approved ({shift.approvedUsers})
                  </button>
                </div>
              )}

              <div className="mt-6">
                <ShiftUsersTable
                  data={userData?.[0] as UsersData}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isPending={userPending}
                  shiftId={id}
                />
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftDetailsView;
