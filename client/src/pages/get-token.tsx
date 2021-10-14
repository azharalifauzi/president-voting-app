import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, VStack } from '@chakra-ui/layout';

const GetToken = () => {
  return (
    <Box maxW="container.lg" mx="auto" py="8">
      <VStack spacing="6">
        <FormControl isRequired>
          <FormLabel>Identity Card Number</FormLabel>
          <Input placeholder="123XXXX" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="Full name" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Birth Place</FormLabel>
          <Input placeholder="Jakarta" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Birth Date</FormLabel>
          <Input type="date" />
        </FormControl>
        <Button w="100%" colorScheme="twitter">
          Request Token
        </Button>
      </VStack>
    </Box>
  );
};

export default GetToken;
