import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Logging in with:', email, password);
  };

  return (
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
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
      </form>
    </Box>
  );
};

export default Login;
