import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Logout } from "../../lib/Actions/ServerDeleteActions/Logout";
import { Link, useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState();
  const handleLogout = async () => {
    const res = await Logout();
    if (res) {
      localStorage.clear("user");
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    let userData = localStorage.getItem("user");
    let parseData = JSON.parse(userData);
    setuserinfo(parseData);
  }, []);

  return (
    <Menu>
      <MenuButton as={Box} backgroundColor="transparent" cursor="pointer">
        <Box>
          <Box
            whiteSpace="nowrap"
            color="gray"
            fontWeight={600}
            marginBottom="-10px"
            marginRight="30px"
          >
            Hello,
          </Box>
          <Box
            textAlign="center"
            fontSize="20px"
            whiteSpace="nowrap"
            fontWeight={700}
          >
            {userinfo?.data?.name}
          </Box>
        </Box>
      </MenuButton>
      <MenuList>
        <Link to="/userinfo">
          <MenuItem _hover={{ backgroundColor: "#f1f2f5" }}>
            My Account
          </MenuItem>
        </Link>

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
