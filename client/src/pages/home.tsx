import { Box, Grid, Progress, Text } from '@chakra-ui/react';
import { PresidentCard } from 'components';

const Home = () => {
  return (
    <Box>
      <Text mt="6" textAlign="center" fontSize="6xl" fontWeight="bold" color="blackAlpha.700">
        Indonesia President Vote
      </Text>
      <Progress
        colorScheme="twitter"
        value={50}
        maxW="container.lg"
        mx="auto"
        mt="8"
        background="red.200"
      />
      <Grid mt="4" gap="10" alignItems="center" gridTemplateColumns="1fr 120px 1fr">
        <PresidentCard
          text="#HongBanjangForPresident"
          src="/hong-banjang.jpg"
          justifySelf="flex-end"
          buttonText="Vote #1"
        />
        <Text color="blackAlpha.700" fontSize="4xl" fontWeight="bold" textAlign="center">
          VS
        </Text>
        <PresidentCard
          text="#ChangYeongGukForPresident"
          src="/kades-homecha.jpg"
          buttonText="Vote #2"
        />
      </Grid>
    </Box>
  );
};

export default Home;
