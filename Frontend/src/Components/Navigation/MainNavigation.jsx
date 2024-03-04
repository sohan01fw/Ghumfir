import { Box, Flex, Input, Image, Spacer, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import ghumfirLogo from "../../Assets/Ghumfir_Logo.png";
import NavLinks from "./NavLinks/NavLinks";

const MainNavigation = () => {
  return (
    <Flex
      as="nav"
      align="center"
      boxShadow="0 2px 6px rgba(0, 0, 0, 0.26)"
      bg="gray.100"
      p={2}
      position="sticky"
      top={0}
      zIndex={999}
      width="100%"
      justifyContent="space-between"
      px={4}
    >
      <Box ml={4}></Box>

      <Box>
        <Link to="/">
          <Image src={ghumfirLogo} alt="logo" w={20} h={12} />
        </Link>
      </Box>

    
      <NavLinks />

      <Spacer />

      <Box mr={4}>
        <Input placeholder="Search" variant="outline" />
      </Box>

      <Box>
        <Image src="../../Assets/user_logo.png" alt="user" w={20} h={12} />
      </Box>
    </Flex>
  );
};

export default MainNavigation;
