import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

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
          <Flex
            cursor="pointer"
            pl="2"
            pr="6"
            py="2"
            borderRadius="full"
            background="green.100"
            alignItems="center"
          >
            <Box background="blue.300" borderRadius="50%" h="8" w="8" mr="4" />
            <Text>Who Am I</Text>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
