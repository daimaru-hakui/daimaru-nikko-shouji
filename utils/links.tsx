import { MdOutlineDashboardCustomize, MdAddTask } from "react-icons/md";
import { FaTasks, FaHistory } from "react-icons/fa";
import { RiIndentIncrease, RiIndentDecrease } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
export const menuLinks = [{}];

export const sidebarLinks = [
  {
    path: "/dashboard",
    name: "ダッシュボード",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    path: "/dashboard/orders/new",
    name: "発注入力",
    icon: <MdAddTask />,
  },
  {
    path: "/dashboard/orders",
    name: "発注履歴",
    icon: <FaHistory />,
  },
  {
    path: "/dashboard/shipping-schedules",
    name: "出荷予定（発注残）",
    icon: <SlCalender />,
  },
  {
    path: "/dashboard/shipping-histories",
    name: "出荷履歴",
    icon: <RiIndentDecrease />,
  },
  {
    path: "/dashboard/shipping-invoices",
    name: "出荷伝票",
    icon: <RiIndentDecrease />,
  },
];