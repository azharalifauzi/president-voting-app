import { Button } from '@chakra-ui/button';
import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/layout';

const Admin = () => {
  return (
    <Box maxW="container.lg" mx="auto" py="8">
      <VStack>
        <AdminRow />
      </VStack>
    </Box>
  );
};

export default Admin;

const AdminRow = () => {
  return (
    <Grid
      border="1px solid"
      borderColor="blackAlpha.300"
      alignItems="center"
      gridTemplateColumns="repeat(2, minmax(100px, 1.5fr)) repeat(3, minmax(100px, 1fr)) 2fr"
      px="4"
      py="2"
      borderRadius="lg"
      gap="3"
    >
      <GridItem>
        <Text isTruncated>asdfasdfadfasdfasdasdfasdfsadff</Text>
      </GridItem>
      <GridItem>
        <Text isTruncated>123xxxxxxxxxxxxxxxxxxxxxxxx</Text>
      </GridItem>
      <GridItem>Hye-Jin</GridItem>
      <GridItem>Jakarta</GridItem>
      <GridItem>2 Juli 1997</GridItem>
      <GridItem justifySelf="flex-end">
        <Button w="20" variant="outline" colorScheme="pink" size="sm" mr="2">
          Reject
        </Button>
        <Button w="20" variant="outline" colorScheme="twitter" size="sm">
          Approve
        </Button>
      </GridItem>
    </Grid>
  );
};
