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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  postBudget,
  postExpenses,
} from "../../../lib/Actions/ServerPostActions/PostBudget";
import { useAppState } from "../../../utils/Hooks/useAppState";
import { useParams } from "react-router-dom";
const EditExpenseModel = ({ data }) => {
  const { itiId, pId } = useParams();
  const { state, dispatch } = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelText, setmodelText] = useState("");
  const [inputBudget, setinputBudget] = useState(`${data?.cost}`);
  const expId = data?._id;
  const handlePostBudget = async () => {
    const postExpensesRes = await postExpenses(
      itiId,
      inputBudget,
      modelText,
      expId
    );
    console.log(postExpensesRes);
    if (postExpensesRes) {
      onClose();
      const x = {
        type: "expense-value",
        payload: postExpensesRes,
      };
      dispatch(x);
    }
  };
  const ClickedBtn = (data) => {
    onOpen();
    setmodelText(data?.name);
    setinputBudget(data?.cost);
  };
  return (
    <>
      <Button
        onClick={() => ClickedBtn({ name: data?.name, cost: data?.cost })}
        width="100%"
        padding={5}
        paddingTop={6}
        paddingBottom={6}
        background="transparent"
        _hover={{ background: "transparent" }}
        textAlign="left"
      >
        <Box
          className="name"
          display="flex"
          justifyContent="space-between"
          width="100%"
          cursor="pointer"
          _hover={{ color: "green" }}
        >
          <Box display="flex" flexDirection="column">
            <Box>
              <Box fontSize="16px">
                <h3>{data?.name}</h3>
              </Box>
              <Box fontSize="12px" color="gray">
                <p>{data?.name}</p>
              </Box>
            </Box>
          </Box>

          <Box
            className="cost"
            fontSize="12px"
            fontWeight="700"
            paddingTop={3}
            width="20%"
          >
            <h1>NPR</h1>
            <h4>{data?.cost}.00</h4>
          </Box>
        </Box>
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent height="40vh">
          <ModalHeader fontWeight={700}>Edit expense</ModalHeader>
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
                  value={inputBudget}
                  onChange={(e) => setinputBudget(e.target.value)}
                />
              </InputGroup>
            </Box>
          </ModalBody>
          <ModalFooter paddingRight="40%">
            <Button
              _hover={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                handlePostBudget();
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

export default EditExpenseModel;
