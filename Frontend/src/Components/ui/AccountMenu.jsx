import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Logout } from "../../lib/Actions/ServerDeleteActions/Logout";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await Logout();
    if (res) {
      localStorage.clear("user");
      navigate("/auth/login");
    }
  };

  return (
    <Menu>
      <MenuButton as={Box} backgroundColor="transparent" cursor="pointer">
        <Box>
          <MdAccountCircle fontSize={35} />
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem _hover={{ backgroundColor: "#f1f2f5" }}>My Account</MenuItem>
        <MenuItem _hover={{ backgroundColor: "#f1f2f5" }}>Payments</MenuItem>
        <MenuItem _hover={{ backgroundColor: "#f1f2f5" }}>Setting</MenuItem>
        <MenuItem
          _hover={{ backgroundColor: "#f1f2f5" }}
          onClick={handleLogout}
        >
          Logout{" "}
        </MenuItem>

        <MenuDivider />
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
