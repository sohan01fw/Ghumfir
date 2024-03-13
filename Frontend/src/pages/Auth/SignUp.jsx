import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { RegistrationForm } from "../../lib/Actions/ServerPostActions/RegistrationForm";
import { Link, redirect, useNavigate } from "react-router-dom";
import Ghumfir_Logo from "../../Assets/Ghumfir_Logo.png";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Your sign-up logic here
    const regisValue = {
      name,
      email,
      password,
    };
    const registerUser = await RegistrationForm(regisValue);
    /*  if(registerUser){
      navigate("/login")
    } */
  };

  return (
    <div className="register">
      <Link to="/">
        <div className="logo-register">
          <img
            src={Ghumfir_Logo}
            alt="logo"
            height={90}
            width={100}
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <Box
        maxW="400px"
        mx="auto"
        p="20px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        width="100%"
      >
        <Heading as="h2" textAlign="center" color="green.500" mb="20px">
          Sign Up
        </Heading>
        <form onSubmit={handleSignUp} style={{ width: "100%" }}>
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb="16px"
              isRequired
              width="100%"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="16px"
              isRequired
              width="100%"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb="16px"
              isRequired
              width="100%"
            />
          </FormControl>

          <Button type="submit" colorScheme="green" mt="16px" width="100%">
            Register
          </Button>
          <div>
            <Flex
              minH="10vh"
              display="flex"
              align="center"
              bg={bgColor}
              position="relative"
              justifyContent="space-around"
            >
              <Text fontWeight={600} marginLeft="10%">
                <p>{"Already have an account? "}</p>
              </Text>
              <Link to="/auth/login">
                <Button
                  variant="outline"
                  colorScheme="green"
                  size="md"
                  _hover={{ bg: "green.500", color: "white" }}
                  marginLeft="-20%"
                >
                  {"LogIn"}
                </Button>
              </Link>
            </Flex>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
