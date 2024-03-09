import MainNavigation from "../../Components/Navigation/MainNavigation";
import Footer from "../../Components/Footer/Footer";
import { Box, Heading, Text, Flex, Link, Image, Divider } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi"; // Import user icon
import { RiFileTextLine } from "react-icons/ri"; // Import document icon
import { AiFillCode } from "react-icons/ai"; // Import code icon
import { motion } from "framer-motion"; // Import animation library
import travelImage from '../../Assets/traveling-image.jpg';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box width="100vw">
      <MainNavigation />
      {/* <Box maxW="80%" mx="auto" p="20px" className="about-container"> */}
      <Box px="20px" py="40px">
        <Flex align="center" justify="space-between">
          <Box maxW="40%">
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <Heading as="h2" color="green.500" fontSize="2xl" fontWeight="bold" mb="20px">
                Discover the World with Ghumfir
              </Heading>
              <Divider my="40px" borderColor="gray.300" />
              <Text color="gray.700" lineHeight="1.6" textAlign="justify">
                Ghumfir is your ultimate travel companion, dedicated to providing unforgettable adventures and seamless travel experiences. Our mission is to revolutionize the way you explore the world by offering innovative tools, personalized recommendations, and expert guidance every step of the way.
              </Text>
            </motion.div>
          </Box>
          <Box maxW="50%">
            <Image src={travelImage} alt="Discover the World" />
          </Box>
        </Flex>
      {/* </Box> */}
        <Heading as="h3" color="green.500" mt="40px">
          Our Team
        </Heading>
        <Divider my="40px" borderColor="gray.300" />

        <Flex flexWrap="wrap" justifyContent="space-between">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} whileHover={{ scale: 1.05 }}>
            <Flex direction="column" alignItems="center" mb="30px">
              <FiUser size={40} color="blue.500" mb="10px" />
              <Text fontWeight="bold" mb="5px">Devraj Regmi</Text>
              <Text textAlign="center">Recommendation System, Documentation</Text>
            </Flex>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={sectionVariants} whileHover={{ scale: 1.05 }}>
            <Flex direction="column" alignItems="center" mb="30px">
              <RiFileTextLine size={40} color="green.500" mb="10px" />
              <Text fontWeight="bold" mb="5px">Samir Gautam</Text>
              <Text textAlign="center">Front End Design, UI</Text>
            </Flex>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={sectionVariants} whileHover={{ scale: 1.05 }}>
            <Flex direction="column" alignItems="center" mb="30px">
              <AiFillCode size={40} color="purple.500" mb="10px" />
              <Text fontWeight="bold" mb="5px">Sohan Siwakoti</Text>
              <Text textAlign="center">Full Stack, Integration</Text>
            </Flex>
          </motion.div>
        </Flex>

        <Heading as="h3" color="green.500" mt="40px">
          Our Mission
        </Heading>
        <Divider my="40px" borderColor="gray.300" />

        <Text color="gray.700" lineHeight="1.6" mt="20px">
          At Ghumfir, we're committed to making travel planning and exploration seamless and enjoyable for everyone. Our goal is to empower travelers to discover the world with confidence and excitement.
        </Text>
        <Text color="gray.700" lineHeight="1.6" mt="20px">
          Have questions or feedback? Feel free to reach out to us at{" "}
          <Link color="blue.500" fontWeight="bold" textDecoration="none" _hover={{textDecoration: 'underline'}} href="mailto:info@ghumfir.com">info@ghumfir.com</Link>.
          We're always here to help you plan your next adventure!
        </Text>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
