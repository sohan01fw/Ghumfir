import {
  Box,
  Flex,
  Input,
  Image,
  Spacer,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import userLogo from "../../Assets/user_logo.png";
import ghumfirLogo from "../../Assets/Ghumfir_Logo.png";
import NavLinks from "./NavLinks/NavLinks";
import "./MainNavigation.css";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import AccountMenu from "../ui/AccountMenu";
import { useAppState } from "../../utils/Hooks/useAppState";
import { MdBuild } from "react-icons/md";
import useToken from "../../lib/useToken";
const MainNavigation = () => {
  const { state, dispatch } = useAppState();
  const { user } = state;
  useToken();
  return (
    <Flex
      as="nav"
      align="center"
      bg="white"
      boxShadow="0px 0.4px 0.1px gray"
      p={2}
      position="sticky"
      top={0}
      zIndex={999}
      width="100%"
      justifyContent="space-around"
      px={4}
    >
      <Box ml={4}></Box>

      <Box>
        <Link to="/">
          <Image src={ghumfirLogo} alt="logo" className="nav-image" />
        </Link>
      </Box>

      <NavLinks />

      <Spacer />

      <Box mr={4} width="18%">
        <Box
          zIndex={50}
          position="absolute"
          height="auto"
          padding={2}
          paddingTop={2.5}
          color="gray"
        >
          <IoMdSearch fontSize={22} />
        </Box>
        <Input
          placeholder="Search places...."
          variant="outline"
          bg="#f1f2f5"
          paddingLeft={10}
        />
      </Box>
      <Box marginRight={3} cursor="pointer">
        <IoIosNotifications fontSize={23} />
      </Box>
      {user ? (
        <AccountMenu />
      ) : (
        <Box>
          <Link to="/auth/login">
            <Button
              marginRight={3}
              marginLeft={-3}
              background="none"
              _hover={{ background: "none" }}
            >
              login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button
              colorScheme="green"
              borderRadius={20}
              _hover={{ colorScheme: "green" }}
              color="white"
            >
              Signup
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default MainNavigation;
