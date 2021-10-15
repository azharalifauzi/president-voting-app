import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { supabase } from 'libs/supabase';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert, AlertIcon } from '@chakra-ui/alert';

const GetToken = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    identityCardNumber: '',
    fullName: '',
    birthPlace: '',
    birthDate: '',
  });

  const toast = useToast();

  const { data: status } = useQuery('request-status', async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const { data } = await supabase.from('token_request').select().eq('address', address);
    if (data && data.length > 0) {
      const tokenRequest = data[0];

      setState({
        identityCardNumber: tokenRequest?.identity_card_number,
        fullName: tokenRequest?.full_name,
        birthPlace: tokenRequest?.birth_place,
        birthDate: tokenRequest?.birth_date,
      });

      return tokenRequest?.status;
    }

    return 'none';
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setState({ ...state, [name]: value });
  };

  const requestToken = useMutation(async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const { error } = await supabase.from('token_request').insert([
      {
        identity_card_number: state.identityCardNumber,
        full_name: state.fullName,
        birth_place: state.birthPlace,
        birth_date: state.birthDate,
        address: await signer.getAddress(),
      },
    ]);

    if (error) {
      toast({
        status: 'error',
        description: error.message,
        title: error.code,
        position: 'bottom-right',
      });
    }

    queryClient.refetchQueries({ queryKey: 'request-status' });
  });

  return (
    <Box maxW="container.lg" mx="auto" py="8">
      {status === 'pending' ? (
        <Alert status="info">
          <AlertIcon /> Your request for token are still on process
        </Alert>
      ) : null}
      {status === 'approved' ? (
        <Alert status="success">
          <AlertIcon /> Your request for token has been approved
        </Alert>
      ) : null}
      {status === 'rejected' ? (
        <Alert status="error">
          <AlertIcon /> Your request for token are rejected
        </Alert>
      ) : null}
      <VStack mt="6" spacing="6">
        <FormControl isRequired>
          <FormLabel>Identity Card Number</FormLabel>
          <Input
            name="identityCardNumber"
            value={state.identityCardNumber}
            onChange={handleChange}
            placeholder="123XXXX"
            isDisabled={status !== 'none'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="fullName"
            value={state.fullName}
            onChange={handleChange}
            placeholder="Full name"
            isDisabled={status !== 'none'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Birth Place</FormLabel>
          <Input
            name="birthPlace"
            value={state.birthPlace}
            onChange={handleChange}
            placeholder="Jakarta"
            isDisabled={status !== 'none'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Birth Date</FormLabel>
          <Input
            name="birthDate"
            value={state.birthDate}
            onChange={handleChange}
            type="date"
            isDisabled={status !== 'none'}
          />
        </FormControl>
        <Button
          isLoading={requestToken.isLoading}
          onClick={() => requestToken.mutate()}
          w="100%"
          colorScheme="twitter"
          isDisabled={status !== 'none'}
        >
          Request Token
        </Button>
      </VStack>
    </Box>
  );
};

export default GetToken;
