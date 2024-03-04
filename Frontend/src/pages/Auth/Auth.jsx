import { useState } from "react";
import { Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import Login from "./Login";
import SignUp from "./SignUp";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import Footer from "../../Components/Footer/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      bg={bgColor}
      flexDirection="column"
      position="relative"
    >
      {/* <MainNavigation
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        zIndex={999}
      /> */}
      <MainNavigation />
      {isLogin ? (
        <Login />
      ) : (
        <SignUp />
      )}
      <Text mt={4}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button
          onClick={toggleForm}
          leftIcon={isLogin ? <FiUserPlus /> : <FiLogIn />}
          variant="outline"
          colorScheme="green"
          size="md"
          _hover={{ bg: "green.500", color: "white" }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </Button>
      </Text>
      <Footer />
    </Flex>
  );
};

export default Auth;
