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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  postBudget,
  postExpenses,
} from "../../../lib/Actions/ServerPostActions/PostBudget";
const ExpensesModel = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelText, setmodelText] = useState("select an item");
  const [inputBudget, setinputBudget] = useState(0);
  const handlePostBudget = async () => {
    const postExpensesRes = await postExpenses(id, inputBudget, modelText);
    setmodelText("select an item");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" borderRadius="20px">
        Add expense
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent height="40vh">
          <ModalHeader fontWeight={700}>Add expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box margin={2}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="100%"
                >
                  <Box width="50%" textAlign="left">
                    {modelText}
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    minH="48px"
                    onClick={(e) => setmodelText(e.target.innerText)}
                  >
                    <span>Transportation</span>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={(e) => setmodelText(e.target.innerText)}
                  >
                    <span>Food</span>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={(e) => setmodelText(e.target.innerText)}
                  >
                    <span>Activity</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box margin={2}>
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

export default ExpensesModel;
