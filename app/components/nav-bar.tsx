"use client";
import React, { useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./drop-down";
import { useStore } from "@/store/index";
import { useGetUserById } from "@/hooks/useGetUserById";
import { useSession } from "next-auth/react";
import { User } from "@/types/index";

const Navbar = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const toggleIsSidebar = useStore((state) => state.toggleSidebar);
  const setCurrentUser = useStore((state)=>state.setCurrentUser)
  const session = useSession();
  const { user }: { user: User } = useGetUserById({
    id: String(session.data?.user.uid),
  });

  useEffect(()=>{
    setCurrentUser(user)
  },[user,setCurrentUser])


  return (
    <div className="flex items-center justify-between w-full h-10 sticky top-0 z-20 bg-white shadow-sm">
      <div className="p-2">
        <BiMenuAltLeft
          style={{ fontSize: "24px", transition: "0.2s" }}
          className="cursor-pointer"
          onClick={() => toggleIsSidebar()}
        />
      </div>
      {isSidebar}
      <nav className="flex"></nav>
      <DropDown />
    </div>
  );
};

export default Navbar;
