import MainNavigation from "../../Components/Navigation/MainNavigation";
import Footer from "../../Components/Footer/Footer";
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi"; // Import user icon
import { RiFileTextLine } from "react-icons/ri"; // Import document icon
import { AiFillCode } from "react-icons/ai"; // Import code icon
import { motion } from "framer-motion"; // Import animation library
import travelImage from "../../Assets/traveling-image.jpg";
import AboutComponent from "./AboutComponent";

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Box width="100vw">
        <MainNavigation />
        {/* <Box maxW="80%" mx="auto" p="20px" className="about-container"> */}
        <Box>
          <AboutComponent />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default About;
