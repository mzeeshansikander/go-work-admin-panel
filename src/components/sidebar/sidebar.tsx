"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logout from "../../../public/assets/icons/logout_icon.png";
import SidebarLogo from "../../../public/assets/icons/sidebar.svg";
import Tab from "./tab";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { tabs } from "@/constants/sidebar";

interface TabProps {
  isOpen: boolean;
  setIsOPen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOPen }: TabProps) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    router.push("/login");
    router.refresh();
  };

  return (
    <div
      className={cn(
        "p-4 py-10",
        "h-screen!",
        "custom-transition",
        "flex flex-col justify-between",
        "w-full ",
        "bg-primary",
        isOpen
          ? "absolute w-[80%] lg:relative left-0 top-0 z-999"
          : "hidden lg:flex"
      )}
    >
      <IoIosClose
        className="absolute md:hidden right-4 top-4 text-2xl text-white cursor-pointer"
        onClick={() => setIsOPen(false)}
        size={30}
      />

      <div className="space-y-10">
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <Image
            alt="logo"
            src={SidebarLogo}
            className="object-fit w-[300px] h-9"
          />
        </div>
        <div className={`space-y-6 w-full text-[#9E71E0]`}>
          {tabs.map((item, index) => (
            <Tab onClicked={() => setIsOPen(false)} key={index} {...item} />
          ))}
        </div>
      </div>

      <button onClick={handleLogout} className="mt-3 lg:mt-2">
        <Tab icon={logout} name="Logout" link="/login" />
      </button>
    </div>
  );
};

export default Sidebar;
