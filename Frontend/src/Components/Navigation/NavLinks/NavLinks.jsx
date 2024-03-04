// import { NavLink } from "react-router-dom";

// import "./NavLinks.css";

// const NavLinks = () => {
//   return (
//     <ul className="nav-links">
//       <li>
//         <NavLink to="/"> Trips </NavLink>
//       </li>
//       <li>
//         <NavLink to="/about"> About </NavLink>
//       </li>
//       <li>
//         <NavLink to="/tripDetails"> Trip Details </NavLink>
//       </li>
//       <li>
//         <NavLink to="/Blog"> Blog </NavLink>
//       </li>
//       <li>
//         <NavLink to="/auth"> Authenticate </NavLink>
//       </li>

//       {/* <li>
//         <NavLink to="/contact"> Contact </NavLink>
//       </li> */}
//     </ul>
//   );
// };

// export default NavLinks;

import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <Flex as="ul" listStyleType="none" p={0} m={0} ml={8}>
      <NavItem to="/">Trips</NavItem>
      <NavItem to="/about">About</NavItem>
      <NavItem to="/tripDetails">Trip Details</NavItem>
      <NavItem to="/Blog">Blog</NavItem>
      <NavItem to="/auth">Authenticate</NavItem>
    </Flex>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <Box as="li" mr={4}>
      <ChakraLink as={NavLink} to={to} color="gray.800" textDecoration="none" _hover={{ color: "green.500" }}>
        {children}
      </ChakraLink>
    </Box>
  );
};

export default NavLinks;
