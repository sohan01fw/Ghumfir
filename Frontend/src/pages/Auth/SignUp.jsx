import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Your sign-up logic here
    console.log('Signing up with:', name, email, password);
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
        Sign Up
      </Heading>
      <form onSubmit={handleSignUp} style={{ width: '100%' }}>
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
