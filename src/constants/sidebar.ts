import whiteDashboard from "../../public/assets/icons/white-dashboard.svg";
import blueDashboard from "../../public/assets/icons/blue-dashboard.svg";
import whiteUser from "../../public/assets/icons/white-user.svg";
import blueUser from "../../public/assets/icons/blue-user.svg";
import whiteCompany from "../../public/assets/icons/white-company.svg";
import blueCompany from "../../public/assets/icons/blue-company.svg";
import whiteEvent from "../../public/assets/icons/white-event.svg";
import blueEvent from "../../public/assets/icons/blue-event.svg";
import whiteShift from "../../public/assets/icons/white-shift.svg";
import blueShift from "../../public/assets/icons/blue-shift.svg";
import whiteStrike from "../../public/assets/icons/white-strike.svg";
import blueStrike from "../../public/assets/icons/blue-strike.svg";

export const tabs = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: whiteDashboard,
    coloredIcon: blueDashboard,
  },
  {
    name: "Users",
    link: "/users",
    icon: whiteUser,
    coloredIcon: blueUser,
  },
  {
    name: "Companies",
    link: "/companies",
    icon: whiteCompany,
    coloredIcon: blueCompany,
  },
  {
    name: "Events",
    link: "/events",
    icon: whiteEvent,
    coloredIcon: blueEvent,
  },
  {
    name: "All Shifts",
    link: "/shifts",
    icon: whiteShift,
    coloredIcon: blueShift,
  },
  {
    name: "Strike Management",
    link: "/strikes",
    icon: whiteStrike,
    coloredIcon: blueStrike,
  },
];
