import React, { useEffect, useState } from "react";
import { Airecomend } from "../../lib/Actions/ServerPostActions/Airecomend";
import {
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import MainNavigation from "../../Components/Navigation/MainNavigation";
const AiRecommend = () => {
  const [getAiData, setgetAiData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cost, setCost] = useState("");
  const [altitude, setAltitude] = useState("");
  const [days, setDays] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async () => {
    const data = {
      Cost: cost,
      Altitude: altitude,
      Days: days,
      Difficulty: difficulty,
    };
    const x = await Airecomend(data);
    setgetAiData(x);
    onClose();
  };

  return (
    <div>
      <MainNavigation />
      {getAiData ? (
        getAiData.map((data, index) => (
          <Box
            key={index}
            width="30%"
            margin="10px"
            padding="10px"
            boxShadow="0px 1px 1px black"
            borderRadius="10px"
          >
            <Box fontSize="20px" fontWeight={600}>
              <h1>{data?.Trek}</h1>
            </Box>
            <Box fontSize="16px">
              <Box color="green">Cost: {data?.Cost}</Box>
              <Box color={"blue"}>Altitude: {data?.Altitude}</Box>
              <Box color={"orange"}>Days: {data?.Days}</Box>
              <Box color={"red"}>Difficulty: {data?.Difficulty}</Box>
              <Box fontSize="14px" fontWeight={700}>
                TotalCost: {data?.TotalCost}
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box fontSize="30px" fontWeight={600} margin={5}>
          <h1>To generate the new data click on ai generate Button</h1>
          {/* model got open  on click it */}
          <Box>
            <>
              <Button onClick={onOpen}>Generate Ai</Button>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent mt="6%">
                  <ModalHeader>Input your choice</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Cost</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Enter the Cost (786 to 31200s"
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Altitude</FormLabel>
                      <Input
                        placeholder="Enter the Alititude u wanna Explore (1550 to 6340)"
                        onChange={(e) => setAltitude(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Days</FormLabel>
                      <Input
                        placeholder="Enter the Days (2 to 13)"
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Difficulty</FormLabel>
                      <Input
                        placeholder="set the Difficulty level (1 to 7)"
                        onChange={(e) => setDifficulty(e.target.value)}
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                      Generate
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AiRecommend;
