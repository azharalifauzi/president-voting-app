import { Box, Grid, Progress, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { PresidentCard } from 'components';
import { useQuery, useQueryClient } from 'react-query';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { INPV__factory } from 'types/ethers-contracts/factories/INPV__factory';
import { inpvAddress } from 'config';
import { supabase } from 'libs/supabase';

const Home = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(
    'home-data',
    async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const inpv = INPV__factory.connect(inpvAddress, signer);
      const candidateOneCount = (await inpv.candidateOne()).toNumber();
      const candidateTwoCount = (await inpv.candidateTwo()).toNumber();

      return { candidateOneCount, candidateTwoCount, total: candidateOneCount + candidateTwoCount };
    },
    {
      refetchInterval: 10 * 1000,
    }
  );

  const { data: voteStatus } = useQuery('vote-status-home', async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const inpv = INPV__factory.connect(inpvAddress, signer);
    const isVoting = await inpv.isVoting();

    return isVoting;
  });

  const vote = async (candidateNumber: number) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const inpv = INPV__factory.connect(inpvAddress, signer);

    const { data } = await supabase
      .from('token_request')
      .select('identity_card_number')
      .match({ address: await signer.getAddress() });

    if (candidateNumber === 1 && data) {
      const tokenRequest = data[0];
      await inpv.voteCandidateOne(tokenRequest.identity_card_number);
    } else if (candidateNumber === 2 && data) {
      const tokenRequest = data[0];
      await inpv.voteCandidateTwo(tokenRequest.identity_card_number);
    }

    queryClient.refetchQueries({ queryKey: 'home-data' });
  };

  return (
    <Box>
      {voteStatus ? (
        <Alert maxW="container.lg" mx="auto" mt="8">
          <AlertIcon />
          Voting is open, you can vote now
        </Alert>
      ) : (
        <Alert maxW="container.lg" mx="auto" mt="8">
          <AlertIcon />
          Voting is closed, you cannot vote
        </Alert>
      )}
      <Text mt="6" textAlign="center" fontSize="6xl" fontWeight="bold" color="blackAlpha.700">
        Indonesia President Vote
      </Text>
      <Progress
        colorScheme="twitter"
        value={data?.total === 0 ? 50 : (data?.candidateOneCount ?? 0 / (data?.total ?? 1)) * 100}
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
          count={data?.candidateOneCount}
          onVote={() => vote(1)}
        />
        <Text color="blackAlpha.700" fontSize="4xl" fontWeight="bold" textAlign="center">
          VS
        </Text>
        <PresidentCard
          text="#ChangYeongGukForPresident"
          src="/kades-homecha.jpg"
          buttonText="Vote #2"
          count={data?.candidateTwoCount}
          onVote={() => vote(2)}
        />
      </Grid>
    </Box>
  );
};

export default Home;
