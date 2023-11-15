"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { signOut } from "next-auth/react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

const DropDown = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const handleToggleClick = () => {
    setToggle(!toggle);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <Button className="p-1" variant="text" >
            <BiMenu
              style={{ fontSize: "24px" }}
              className=""
              onClick={handleToggleClick}
            />
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            onClick={handleSignOut}
          >
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropDown;
