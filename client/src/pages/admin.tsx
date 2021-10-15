import { Button } from '@chakra-ui/button';
import { Badge, Box, Grid, GridItem, Text, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Skeleton } from '@chakra-ui/react';
import { supabase } from 'libs/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { INPV__factory } from 'types/ethers-contracts';
import { inpvAddress } from 'config';

const Admin = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: adminRows, isFetchedAfterMount } = useQuery('admin-rows', async () => {
    const { data } = await supabase.from('token_request').select();

    // for (let i = 0; i < data.length; i++) {
    //   const element = data[i];

    //   await supabase
    //     .from('token_request')
    //     .update({ status: 'pending' })
    //     .match({ address: element.address });
    // }

    return data;
  });

  const { data: voteStatus } = useQuery('vote-status', async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const inpv = INPV__factory.connect(inpvAddress, signer);
    const isVoting = await inpv.isVoting();

    return isVoting;
  });

  const toggleVote = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const inpv = INPV__factory.connect(inpvAddress, signer);
    const isVoting = await inpv.isVoting();

    if (!isVoting) {
      await inpv.openVoting();
      return;
    }

    await inpv.closeVoting();
    queryClient.refetchQueries({ queryKey: 'vote-status' });
  };

  const handleReject = useMutation(async (address: string) => {
    const { error } = await supabase
      .from('token_request')
      .update({ status: 'rejected' })
      .match({ address });

    if (error) {
      toast({
        description: error.details,
        title: error.code,
        status: 'error',
      });
      return;
    }

    queryClient.refetchQueries({ queryKey: 'admin-rows' });
  });

  const handleApprove = async (address: string, identityCardNumber: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const inpv = INPV__factory.connect(inpvAddress, signer);

    await inpv.approveRegisterVoter(identityCardNumber, address);

    const { error } = await supabase
      .from('token_request')
      .update({ status: 'approved' })
      .match({ address });

    if (error) {
      toast({
        description: error.details,
        title: error.code,
        status: 'error',
        position: 'bottom-right',
      });
      return;
    }

    toast({
      description: `request for address ${address} approved`,
      title: 'Success',
      status: 'success',
      position: 'bottom-right',
    });

    queryClient.refetchQueries({ queryKey: 'admin-rows' });
  };

  return (
    <Box maxW="container.lg" mx="auto" py="8">
      <Button onClick={toggleVote} mb="6">
        {voteStatus ? 'Close' : 'Open'} Vote
      </Button>
      <VStack>
        {!isFetchedAfterMount
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
              <Skeleton w="100%" height="40px" key={i} />
            ))
          : adminRows?.map((row) => (
              <AdminRow
                key={row.address}
                address={row.address}
                identityCardNumber={row.identity_card_number}
                birthDate={row.birth_date}
                birthPlace={row.birth_place}
                fullName={row.full_name}
                status={row.status}
                onReject={() => handleReject.mutate(row.address)}
                onApprove={() => handleApprove(row.address, row.identity_card_number)}
              />
            ))}
      </VStack>
    </Box>
  );
};

export default Admin;

interface AdminRowProps {
  address: string;
  identityCardNumber: string;
  fullName: string;
  birthDate: string;
  birthPlace: string;
  status: 'pending' | 'approved' | 'rejected';
  onApprove?: () => void;
  onReject?: () => void;
  onApproveLoading?: boolean;
  onRejectLoading?: boolean;
}

const AdminRow: React.FC<AdminRowProps> = ({
  address,
  identityCardNumber,
  fullName,
  birthDate,
  birthPlace,
  status,
  onApprove,
  onReject,
  onRejectLoading,
  onApproveLoading,
}) => {
  return (
    <Grid
      border="1px solid"
      borderColor="blackAlpha.300"
      alignItems="center"
      gridTemplateColumns="repeat(2, minmax(100px, 1.5fr)) repeat(4, minmax(100px, 1fr)) 2fr"
      px="4"
      py="2"
      borderRadius="lg"
      gap="3"
    >
      <GridItem>
        <Text isTruncated>{address}</Text>
      </GridItem>
      <GridItem>
        <Text isTruncated>{identityCardNumber}</Text>
      </GridItem>
      <GridItem>{fullName}</GridItem>
      <GridItem>{birthPlace}</GridItem>
      <GridItem>{birthDate}</GridItem>
      <GridItem justifySelf="center">
        <Badge
          colorScheme={status === 'pending' ? 'yellow' : status === 'approved' ? 'green' : 'red'}
          px="2"
          py="1"
        >
          {status}
        </Badge>
      </GridItem>
      <GridItem justifySelf="flex-end">
        {status === 'pending' ? (
          <>
            <Button
              isLoading={onRejectLoading}
              onClick={onReject}
              w="20"
              variant="outline"
              colorScheme="pink"
              size="sm"
              mr="2"
            >
              Reject
            </Button>
            <Button onClick={onApprove} w="20" variant="outline" colorScheme="twitter" size="sm">
              Approve
            </Button>
          </>
        ) : null}
      </GridItem>
    </Grid>
  );
};
