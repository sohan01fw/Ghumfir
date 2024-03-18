import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  Box,
  Input,
  useDisclosure,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { postBudget } from "../../../lib/Actions/ServerPostActions/PostBudget";
const EditModel = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputBudget, setinputBudget] = useState(0);
  const handlePostBudget = async () => {
    const postBudet = await postBudget(id, inputBudget);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        Edit Budget
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={700}>Set budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  width="11%"
                  paddingLeft={2}
                >
                  NRP
                </InputLeftElement>
                <Input
                  paddingLeft={14}
                  placeholder="Enter amount"
                  onChange={(e) => setinputBudget(e.target.value)}
                />
              </InputGroup>
            </Box>
          </ModalBody>
          <ModalFooter paddingRight="40%">
            <Button
              _hover={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                handlePostBudget(), onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModel;
