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
import { useNavigate, redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Ghumfir_Logo from "../../Assets/Ghumfir_Logo.png";
import "./Login.css";
import { LoginForm } from "../../lib/Actions/ServerPostActions/LoginForm";
import Cookies from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Your login logic here
    const loginValue = {
      email,
      password,
    };
    const resLoginData = await LoginForm(loginValue);
    console.log(resLoginData);
    if (resLoginData) {
      localStorage.setItem("user", {
        name: resLoginData.data.name,
        email: resLoginData.data.email,
      });
      return redirect("/");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="logo">
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
          Login
        </Heading>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
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
            Login
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
                <p>{"Don't have an account? "}</p>
              </Text>
              <Link to="/auth/register">
                <Button
                  variant="outline"
                  colorScheme="green"
                  size="md"
                  _hover={{ bg: "green.500", color: "white" }}
                  marginLeft="-20%"
                >
                  {"Register"}
                </Button>
              </Link>
            </Flex>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default Login;
