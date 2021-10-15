import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { Link } from 'react-router-dom';
import IconINPV from 'assets/inpv-token.svg';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';
import { useAtom } from 'jotai';
import { listUsernameAtom, userDataAtom, walletAtom } from 'global/jotai';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { FormLabel } from '@chakra-ui/form-control';

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
  const [wallet, setWallet] = useAtom(walletAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [listUserName, setListUserName] = useAtom(listUsernameAtom);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(() => userData.name);

  useEffect(() => {
    async function listenToWallet() {
      const web3modal = new Web3Modal();
      const provider = await web3modal.connect();

      provider.on('accountsChanged', (accounts: string[]) => {
        const address = accounts[0];

        setUserData({
          address,
          name: listUserName[address] ?? '',
        });
        setName(listUserName[address] ?? '');
      });

      provider.on('disconnect', (error: { code: number; message: string }) => {
        setWallet({ isConnect: false, walletProvider: '' });
      });
    }

    listenToWallet();
  }, []);

  const connect = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    setWallet({
      walletProvider: 'metamask',
      isConnect: true,
    });

    setUserData({
      address: await signer.getAddress(),
      name: '',
    });
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Full Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="blackAlpha"
              mr={3}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setUserData({ ...userData, name });
                setListUserName({ ...listUserName, [userData.address]: name });
                setOpen(false);
              }}
              colorScheme="twitter"
            >
              Update Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {wallet.isConnect ? (
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
              <Box background="blue.300" borderRadius="50%" h="8" w="8" mr="2" />
              <Text fontSize="sm" fontWeight="semibold" isTruncated maxW="28">
                {userData.name || userData.address}
              </Text>
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
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              colorScheme="blackAlpha"
              size="sm"
            >
              Setup Profile
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Flex
          cursor="pointer"
          px="6"
          py="2"
          borderRadius="full"
          background="green.100"
          alignItems="center"
          as="button"
          onClick={connect}
        >
          Connect Wallet
        </Flex>
      )}
    </>
  );
};
