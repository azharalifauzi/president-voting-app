import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { Link } from 'react-router-dom';
import IconINPV from 'assets/inpv-token.svg';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';

const Navbar = () => {
  return (
    <Box boxShadow="sm">
      <Flex
        px="6"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        h="20"
        maxW="container.xl"
      >
        <Box color="blackAlpha.700" fontWeight="bold" fontSize="xl">
          <Link to="/">INPV</Link>
        </Box>
        <HStack spacing="6" alignItems="center">
          <Box _hover={{ color: 'blue.200' }}>
            <Link to="/">Home</Link>
          </Box>
          <Box _hover={{ color: 'blue.200' }}>
            <Link to="/get-token">Get Token</Link>
          </Box>
          <UserProfile />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;

const UserProfile = () => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Flex
          cursor="pointer"
          pl="2"
          pr="6"
          py="2"
          borderRadius="full"
          background="green.100"
          alignItems="center"
          as="button"
        >
          <Box background="blue.300" borderRadius="50%" h="8" w="8" mr="4" />
          <Text>Who Am I</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent w="48" p="4">
        <Box
          borderRadius="full"
          border="1px solid"
          borderColor="gray.400"
          w="10"
          h="10"
          mx="auto"
          textAlign="center"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          background="gray.100"
        >
          <Image h="6" w="6" src={IconINPV} />
        </Box>
        <Text textAlign="center" my="3" fontSize="lg" fontWeight="semibold">
          1 INPV
        </Text>
        <Button variant="outline" colorScheme="blackAlpha" size="sm">
          Setup Profile
        </Button>
      </PopoverContent>
    </Popover>
  );
};
