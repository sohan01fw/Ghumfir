import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Flex
      as="footer"
      bg="green.600"
      color="white"
      textAlign="center"
      p={6}
      boxShadow="0 2px 6px rgba(0, 0, 0, 0.26)"
      width="100%"
      mt="auto"
    >
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        width="100%"
        maxWidth="960px"
        mx="auto"
      >
        <Box
          flex={1}
          textAlign={{ base: "center", md: "left" }}
          mb={{ base: 4, md: 0 }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Ghumfir
          </Text>
          <Text fontSize="md" fontWeight="bold">Your Ultimate Travel Companion</Text>
        </Box>
        <Box
          flex={1}
          textAlign={{ base: "center", md: "left" }}
          mb={{ base: 4, md: 0 }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Quick Links
          </Text>
          <Flex flexDirection="column">
            <Link to="/" textDecoration="none" mb={2}>
              Home
            </Link>
            <Link to="/about" textDecoration="none" mb={2}>
              About Us
            </Link>
            <Link to="/blog" textDecoration="none">
              Blog
            </Link>
          </Flex>
        </Box>
        <Box flex={1} textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Contact Us
          </Text>
          <Text>Email: info@ghumfir.com</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
