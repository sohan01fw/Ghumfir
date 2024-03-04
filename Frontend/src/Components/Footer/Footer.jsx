import { Box, Flex, Text} from "@chakra-ui/react";
import { useLocation, Link} from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      as="footer"
      bg="white"
      color="gray.600"
      textAlign="center"
      p={4}
      boxShadow="0 2px 6px rgba(0, 0, 0, 0.26)"
      position="fixed"
      bottom="0"
      width="100%"
      zIndex="999"
    >
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        width="100%"
        maxWidth="960px"
        mx="auto"
      >
        <Box flex={1} textAlign={{ base: "center", md: "left" }} mb={{ base: 4, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>Ghumfir</Text>
          <Text>Your Ultimate Travel Companion</Text>
        </Box>
        <Box flex={1} textAlign={{ base: "center", md: "left" }} mb={{ base: 4, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>Quick Links</Text>
          <Flex flexDirection="column">
            <Link to="/" color={pathname === "/" ? "blue.500" : "gray.600"} textDecoration="none" mb={2}>Home</Link>
            <Link to="/about" color={pathname === "/about" ? "blue.500" : "gray.600"} textDecoration="none" mb={2}>About Us</Link>
            <Link to="/Blog" color={pathname === "/Blog" ? "blue.500" : "gray.600"} textDecoration="none">Blog</Link>
          </Flex>
        </Box>
        <Box flex={1} textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>Contact Us</Text>
          <Text>Email: info@ghumfir.com</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
