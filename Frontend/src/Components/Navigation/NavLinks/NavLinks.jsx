import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import AuthModel from "../../ui/AuthModel";

const NavLinks = () => {
  return (
    <Flex as="ul" listStyleType="none" p={0} m={0} ml={25} fontWeight={600}>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/hotels">Accomodation</NavItem>
      <NavItem to="/airecommend">Ai recommendation</NavItem>
      <NavItem to="/Blog">Blog</NavItem>
      <NavItem to="/about">About</NavItem>
    </Flex>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <Box as="li" mr={4}>
      <ChakraLink
        as={NavLink}
        to={to}
        color="gray.800"
        textDecoration="none"
        _hover={{ color: "green.500" }}
      >
        {children}
      </ChakraLink>
    </Box>
  );
};

export default NavLinks;
