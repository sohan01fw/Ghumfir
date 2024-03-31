import { Flex, Box, Heading, Text, Divider } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi"; // Import user icon
import { RiFileTextLine } from "react-icons/ri"; // Import document icon
import { AiFillCode } from "react-icons/ai"; // Import code icon
import { motion } from "framer-motion"; // Import animation library
import travelImage from "../../Assets/traveling-image.jpg";

const AboutComponent = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Flex flexDir="column" >
        <Flex
          backgroundImage={travelImage}
          backgroundSize="cover"
          position="relative"
          height="90vh"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.5)" // Adjust opacity as needed for darkness
            zIndex="0"
          />

          <Flex
            flexDir="column"
            justify="center"
            align="center"
            position="relative"
            zIndex="1"
            width="100%"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <Heading
                as="h2"
                color="white"
                fontSize="6xl"
                fontWeight="bold"
                pt="6rem"
                ml="4rem"
                fontFamily="monospace"
                textColor="green.400"
              >
                About Ghumfir
              </Heading>

              <Flex
                p="2rem"
                ml="2rem"
                textAlign="justify"
                width="45%"
                flexDir="column"
              >
                <Text color="white" lineHeight="1.6" fontSize="2xl">
                  Ghumfir is your ultimate travel companion, dedicated to
                  providing unforgettable adventures and seamless travel
                  experiences.
                </Text>
                <Text color="white" lineHeight="1.6" fontSize="2xl">
                  Our mission is to revolutionize the way you explore the world
                  by offering innovative tools, personalized recommendations,
                  and expert guidance every step of the way.
                </Text>
              </Flex>
            </motion.div>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="column" mx="4rem" p="1rem">
        <Heading as="h3" color="green.500" mt="40px">
          Our Team
        </Heading>
        <Divider my="40px" borderColor="gray.300" />

        <Flex flexWrap="wrap" justifyContent="space-evenly" gap="4rem">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Flex direction="column" alignItems="center" mb="30px">
              <FiUser size={80} color="blue.500" mb="10px" />
              <Text fontSize="lg" fontWeight="bold" mb="5px">
                Devraj Regmi
              </Text>
              <Text fontSize="lg" textAlign="center">
                AI, Documentation
              </Text>
            </Flex>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Flex direction="column" alignItems="center" mb="30px">
              <RiFileTextLine size={80} color="green.500" mb="10px" />
              <Text fontSize="lg" fontWeight="bold" mb="5px">
                Samir Gautam
              </Text>
              <Text fontSize="lg" textAlign="center">
                Front End, UI
              </Text>
            </Flex>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Flex direction="column" alignItems="center" mb="30px">
              <AiFillCode size={80} color="purple.500" mb="10px" />
              <Text fontSize="lg" fontWeight="bold" mb="5px">
                Sohan Siwakoti
              </Text>
              <Text fontSize="lg" textAlign="center">
                Full Stack, Integration
              </Text>
            </Flex>
          </motion.div>
        </Flex>
      </Flex>
    </>
  );
};

export default AboutComponent;
